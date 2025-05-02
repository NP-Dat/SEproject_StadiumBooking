const PaymentModel = require('../models/paymentModel');
const PaymentService = require('../services/paymentService');

class PaymentController {
  // Process Payment (Wallet)
  static async processPayment(req, res) {
    console.log('Processing payment...');
    try {
      const { userID, amount, cartID } = req.body;
      
      if (!userID || !amount || !cartID) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required parameters' 
        });
      }
      
      const result = await PaymentService.processPayment(
        userID,
        parseFloat(amount),
        cartID
      );
      
      if (!result.success) {
        const statusCode = result.message.includes('balance') || 
                          result.message.includes('funds') ? 402 : 500;
        return res.status(statusCode).json(result);
      }
      
      res.json(result);
      
    } catch (error) {
      console.error('Payment error:', error);
      const statusCode = error.message.includes('balance') || 
                        error.message.includes('funds') ? 402 : 500;
      res.status(statusCode).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  // Get Payment Status
  static async getPaymentStatus(req, res) {
    try {
      // Optionally include userID if available for balance information
      const userID = req.query.userID || null;
      const payment = await PaymentService.getPaymentStatus(req.params.id, userID);
      
      if (!payment) {
        return res.status(404).json({ 
          success: false, 
          message: 'Payment not found' 
        });
      }
      
      res.json({
        success: true,
        payment
      });
    } catch (error) {
      console.error('Status check error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve payment status' 
      });
    }
  }

  // Wallet Management
  static async initializeWallet(req, res) {
    console.log('Initializing wallet...');
    try {
      const { userID } = req.body;
      
      if (!userID) {
        return res.status(400).json({ 
          success: false, 
          message: 'User ID is required' 
        });
      }
      
      const balance = await PaymentService.initializeWallet(userID);
      
      res.json({ 
        success: true, 
        userID, 
        balance 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ 
        success: false, 
        message: 'Wallet initialization failed' 
      });
    }
  }

  // Get Wallet Balance
  static async getWalletBalance(req, res) {
    try {
      const userID = req.params.userID;
      const balance = await PaymentService.getWalletBalance(userID);
      
      res.json({
        success: true,
        userID,
        balance
      });
    } catch (error) {
      console.error('Balance check error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve wallet balance' 
      });
    }
  }

  // Top Up Wallet
  static async topUpWallet(req, res) {
    try {
      const { userID, amount } = req.body;
      
      if (!userID || !amount) {
        return res.status(400).json({ 
          success: false, 
          message: 'User ID and amount are required' 
        });
      }
      
      const result = await PaymentService.topUpWallet(userID, parseFloat(amount));
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      res.json(result);
    } catch (error) {
      console.error('Top-up error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Wallet top-up failed' 
      });
    }
  }

  // Process Refund
  static async processRefund(req, res) {
    try {
      const { paymentID, userID, amount } = req.body;
      
      if (!paymentID || !userID) {
        return res.status(400).json({ 
          success: false, 
          message: 'Payment ID and User ID are required' 
        });
      }
      
      const result = await PaymentService.processRefund(
        paymentID,
        userID,
        amount ? parseFloat(amount) : null
      );
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      res.json(result);
    } catch (error) {
      console.error('Refund error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Refund processing failed' 
      });
    }
  }

  // For Stripe payments
  static async processStripePayment(req, res) {
    try {
      const { userID, amount, cartID, paymentToken } = req.body;
      
      if (!userID || !amount || !cartID || !paymentToken) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required parameters for Stripe payment' 
        });
      }
      
      const result = await PaymentService.processStripePayment(
        userID,
        parseFloat(amount),
        cartID,
        paymentToken
      );
      
      if (!result.success) {
        return res.status(400).json(result);
      }
      
      res.json(result);
    } catch (error) {
      console.error('Stripe payment error:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }
}

module.exports = PaymentController;