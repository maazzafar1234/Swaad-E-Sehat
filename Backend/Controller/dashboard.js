const express = require("express");
const router = express.Router();
const pool = require("../Config/db");
const userDashAuth = require("../Middleware/userDashAuth");

router.get("/api/dashboard", userDashAuth, async (req, res) => {
    try {
        const userId = req.user.id;

        // --- Run all queries in parallel ---
        // pool.query returns [rows, fields], so we destructure correctly
        const [
            [userInfoRows], 
            [ordersRows], 
            [addressesRows]
        ] = await Promise.all([
            // User Info Query
            pool.query(
                `SELECT id, name, email, mobile, created_at 
                 FROM users WHERE id = ? LIMIT 1`,
                [userId]
            ),
            
            // Successful Orders Query
            pool.query(
                `SELECT id, total_amount, payment_method, order_status, created_at 
                 FROM orders 
                 WHERE user_id = ? AND payment_status = 'paid' 
                 ORDER BY created_at DESC`,
                [userId]
            ),
            
            // Unique Addresses Query
            pool.query(
                `SELECT DISTINCT address, city, state, pincode 
                 FROM orders 
                 WHERE user_id = ? AND payment_status = 'paid' 
                 AND address IS NOT NULL AND address != ''`,
                [userId]
            )
        ]);

        // Return all data in a structured object
        return res.json({
            success: true,
            message: "User dashboard data fetched",
            data: {
                user: userInfoRows[0] || null,
                orders: ordersRows,
                addresses: addressesRows
            }
        });

    } catch (err) {
        console.error("Dashboard API Error:", err);
        return res.status(500).json({
            success: false,
            error: "Server error fetching dashboard data"
        });
    }
});

module.exports = router;