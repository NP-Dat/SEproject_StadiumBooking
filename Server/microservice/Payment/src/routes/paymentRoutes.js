const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/authMiddleware');

console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY?.substring(0, 8) + '...');

// Process Payment (Wallet)
router.post('/process', authenticateToken, PaymentController.processPayment);

// Get Payment Status
router.get('/:id/status', PaymentController.getPaymentStatus);

// Wallet Management
router.post('/initialize', authenticateToken, PaymentController.initializeWallet);

// Get Wallet Balance
router.get('/balance/:userID', authenticateToken, PaymentController.getWalletBalance);

// Top Up Wallet
router.post('/topup', authenticateToken, PaymentController.topUpWallet);

// Process Refund
router.post('/refund', authenticateToken, PaymentController.processRefund);

// Process Stripe Payment
router.post('/stripe', authenticateToken, PaymentController.processStripePayment);

module.exports = router;