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
      o.shipping_address,
      o.shipping_city,
      o.shipping_state,
      o.shipping_pincode
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
      p.name as product_name
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?`,
    [orderId]
  );
  
  const itemsList = itemRows.map(item => 
    `<li>${item.product_name} x ${item.quantity} - ₹${item.price}</li>`
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
      shippingAddress: `${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} - ${order.shipping_pincode}`
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
      shippingAddress: `${order.shipping_address}, ${order.shipping_city}, ${order.shipping_state} - ${order.shipping_pincode}`
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

module.exports = router;