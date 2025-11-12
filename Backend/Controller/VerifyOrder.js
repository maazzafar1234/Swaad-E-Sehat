const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const pool = require("../Config/db");
const userDashAuth = require("../Middleware/userDashAuth");
const axios = require("axios");

router.get('/verify-order/:orderId', userDashAuth, async (req, res) => {
  try {
    const { orderId } = req.params;

    const payload = {
      token: process.env.DEVCRAFTER_TOKEN,
      orderId
    };

    // CORRECTED: Headers should be in config object, data should be passed directly
    const devRes = await axios.post(
      "https://connect.devcraftor.in/api/v2/partner/order/status",
      payload, // Data as second argument
      {
        headers: { // Headers in config object (third argument)
          "X-API-Key": process.env.DEVCRAFTER_KEY,
          "X-API-Secret": process.env.DEVCRAFTER_SECRET,
          "Content-Type": "application/json"
        }
      }
    );

    const { status } = devRes.data;

    let newStatus = "pending";
    if (status === "SUCCESS") newStatus = "paid";
    else if (status === "FAILED") newStatus = "failed";
    // CORRECTED: Use 'pool' instead of 'db'
    await pool.query(
      "UPDATE orders SET payment_status = ? WHERE id = ?",
      [newStatus, orderId]
    );

    res.json({ success: true, status: newStatus });

  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = router;