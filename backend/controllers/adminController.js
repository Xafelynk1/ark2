const express = require('express');
const nodemailer = require('nodemailer'); // Import Nodemailer
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const db = require('../config/db'); // Import your database configuration
const router = express.Router();

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

// Default credentials
const DEFAULT_USERNAME = 'xafelynkARK2';

const DEFAULT_PASSWORD = 'Sam1$12580064';

// Sign In Logic
const signinAdmin = async (req, res) => {
    const { username, password } = req.body;

    // Check if the provided credentials match the default ones
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        return res.status(200).json({ message: "Sign in successful!" });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
};

const crypto = require('crypto'); // Import crypto for token generation
// Password Reset Logic
const resetPassword = async (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex'); // Generate a token

    // Logic to save the token and send the email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
              `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
              `http://localhost:5000/reset-password?token=${token}\n\n` +
              `If you did not request this, please ignore this email.\n`
    };

    try {
        await transporter.sendMail(mailOptions); // Send the email
        res.status(200).json({ message: 'Password reset email sent.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error });
    }
};

// Verify Reset Token Logic
const verifyResetToken = async (req, res) => {
    const { token, newPassword } = req.body;

    // Logic to verify the token and update the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.admins.update({ _id: req.user.id }, { password: hashedPassword }); // Update in Medb

    res.status(200).json({ message: 'Password has been reset successfully!' });
};

const changePassword = async (req, res) => {
    const { newPassword } = req.body;

    // Logic to change the password (e.g., update in the database)
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.admins.update({ _id: req.user.id }, { password: hashedPassword }); // Update in Medb

    res.status(200).json({ message: "Password changed successfully!" });
};

// Retrieve Password Logic (for demonstration purposes)
const retrievePassword = async (req, res) => {
    // Logic to retrieve the password (this is sensitive and should be handled carefully)
    res.status(200).json({ message: "Password retrieval is not implemented for security reasons." });
};

// Admin Dashboard
const getDashboard = (req, res) => {
    // Logic to retrieve dashboard data
    res.json({ message: "Dashboard data" });
};

// Sign Up Logic
const createAdmin = async (req, res) => {
    const { email, password, name, surname, age } = req.body; // Get all necessary fields from the request body

    // Logic to create admin user in the database
    try {
        console.log('Request body:', req.body); // Log the request body
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin user in Medb
        const newAdmin = {
            email,
            password: hashedPassword,
            name,
            surname,
            age,
        };

        await db.admins.insert(newAdmin); // Save to Medb
        console.log('New admin created:', newAdmin); // Simulate saving to the database

        res.redirect('/email-verification'); // Redirect to the email verification page
    } catch (error) {
        res.status(500).json({ message: "Error creating admin", error });
    }
};

// User Management Functions
const getUsers = async (req, res) => {
    try {
        const users = await db.users.find(); // Adjusted for Medb
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
};

const createUser = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { email, password: hashedPassword, name };
        await db.users.insert(newUser); // Adjusted for Medb
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, name } = req.body;
    try {
        await db.users.update({ _id: id }, { email, name }); // Adjusted for Medb
        res.status(200).json({ message: "User updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.users.remove({ _id: id }); // Adjusted for Medb
        res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

module.exports = {
    getDashboard,
    signinAdmin,
    changePassword,
    retrievePassword,
    createAdmin,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}; // Export the functions
