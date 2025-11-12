const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

// Create reusable transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
transporter.verify((err, success) => {
  console.log("SMTP TEST RESPONSE:");
  console.log(err || success);
});

/**
 * Send email with HTML template
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.template - Template file name (without .html extension)
 * @param {Object} options.payload - Data to replace in template
 * @returns {Promise<Object>} - Send result
 */
async function sendMail({ to, subject, template, payload = {} }) {
    try {
        // Read HTML template
        const templatePath = path.join(__dirname, 'templates', `${template}.html`);
        let htmlContent = await fs.readFile(templatePath, 'utf-8');

        // Replace placeholders with payload data
        Object.keys(payload).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            htmlContent = htmlContent.replace(regex, payload[key]);
        });

        // Email options
        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to,
            subject,
            html: htmlContent
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };

    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = { sendMail };