require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./Config/db.js');
const authRoutes = require('./Controller/auth.js');
const checkoutRoutes = require('./Controller/CreateOrder.js');
const VerifyOrderRoutes = require('./Controller/VerifyOrder.js');
const DashboardRoutes = require('./Controller/dashboard.js');
const ContactController = require('./Controller/Contact.js');
const app = express();
const PORT = process.env.EXPRESS_PORT || 5000;

const corsOptions = {
    origin: [
        'https://www.swaadesehat.in',
        'https://swaadesehat.in',
        'http://localhost:3000', // for local development
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

app.use(bodyParser.json());
app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.send('Hello World!');

    pool.query('SELECT 1 + 1 AS solution', (error, results) => {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
});

app.use('/auth', authRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/status', VerifyOrderRoutes);
app.use('/stats', DashboardRoutes);
app.use('/c', ContactController)

// module.exports = app;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
