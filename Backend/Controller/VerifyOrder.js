const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require("../Config/db");
const userDashAuth = require("../Middleware/userDashAuth");
const { sendMail } = require("../mail/mailWorker"); // Import with destructuring

router.get('/verify-order/:orderId', userDashAuth, async (req, res) => {
  try {
    const { orderId } = req.params;

    const payload = {
      token: process.env.DEVCRAFTER_TOKEN,
      orderId
    };

    // Verify payment status with gateway
    const devRes = await axios.post(
      "https://connect.devcraftor.in/api/v2/partner/order/status",
      payload,
      {
        headers: {
          "X-API-Key": process.env.DEVCRAFTER_KEY,
          "X-API-Secret": process.env.DEVCRAFTER_SECRET,
          "Content-Type": "application/json"
        }
      }
    );

    if (!devRes.data || !devRes.data.data) {
      throw new Error("Invalid response from payment gateway");
    }

    const { txnStatus } = devRes.data.data;

    let newStatus = "pending";
    if (txnStatus === "SUCCESS") newStatus = "paid";
    else if (txnStatus === "FAILED") newStatus = "failed";

    // Update database
    await pool.query(
      "UPDATE orders SET payment_status = ? WHERE id = ?",
      [newStatus, orderId]
    );

    // Send confirmation emails if payment successful
    if (newStatus === "paid") {
      // Get detailed order information
      const [orderRows] = await pool.query(
        `SELECT 
          o.cust_email, 
          o.cust_first_name, 
          o.total_amount,
          o.created_at,
          o.shipping_address,
          o.shipping_city,
          o.shipping_state,
          o.shipping_pincode
        FROM orders o 
        WHERE o.id = ?`,
        [orderId]
      );
      
      if (orderRows.length > 0) {
        const order = orderRows[0];
        
        // Get order items
        const [itemRows] = await pool.query(
          `SELECT 
            oi.quantity,
            oi.price,
            p.name as product_name
          FROM order_items oi
          JOIN products p ON oi.product_id = p.id
          WHERE oi.order_id = ?`,
          [orderId]
        );
        
        try {
          // 2. Send detailed order confirmation to customer
          const itemsList = itemRows.map(item => 
            `<li>${item.product_name} x ${item.quantity} - ₹${item.price}</li>`
          ).join('');

          await sendMail({
            to: order.cust_email,
            subject: `Order #${orderId} - Payment Confirmed`,
            template: 'order-confirmation', // You'll need to create this template
            payload: {
              name: order.cust_first_name,
              orderId: orderId,
              orderDate: new Date(order.created_at).toLocaleDateString('en-IN'),
              totalAmount: order.total_amount,
              items: itemsList,
              shippingAddress: `${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} - ${order.shipping_pincode}`
            }
          });

          // 3. Send notification to admin
          await sendMail({
            to: process.env.ORDER_CONFIRMATION_ADMIN_EMAIL || 'admin@swaad-e-sehat.com',
            subject: `[NEW ORDER] #${orderId} - ₹${order.total_amount}`,
            template: 'admin-notification', // You'll need to create this template
            payload: {
              orderId: orderId,
              customerName: order.cust_first_name,
              customerEmail: order.cust_email,
              totalAmount: order.total_amount,
              orderDate: new Date(order.created_at).toLocaleString('en-IN'),
              items: itemsList,
              shippingAddress: `${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} - ${order.shipping_pincode}`
            }
          });

          console.log(`✅ Confirmation emails sent for order ${orderId}`);
        } catch (emailError) {
          // Log error but don't fail the transaction
          console.error(`❌ Failed to send emails for order ${orderId}:`, emailError);
        }
      }
    }

    res.json({ success: true, status: newStatus });

  } catch (err) {
    console.error("Error in /verify-order:", err.response?.data || err.message);
    res.status(500).json({ 
      success: false, 
      error: err.response?.data?.message || err.message || "Verification failed" 
    });
  }
});

module.exports = router;