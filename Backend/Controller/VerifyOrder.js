const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require("../Config/db");
const userDashAuth = require("../Middleware/userDashAuth");
const { sendMail } = require("../mail/mailWorker");

function parseDevCrafterResponse(apiResponse) {
  if (apiResponse.success && apiResponse.data?.txnStatus) {
    return {
      status: apiResponse.data.txnStatus,
      amount: apiResponse.data.txnAmount,
      orderId: apiResponse.data.orderId
    };
  }
  
  if (apiResponse.status) {
    return {
      status: apiResponse.status,
      message: apiResponse.message,
      orderId: null
    };
  }
  
  throw new Error("Unrecognized API response format");
}

async function UpdateProduct_order_status (orderId) {
  await pool.query(
    "UPDATE orders SET order_status = 'processed', updated_at = NOW() WHERE id = ?",
    [orderId]
  );
}

function mapPaymentStatus(gatewayStatus) {
  const statusMap = {
    'SUCCESS': 'paid',
    'PENDING': 'pending',
    'FAILED': 'failed',
    'EXPIRED': 'failed',
    'CANCELLED': 'cancelled'
  };
  
  return statusMap[gatewayStatus] || 'pending';
}

router.get('/verify-order/:orderId', userDashAuth, async (req, res) => {
  const { orderId } = req.params;
  
  try {
    const [orderCheck] = await pool.query(
      "SELECT id, payment_status, user_id FROM orders WHERE id = ? AND user_id = ?",
      [orderId, req.user.id]
    );
    
    if (orderCheck.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: "Order not found" 
      });
    }
    
    if (orderCheck[0].payment_status === 'paid') {
      return res.json({ 
        success: true, 
        status: 'paid',
        message: "Order already confirmed"
      });
    }

    const devRes = await axios.post(
      "https://connect.devcraftor.in/api/v2/partner/order/status",
      {
        token: process.env.DEVCRAFTER_TOKEN,
        orderId
      },
      {
        headers: {
          "X-API-Key": process.env.DEVCRAFTER_KEY,
          "X-API-Secret": process.env.DEVCRAFTER_SECRET,
          "Content-Type": "application/json"
        },
        timeout: 10000 
      }
    );

    const parsedResponse = parseDevCrafterResponse(devRes.data);
    const newStatus = mapPaymentStatus(parsedResponse.status);

    await pool.query(
      "UPDATE orders SET payment_status = ?, updated_at = NOW() WHERE id = ?",
      [newStatus, orderId]
    );

    if (newStatus === 'paid') {
      // Decrease stock for paid orders
      try {
        await decreaseStockForOrder(orderId);
        await UpdateProduct_order_status(orderId);
        console.log(`✅ Stock decreased for order ${orderId}`);
      } catch (stockError) {
        console.error(`❌ Stock decrease failed for order ${orderId}:`, stockError.message);
        // Continue with email sending even if stock update fails
      }

      try {
        await sendOrderConfirmationEmails(orderId);
        console.log(`✅ Confirmation emails sent for order ${orderId}`);
      } catch (emailError) {
        console.error(`❌ Email failed for order ${orderId}:`, emailError.message);
      }
    }

    res.json({ 
      success: true, 
      status: newStatus,
      gatewayStatus: parsedResponse.status,
      message: getStatusMessage(newStatus)
    });

  } catch (err) {
    console.error("Order verification error:", {
      orderId,
      error: err.message,
      apiResponse: err.response?.data
    });
    
    if (err.code === 'ECONNABORTED') {
      return res.status(504).json({ 
        success: false, 
        error: "Payment gateway timeout. Please try again." 
      });
    }
    
    if (err.response?.status === 401 || err.response?.status === 403) {
      return res.status(500).json({ 
        success: false, 
        error: "Payment gateway authentication error" 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: "Unable to verify payment. Please contact support." 
    });
  }
});

async function sendOrderConfirmationEmails(orderId) {
  const [orderRows] = await pool.query(
    `SELECT 
      o.cust_email, 
      o.cust_first_name, 
      o.total_amount,
      o.created_at,
      o.address,
      o.city,
      o.state,
      o.pincode
    FROM orders o 
    WHERE o.id = ?`,
    [orderId]
  );
  
  if (orderRows.length === 0) {
    throw new Error("Order not found for email");
  }
  
  const order = orderRows[0];
  
  const [itemRows] = await pool.query(
  `SELECT 
    oi.quantity,
    oi.price,
    oi.variant,
    p.name as product_name
  FROM order_items oi
  JOIN products p ON oi.product_id = p.id
  WHERE oi.order_id = ?`,
  [orderId]
);

const itemsList = itemRows.map(item => 
  `<li>${item.product_name}${item.variant ? ` (${item.variant})` : ''} x ${item.quantity} - ₹${item.price}</li>`
).join('');

  await sendMail({
    to: order.cust_email,
    subject: `Order #${orderId} - Payment Confirmed`,
    template: 'order-confirmation',
    payload: {
      name: order.cust_first_name,
      orderId: orderId,
      orderDate: new Date(order.created_at).toLocaleDateString('en-IN'),
      totalAmount: order.total_amount,
      items: itemsList,
      shippingAddress: `${order.address}, ${order.city}, ${order.state} - ${order.pincode}`
    }
  });

  await sendMail({
    to: process.env.ORDER_CONFIRMATION_ADMIN_EMAIL,
    subject: `[NEW ORDER] #${orderId} - ₹${order.total_amount}`,
    template: 'admin-notification',
    payload: {
      orderId: orderId,
      customerName: order.cust_first_name,
      customerEmail: order.cust_email,
      totalAmount: order.total_amount,
      orderDate: new Date(order.created_at).toLocaleString('en-IN'),
      items: itemsList,
      shippingAddress: `${order.address}, ${order.city}, ${order.state} - ${order.pincode}`
    }
  });
}

function getStatusMessage(status) {
  const messages = {
    'paid': 'Payment confirmed successfully',
    'pending': 'Payment is still processing',
    'failed': 'Payment failed',
    'cancelled': 'Payment was cancelled'
  };
  return messages[status] || 'Status updated';
}

async function decreaseStockForOrder(orderId) {
  const [orderItems] = await pool.query(
    `SELECT product_id, variant, quantity 
     FROM order_items 
     WHERE order_id = ?`,
    [orderId]
  );

  for (const item of orderItems) {
    await pool.query(
      `UPDATE product_variants 
       SET stock = stock - ? 
       WHERE product_id = ? AND (variant_id_str = ? OR name = ?)`,
      [item.quantity, item.product_id, item.variant, item.variant]
    );
  }
}

async function Updateorder_status (orderId) {
  await pool.query(
    "UPDATE orders SET order_status = 'processed', updated_at = NOW() WHERE id = ?",
    [orderId]
  );
}

// Validation helpers for payment callback
const VALID_PAYMENT_STATUSES = ['SUCCESS', 'PENDING', 'FAILED', 'FAILURE', 'TIMEOUT', 'EXPIRED', 'CANCELLED'];
const ORDER_ID_REGEX = /^SWAAD_\d{13,}$/;

function isValidOrderId(orderId) {
  return typeof orderId === 'string' && 
         orderId.length <= 50 && 
         ORDER_ID_REGEX.test(orderId);
}

function isValidStatus(status) {
  return typeof status === 'string' && 
         status.length <= 20 && 
         VALID_PAYMENT_STATUSES.includes(status);
}

router.get('/payment/callback', async (req, res) => {
  const { status, orderId } = req.query;

  const FRONTEND_URL = process.env.FRONTEND_URL || "https://swaadesehat.in";

  try {
    console.log(`🔄 Payment Redirect received: Order ${orderId}, Status ${status}`);

    // Validate orderId format
    if (!orderId || !isValidOrderId(orderId)) {
      console.warn(`⚠️ Invalid orderId format: ${orderId}`);
      return res.redirect(`${FRONTEND_URL}/order-confirmation?status=failed&error=invalid_order_id`);
    }

    // Validate status if provided
    if (status && !isValidStatus(status)) {
      console.warn(`⚠️ Invalid status value: ${status}`);
      return res.redirect(`${FRONTEND_URL}/order-confirmation?orderId=${encodeURIComponent(orderId)}&status=failed&error=invalid_status`);
    }

    if (status === 'TIMEOUT' || status === 'FAILURE' || status === 'FAILED') {
      await pool.query(
        "UPDATE orders SET payment_status = 'failed', updated_at = NOW() WHERE id = ?",
        [orderId]
      );
      return res.redirect(`${FRONTEND_URL}/order-confirmation?orderId=${orderId}&status=failed`);
    }

   
    const [orderCheck] = await pool.query("SELECT payment_status FROM orders WHERE id = ?", [orderId]);
    if (orderCheck.length > 0 && orderCheck[0].payment_status === 'paid') {
       return res.redirect(`${FRONTEND_URL}/order-confirmation?orderId=${orderId}&status=success`);
    }

    const devRes = await axios.post(
      "https://connect.devcraftor.in/api/v2/partner/order/status",
      {
        token: process.env.DEVCRAFTER_TOKEN,
        orderId: orderId
      },
      {
        headers: {
          "X-API-Key": process.env.DEVCRAFTER_KEY,
          "X-API-Secret": process.env.DEVCRAFTER_SECRET,
          "Content-Type": "application/json"
        },
        timeout: 10000
      }
    );

    const parsedResponse = parseDevCrafterResponse(devRes.data); 
    const verifiedStatus = mapPaymentStatus(parsedResponse.status); 

    await pool.query(
      "UPDATE orders SET payment_status = ?, updated_at = NOW() WHERE id = ?",
      [verifiedStatus, orderId]
    );

    if (verifiedStatus === 'paid') {
      // Decrease Stock
      try {
        await decreaseStockForOrder(orderId); 
      } catch (e) { console.error("Stock error", e.message); }

      // Send Emails
      try {
        await sendOrderConfirmationEmails(orderId); 
      } catch (e) { console.error("Email error", e.message); }

      // REDIRECT TO FRONTEND SUCCESS PAGE
      return res.redirect(`${FRONTEND_URL}/order-confirmation?orderId=${orderId}&status=success`);
    } 
    else {
      // Payment verified as Pending or Failed
      return res.redirect(`${FRONTEND_URL}/order-confirmation?orderId=${orderId}&status=failed`);
    }

  } catch (err) {
    console.error("Callback Error:", err.message);
    return res.redirect(`${FRONTEND_URL}/order-confirmation?orderId=${orderId}&status=pending`);
  }
});

module.exports = router;