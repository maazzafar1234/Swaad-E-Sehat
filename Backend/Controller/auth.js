const router = require('express').Router();
const pool = require('../Config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../mail/mailWorker');
const {v4: uuidv4 }= require('uuid')


router.post('/register', async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {
    if (!name || !email || !mobile || !password) {
        return res.status(400).json({ error: "All fields required" });
        }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;



      const sql = `INSERT INTO users (name, email, mobile, password, ip) 
                 VALUES (?, ?, ?, ?, ?)`;

    await pool.query(sql, [name, email, mobile, hashedPassword, userIp]);

    await sendMail({
        to: email,
        subject: 'Welcome to Swaad-E-Sehat',
        template: 'welcome',
        payload: { name }
    });

    return res.json({ success: true, message: "User registered" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { email, password } = req.body;

    const [data] = await pool.query(
      "SELECT id, name, email, password, last_login_at FROM users WHERE email = ?",
      [email]
    );

    if (data.length === 0) return res.status(400).json({ message: "User not found" });

    const u = data[0];

    const passMatch = await bcrypt.compare(password, u.password);
    if (!passMatch) return res.status(401).json({ message: "Wrong password" });

    const sessionToken = require("crypto").randomBytes(32).toString("hex");

    let sendSecurityMail = false;
    if (u.last_login_at) {
      const diff = (new Date() - new Date(u.last_login_at)) / (1000 * 60 * 60);
      if (diff > 24) sendSecurityMail = true;
    }

    await pool.query(
      "UPDATE users SET last_login_at = NOW(), last_ip = ?, session = ? WHERE id = ?",
      [ip, sessionToken, u.id]
    );

    if (sendSecurityMail) {
      await sendMail({
        to: u.email,
        subject: "Security Alert - New Login",
        template: "loginalert",
        payload: { name: u.name, ip }
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      token: sessionToken,
      user: { name: u.name, email: u.email }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;