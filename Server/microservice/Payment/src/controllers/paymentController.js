const PaymentModel = require('../models/paymentModel');
const PaymentService = require('../services/paymentService');

class PaymentController {
  static async processPayment(req, res) {
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
      
      res.json({
        success: true,
        message: 'Payment processed successfully',
        payment: result.payment
      });
      
    } catch (error) {
      console.error('Error processing payment:', error);
      const statusCode = error.message.includes('balance') || 
                        error.message.includes('funds') ? 402 : 500;
      res.status(statusCode).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  static async getPaymentStatus(req, res) {
    try {
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
      console.error('Error retrieving payment status:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve payment status' 
      });
    }
  }

  static async getPaymentHistory(req, res) {
    try {
      const userID = req.params.userID;
      const history = await PaymentService.getPaymentHistory(userID);
      
      if (!history) {
        return res.status(404).json({ 
          success: false, 
          message: 'No payment history found' 
        });
      }
      
      res.json({
        success: true,
        userID,
        history
      });
    } catch (error) {
      console.error('Error retrieving payment history:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve payment history' 
      });
    }
  }

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
      console.error('Error retrieving wallet balance:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to retrieve wallet balance' 
      });
    }
  }

  static async addFundsToWallet(req, res) {
    try {
      const { userID, amount } = req.body;
      
      if (!userID || !amount) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required parameters' 
        });
      }
      
      const result = await PaymentService.addFundsToWallet(userID, parseFloat(amount));
      
      if (!result.success) {
        return res.status(500).json(result);
      }
      
      res.json({
        success: true,
        message: 'Funds added successfully',
        wallet: result.wallet
      });
    } catch (error) {
      console.error('Error adding funds to wallet:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to add funds to wallet' 
      });
    }
  }
}

module.exports = PaymentController;