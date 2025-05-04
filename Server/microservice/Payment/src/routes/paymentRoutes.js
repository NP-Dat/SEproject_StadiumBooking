const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/authMiddleware');


// Process Payment (Wallet)
router.post('/process', PaymentController.processPayment);

// Get Payment History
router.get('/history/:userID', PaymentController.getPaymentHistory);

// Get Wallet Balance
router.get('/balance/:userID', PaymentController.getWalletBalance);

//Add funds to Wallet
router.post('/addFunds', PaymentController.addFundsToWallet);
module.exports = router;