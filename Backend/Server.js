require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./Config/db.js');
const authRoutes = require('./Controller/auth.js');
const checkoutRoutes = require('./Controller/CreateOrder.js');
const VerifyOrderRoutes = require('./Controller/VerifyOrder.js');
const DashboardRoutes = require('./Controller/dashboard.js');
const app = express();
const PORT = process.env.EXPRESS_PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');

    pool.query('SELECT 1 + 1 AS solution', (error, results) => {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
});

// Auth routes
app.use('/auth', authRoutes);

//checkout route
app.use('/checkout', checkoutRoutes);
// Verify Order route
app.use('/status', VerifyOrderRoutes);
app.use('/stats', DashboardRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});