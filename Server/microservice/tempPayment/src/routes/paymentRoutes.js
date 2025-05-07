const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
// const { authenticateToken } = require('../middleware/authMiddleware');

// All routes require authentication
// router.use(authenticateToken);

router.post('/createWallet', PaymentController.createWallet);

router.post('/addMoney', PaymentController.addMoney);

router.get('/getWallet/:userID', PaymentController.getWallet);




router.post('/processPayment', PaymentController.processPayment);



module.exports = router;