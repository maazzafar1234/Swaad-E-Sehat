const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const pool = require("../Config/db");
const sendMail = require("../Utils/sendMail");

// Rate limiter: max 5 requests per hour per IP for contact form
const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
 max: 5, // limit each IP to 5 requests per windowMs
 message: {
   success: false,
   message: "Too many contact form submissions from this IP, please try again after an hour."
 }
});
router.post("/api/contact/submit", contactFormLimiter, async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: "Name, email, and message are required." 
    });
  }

  try {
    const insertQuery = `
      INSERT INTO contact_queries (name, email, phone, subject, message, status)
      VALUES (?, ?, ?, ?, ?, 'new')
    `;
    await pool.query(insertQuery, [name, email, phone, subject, message]);
    
    try {
    await sendMail({
    to: process.env.ORDER_CONFIRMATION_ADMIN_EMAIL,
    subject: `New Contact Query: ${subject || 'General Inquiry'}`,
    template: 'contact-notification',
    payload: {
        name: name,
        email: email,
        phone: phone || 'Not provided',
        subject: subject || 'Not provided',
        message: message
    }
    });
    } catch (emailError) {
      // Log the email error but don't fail the request
      // The query was saved, which is the most important part
      console.error("Failed to send admin notification email:", emailError);
    }

    // 4. Send a success response to the frontend
    res.status(201).json({ 
      success: true, 
      message: "Your query has been submitted successfully!" 
    });

  } catch (dbError) {
    console.error("Error saving contact query to DB:", dbError);
    res.status(500).json({ 
      success: false, 
      message: "An error occurred. Please try again later." 
    });
  }
});

module.exports = router;