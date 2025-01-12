const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.getUserProfile);

// New routes
router.post('/reset-password', userController.resetPassword);
router.put('/update-user', userController.updateUser);
router.delete('/delete-user', userController.deleteUser);
router.get('/list-users', userController.listUsers);

module.exports = router;
