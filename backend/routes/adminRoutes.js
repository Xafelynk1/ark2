const express = require('express');
const router = express.Router();
require('dotenv').config();

let failedAttempts = 0; // Track failed login attempts

const sendVerificationEmail = async (email) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Login Attempt Verification',
        text: `There have been multiple failed login attempts. Please verify your identity.`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

router.post('/api/admin/login', async (req, res) => {
    console.log('Login attempt:', req.body); // Log the incoming credentials
    const { username, password } = req.body;    
    const storedUsername = process.env.ADMIN_USERNAME;
    const storedPassword = process.env.ADMIN_PASSWORD;

    console.log('Stored Username:', storedUsername); // Log the stored username
    console.log('Stored Password:', storedPassword); // Log the stored password
    console.log('Comparing:', username, password); // Log the credentials being compared

    if (username === storedUsername && password === storedPassword) {
        req.session.isAdmin = true;
        req.session.adminAuthenticated = true;
        failedAttempts = 0; // Reset failed attempts on successful login
        res.status(200).json({ success: true });
    } else {
        failedAttempts++;
        if (failedAttempts >= 2) {
            // Trigger email verification
            const email = process.env.EMAIL_USER; // Use the admin email for verification
            await sendVerificationEmail(email); // Call the new function to send email
        }
        res.status(401).json({ success: false });
    }
});

module.exports = router;
