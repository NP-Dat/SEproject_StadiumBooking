const PaymentModel = require('../models/paymentModel');


class PaymentController {
  static async createWallet(req, res) {
    try {
      const { userID, initialBalance } = req.body;
      const paymentModel = new PaymentModel();

      // Check if the wallet already exists for the user
      const existingWallet = await paymentModel.checkAlreadyWallet(userID);
      if (existingWallet) {
        console.log(paymentModel.checkAlreadyWallet(userID));
        return res.status(400).json({ error: 'Wallet already exists for this user' });
      }

      // Create a new wallet
      const result = await paymentModel.createWallet(userID, initialBalance);
      res.status(201).json({ message: 'Wallet created successfully', userID, walletID: result});
    } catch (error) {
      console.error('Error creating wallet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async addMoney(req, res) {
    try {
      const { userID, amount } = req.body;
      const paymentModel = new PaymentModel();
      const result = await paymentModel.addMoney(userID, amount);
      if (result.success) {
        res.status(200).json({ 
          message: 'Money added successfully', 
          userID, 
          balance: result.balance 
        });
      } else {
        res.status(400).json({ error: 'Failed to add money to wallet' });
      }
    } catch (error) {
      console.error('Error adding money:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getWallet(req, res) {
    try {
      const { userID } = req.params;
      const paymentModel = new PaymentModel();
      const result = await paymentModel.getWallet(userID);
      if (result) {
        res.status(200).json({ message: 'Wallet retrieved successfully', wallet: result });
      } else {
        res.status(404).json({ error: 'Wallet not found' });
      }
    } catch (error) {
      console.error('Error retrieving wallet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async processPayment(req, res) {
    try {
      const { userID, cartID, totalPrice } = req.body;
      const paymentModel = new PaymentModel();
      const wallet = await paymentModel.getWallet(userID);
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
      }
      const walletBalance = parseFloat(wallet.balance); // Ensure balance is a number
      const processResult = await paymentModel.processPayment(userID, cartID, totalPrice, walletBalance);
      if (processResult < 0) {
        return res.status(400).json({ error: 'Insufficient balance', userID, cartID, totalPrice, walletBalance });
      }
      if (processResult > 0){
        const balance = await paymentModel.getWallet(userID).balance;
        return res.status(200).json({ message: 'Payment processed successfully', userID, cartID, createdPaymentID: processResult, newBalance: balance });
      }
      else {
        return res.status(400).json({ error: 'Payment processing failed'});
      }


    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = PaymentController;