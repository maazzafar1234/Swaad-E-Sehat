const cron = require('node-cron');
const axios = require('axios');

cron.schedule("*/30 * * * * *", async () => {
  const pendingOrders = await db.query(
    "SELECT order_id FROM orders WHERE payment_status='pending'"
  );

  for (let o of pendingOrders) {
    await axios.get(`https://yourdomain.com/api/verify-order/${o.order_id}`);
  }

  console.log("✅ Order status checked");
});
