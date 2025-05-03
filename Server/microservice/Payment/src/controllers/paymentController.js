const PaymentModel = require('../models/paymentModel');

class PaymentController {
  static async processPayment(req, res) {
    try {
      const { userID, amount, cartID} = req.body;
      
      if (!userID || !amount || !cartID) {
        return res.status(400).json({ 
          success: false, 
          message: 'Missing required parameters' 
        });
      }
      
      // Create payment data object matching the model's expected format
      const paymentData = {
        totalCost: parseFloat(amount),
        cartID,
        service
      };
      console.log('Payment Data:', paymentData);
      
      // Create payment record
      const paymentId = await PaymentModel.createPayment(paymentData);
      
      // Process the payment using wallet
      const result = await PaymentModel.processPaymentWithWallet(userID, {
        id: cartID,
        totalPrice: parseFloat(amount)
      });
      console.log('Payment Result:', result);
      if (!result.success) {
        const statusCode = result.message.includes('balance') || 
                          result.message.includes('funds') ? 402 : 500;
        return res.status(statusCode).json(result);
      }
      
      res.json({
        success: true,
        message: 'Payment processed successfully',
        paymentId: result.paymentId
      });
      console.log('Payment processed successfully:', result.paymentId);
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
    
      
      // Placeholder response
      res.status(501).json({
        success: false,
        message: 'Payment history functionality not implemented yet'
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