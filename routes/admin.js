const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

router.post('/api/admin/auth', async (req, res) => {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && 
        password === process.env.ADMIN_PASSWORD) {
        
        req.session.isAdmin = true;
        req.session.adminUser = username;
        
        res.status(200).json({
            success: true,
            message: 'Authentication successful'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

module.exports = router;
