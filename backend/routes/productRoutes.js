const express = require('express');
const router = express.Router();

// Middleware for logging requests
router.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request Path: ${req.path}`);
    next();
});

// Sample route to get all products
router.get('/', (req, res) => {
    res.json({ message: 'List of products' });
});

// Sample route to add a new product
router.post('/', (req, res) => {
    const newProduct = req.body; // Assuming product data is sent in the request body
    res.status(201).json({ message: 'Product added', product: newProduct });
});

// New endpoint for welcome message
router.get('/welcome', (req, res) => {
    res.json({ message: 'Welcome to the Product API!' });
});
module.exports = router;
