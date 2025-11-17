const express = require('express');
const router = express.Router();
const pool = require('../Config/db'); 
const UserDashAuth = require('../Middleware/userDashAuth.js');

router.post("/api/orders/create", UserDashAuth, async (req, res) => {
  const { amount, customerInfo, items, paymentMethod } = req.body;
  
  // This is now working thanks to your middleware!
  const user_id = req.user.id; 

  const orderId = `SWAAD_${Date.now()}`;
  const paymentStatus = paymentMethod === "COD" ? "cod_pending" : "pending";
  const orderStatus = "pending"; 

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Validate prices and calculate totals using database prices
    let validatedSubtotal = 0;
    const validatedItems = [];
    
    for (let item of items) {
      const variantIdentifier = item.variantName || item.variant || 'default';
      
      // Fetch actual product variant from database
      const [variantRows] = await connection.query(
        `SELECT price, stock, name FROM product_variants 
         WHERE product_id = ? AND (variant_id_str = ? OR name = ?)`,
        [item.id, variantIdentifier, variantIdentifier]
      );
      
      if (variantRows.length === 0) {
        throw new Error(`Product variant not found: ${item.name} - ${variantIdentifier}`);
      }
      
      const dbVariant = variantRows[0];
      
      // Validate price matches database
      if (Math.abs(parseFloat(item.price) - parseFloat(dbVariant.price)) > 0.01) {
        throw new Error(`Price mismatch for ${item.name}: client sent ${item.price}, expected ${dbVariant.price}`);
      }
      
      // Validate stock availability
      if (dbVariant.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.name} - ${variantIdentifier}. Available: ${dbVariant.stock}, requested: ${item.quantity}`);
      }
      
      // Add to validated items with database price
      validatedItems.push({
        product_id: item.id,
        name: item.name,
        price: parseFloat(dbVariant.price),
        quantity: item.quantity,
        variant: variantIdentifier
      });
      
      validatedSubtotal += parseFloat(dbVariant.price) * item.quantity;
    }
    
    // Calculate totals using validated database prices
    const subtotal = validatedSubtotal;
    const tax = subtotal * 0.18; // 18% GST
    const totalAmount = subtotal + tax;

    // --- Block 1: Create the Order ---
    try {
      const ordersQuery = `
        INSERT INTO orders (
          id, user_id, total_amount, payment_method, payment_status, order_status, 
          subtotal, tax,
          cust_first_name, cust_last_name, cust_email, cust_mobile, 
          address, city, state, pincode
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const orderValues = [
        orderId,
        user_id,
        totalAmount, // Use the calculated total
        paymentMethod,
        paymentStatus,
        orderStatus,
        subtotal,
        tax,
        customerInfo.firstName,
        customerInfo.lastName,
        customerInfo.email,
        customerInfo.phone,
        customerInfo.address,
        customerInfo.city,
        customerInfo.state,
        customerInfo.pincode
      ];
      const [orderResult] = await connection.query(ordersQuery, orderValues);
    } catch (err1) {
      console.error("--- ERROR IN 'INSERT INTO orders' ---", err1);
      throw err1; 
    }

    // --- Block 2: Insert Order Items with Validated Data ---
    try {
      for (let validatedItem of validatedItems) {
        const [itemResult] = await connection.query(
          `INSERT INTO order_items (order_id, product_id, product_name, price, quantity, variant)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            orderId, 
            validatedItem.product_id,
            validatedItem.name, 
            validatedItem.price,
            validatedItem.quantity, 
            validatedItem.variant
          ]
        );
      }
    } catch (err2) {
      console.error("--- ERROR IN 'INSERT INTO order_items' ---", err2);
      throw err2;
    }

    // --- If we get here, both queries worked ---
    await connection.commit();

    // Handle COD vs. Online Payment
    if (paymentMethod === "COD") {
      return res.json({
        success: true,
        message: "COD Order Placed",
        orderId
      });
    }

    // --- Online Payment (DevCraftor PG) ---
    const response = await fetch("https://connect.devcraftor.in/api/v2/partner/payment_links", {
      method: "POST",
      headers: {
        "X-API-Key": process.env.DEVCRAFTER_KEY,
        "X-API-Secret": process.env.DEVCRAFTER_SECRET,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: process.env.DEVCRAFTER_TOKEN,
        orderId: orderId,
        txnAmount: totalAmount.toString(),
        txnNote: "Swaad Purchase",
        cust_Mobile: customerInfo.phone,
        cust_Email: customerInfo.email,
        callback_url: `${process.env.BASE_URL}/status/payment/callback?order=${orderId}&source=checkout&timestamp=${Date.now()}`
      }),
    });

    // =================================================================
    // --- THIS IS THE FIX ---
    // Check if the response is OK and is JSON before trying to parse it
    // =================================================================
    const contentType = response.headers.get("content-type");
    if (!response.ok || !contentType || !contentType.includes("application/json")) {
      
      // The response is NOT JSON (it's HTML). Let's log the error.
      const errorText = await response.text();
      console.error("--- ERROR FROM PAYMENT GATEWAY (NOT JSON) ---");
      console.error(`Status: ${response.status} ${response.statusText}`);
      console.error("Response Body (HTML/Text):", errorText); // This will show you the HTML
      
      // Throw an error to trigger the main catch block
      throw new Error(`Payment gateway returned an invalid response. Status: ${response.status}`);
    }
    
    // If we get here, the response is safe to parse
    const pgData = await response.json(); // This was your line 104

    if (!pgData || !pgData.data || !pgData.data.paymentUrl) {
      // Even if it's JSON, it might be an error from their API
      console.error("--- ERROR FROM PAYMENT GATEWAY (JSON) ---", pgData);
      throw new Error("Payment gateway returned a JSON error.");
    }

    // Log the payment link
    const [logResult] = await pool.query(
      `INSERT INTO payment_logs (order_id, payment_url, txn_ref_id)
       VALUES (?, ?, ?)`,
      [orderId, pgData.data.paymentUrl, pgData.data.txn_ref_id || null]
    );

    res.json({
      success: true,
      orderId,
      paymentUrl: pgData.data.paymentUrl
    });

  } catch (err) {
    if (connection) {
      await connection.rollback();
    }
    
    console.error("Error in /api/orders/create:", err);
    
    res.status(500).json({ 
      success: false, 
      message: err.message || "Order creation failed. Please check server logs.",
      error: {
        code: err.code,
        message: err.sqlMessage || err.message
      }
    });

  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = router;