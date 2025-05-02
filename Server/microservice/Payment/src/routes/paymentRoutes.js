const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/authMiddleware');

console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY?.substring(0, 8) + '...');

// Process Payment (Wallet)
router.post('/process', authenticateToken, PaymentController.processPayment);

// Get Payment Status
router.get('/:id/status', PaymentController.getPaymentStatus);

// Get Wallet Balance
router.get('/balance/:userID', authenticateToken, PaymentController.getWalletBalance);

//Add funds to Wallet
router.post('/addFunds', authenticateToken, PaymentController.addFundsToWallet);
module.exports = router;