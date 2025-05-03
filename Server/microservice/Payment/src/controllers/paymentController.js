const PaymentModel = require('../models/paymentModel');

class PaymentController {
  static async processPayment(req, res) {
    try {
      const { userID, cartID, amount } = req.body;
      
      if (!userID || !amount) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required parameters' 
        });
      }
      
      // Create payment data object
      const paymentData = {
        totalCost: parseFloat(amount),
        cartID: cartID || null,
        service: 'WALLET'
      };
      
      // Process payment without trying to update a Carts table
      const result = await PaymentModel.createAndProcessPayment(userID, paymentData);
      
      if (!result.success) {
        const statusCode = result.message.includes('funds') ? 402 : 500;
        return res.status(statusCode).json(result);
      }
      
      res.json({
        success: true,
        message: 'Payment processed successfully',
        paymentId: result.paymentId
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
      const paymentId = req.params.id;
      const userID = req.query.userID || null;
      
      // Using the proper model method
      const payment = await PaymentModel.getPaymentWithUserBalance(paymentId, userID);
      
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
      
      if (!userID) {
        return res.status(400).json({
          success: false,
          message: 'Missing required userID parameter'
        });
      }
      
      const payments = await PaymentModel.getPaymentHistory(userID);
      
      if (!payments) {
        return res.status(404).json({
          success: false,
          message: 'No payment history found'
        });
      }
      
      res.json({
        success: true,
        userID,
        payments
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
      
      if (!userID) {
        return res.status(400).json({
          success: false,
          message: 'Missing required userID parameter'
        });
      }
      
      // Use the appropriate model method
      const wallet = await PaymentModel.getWallet(userID);
      
      if (!wallet) {
        return res.status(404).json({
          success: false,
          message: 'Wallet not found'
        });
      }
      
      res.json({
        success: true,
        userID,
        balance: wallet.balance
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
      
      const result = await PaymentModel.addFundsToWallet(userID, parseFloat(amount));
      
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