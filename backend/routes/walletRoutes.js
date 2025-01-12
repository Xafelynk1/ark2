const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

// Wallet routes
router.post('/deduct', walletController.deductWallet);
router.post('/credit', walletController.creditWallet);
router.get('/balance', walletController.getWalletBalance);
router.post('/create', walletController.createWallet);
router.get('/', walletController.getWalletDetails);
router.put('/', walletController.updateWallet);
router.delete('/', walletController.deleteWallet);

module.exports = router;
