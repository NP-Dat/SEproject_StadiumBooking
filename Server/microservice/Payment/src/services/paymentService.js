const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PaymentModel = require('../models/paymentModel');

console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY?.substring(0, 8) + '...');

class PaymentService {
  // Process payment with wallet
  static async processPayment(userId, amount, cartId, paymentMethod = 'WALLET') {
    try {
      // Validate payment parameters
      if (!userId || !amount || amount <= 0 || !cartId) {
        throw new Error('Invalid payment parameters');
      }

      // Get wallet and check balance
      const wallet = await PaymentModel.getWallet(userId);
      
      if (!wallet) {
        throw new Error('Active wallet not found');
      }

      if (wallet.balance < amount) {
        throw new Error('Insufficient wallet balance');
      }

      // Process the payment using the model's transaction handling
      const paymentResult = await PaymentModel.processPaymentWithWallet(userId, {
        id: cartId,
        totalPrice: amount
      });

      if (!paymentResult.success) {
        throw new Error(paymentResult.message);
      }

      // Get updated wallet balance
      const updatedWallet = await PaymentModel.getWallet(userId);
      
      return {
        success: true,
        paymentId: paymentResult.paymentId,
        newBalance: updatedWallet.balance
      };

    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Get Payment Status
  static async getPaymentStatus(paymentId, userId = null) {
    try {
      if (userId) {
        return await PaymentModel.getPaymentWithUserBalance(paymentId, userId);
      } else {
        return await PaymentModel.getPayment(paymentId);
      }
    } catch (error) {
      return null;
    }
  }

  // Initialize Wallet
  static async initializeWallet(userId) {
    await PaymentModel.createOrUpdateWallet(userId);
    return this.getWalletBalance(userId);
  }

  // Get Wallet Balance
  static async getWalletBalance(userId) {
    const wallet = await PaymentModel.getWallet(userId);
    return wallet?.balance || 0;
  }

  // Add funds to wallet
  static async topUpWallet(userId, amount) {
    try {
      if (!userId || !amount || amount <= 0) {
        throw new Error('Invalid parameters for wallet top-up');
      }

      // Get current wallet to check if it exists
      const wallet = await PaymentModel.getWallet(userId);
      const currentBalance = wallet?.balance || 0;
      
      if (!wallet) {
        // Create new wallet if it doesn't exist
        await PaymentModel.createOrUpdateWallet(userId, 0);
      }
      
      // Update wallet balance
      await PaymentModel.updateWalletBalance(userId, parseFloat(amount), false);

      // Record the top-up as a payment
      await PaymentModel.createPayment({
        totalCost: amount,
        cartID: 0,
        service: 'TOPUP'
      });
      
      // Get updated balance
      const updatedWallet = await PaymentModel.getWallet(userId);
      
      return {
        success: true,
        previousBalance: currentBalance,
        newBalance: updatedWallet.balance
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Process a refund
  static async processRefund(paymentId, userId, amount = null) {
    const connection = await PaymentModel.getConnection();
    await connection.beginTransaction();
    
    try {
      // Get the original payment
      const payment = await PaymentModel.getPayment(paymentId);
      
      if (!payment) {
        throw new Error('Payment not found');
      }
      
      const refundAmount = amount || payment.totalCost;
      const cartId = payment.cartID;
      
      // Get wallet or create if it doesn't exist
      const wallet = await PaymentModel.getWallet(userId);
      const currentBalance = wallet?.balance || 0;
      
      if (!wallet) {
        await PaymentModel.createOrUpdateWallet(userId, 0);
      }
      
      // Add refund to wallet
      await PaymentModel.updateWalletBalance(userId, parseFloat(refundAmount), false);
      
      // Record the refund payment
      const refundId = await PaymentModel.createPayment({
        totalCost: refundAmount,
        cartID: cartId,
        service: 'REFUND'
      });
      
      await connection.commit();
      
      // Get updated balance
      const updatedWallet = await PaymentModel.getWallet(userId);
      
      return {
        success: true,
        refundId,
        previousBalance: currentBalance,
        newBalance: updatedWallet.balance,
        refundAmount
      };
    } catch (error) {
      await connection.rollback();
      return {
        success: false,
        message: error.message
      };
    } finally {
      connection.release();
    }
  }

  // For Stripe integration (placeholder for future implementation)
  static async processStripePayment(userId, amount, cartId, paymentToken) {
    try {
      // Process payment with Stripe
      const stripeCharge = await stripe.charges.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        source: paymentToken,
        description: `Payment for cart #${cartId}`
      });

      if (stripeCharge.status === 'succeeded') {
        // Record the payment in our database
        const paymentId = await PaymentModel.createPayment({
          totalCost: amount,
          cartID: cartId,
          service: 'STRIPE'
        });

        return {
          success: true,
          paymentId,
          stripeChargeId: stripeCharge.id
        };
      } else {
        throw new Error('Stripe payment failed');
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
}

module.exports = PaymentService;