const express = require("express");
const router = express.Router();
const pool = require("../Config/db");

router.get("/api/admin/orders", async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT 
        id, user_id, total_amount, payment_method, 
        payment_status, order_status, 
        cust_first_name, cust_last_name, created_at 
      FROM orders
      ORDER BY created_at DESC
    `);
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error("Error fetching admin orders:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/api/admin/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [orderRows] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
    if (orderRows.length === 0) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    const order = orderRows[0];

    const [items] = await pool.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [id]
    );

    res.json({ 
      success: true, 
      data: {
        order: order,
        items: items
      } 
    });

  } catch (err) {
    console.error("Error fetching single admin order:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/api/admin/users", async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT 
        id, name, email, mobile, role, status, created_at, last_login_at
      FROM users
      ORDER BY created_at DESC
    `);
    res.json({ success: true, data: users });
  } catch (err) {
    console.error("Error fetching admin users:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;