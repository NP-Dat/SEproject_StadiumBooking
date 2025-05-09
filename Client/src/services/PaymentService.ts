import axios from 'axios';

const BASE_URL = 'http://localhost:8006/api/payment';

export const PaymentService = {
  processPayment: async (userId: number, cartId: number, totalPrice: number) => {
    try {
      const response = await axios.post(`${BASE_URL}/processPayment`, {
        userID: userId,
        cartID: cartId,
        totalPrice
      });
      return { 
        success: true, 
        paymentId: response.data.createdPaymentID,
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error processing payment:', error);
      return { success: false, message: 'Payment processing failed' };
    }
  },

  getWalletBalance: async (userId: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/getWallet/${userId}`);
      if (response.data.wallet) {
        return {
          success: true,
          balance: parseFloat(response.data.wallet.balance),
          message: response.data.message
        };
      }
      return { success: false, balance: 0, message: 'No wallet found' };
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      return { success: false, balance: 0, message: 'Failed to get wallet balance' };
    }
  },

  addFundsToWallet: async (userId: number, amount: number) => {
    try {
      const response = await axios.post(`${BASE_URL}/addMoney`, {
        userID: userId,
        amount
      });
      return { 
        success: true, 
        balance: parseFloat(response.data.balance),
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error adding funds to wallet:', error);
      return { success: false, message: 'Failed to add funds' };
    }
  },

  createWallet: async (userId: number, initialBalance: number = 0) => {
    try {
      const response = await axios.post(`${BASE_URL}/createWallet`, {
        userID: userId,
        initialBalance
      });
      return {
        success: true,
        walletId: response.data.walletID,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error creating wallet:', error);
      return { success: false, message: 'Failed to create wallet' };
    }
  }
};

export interface WalletResponse {
  success: boolean;
  userID?: string;
  balance?: number;
  message?: string;
}

export interface PaymentResponse {
  success: boolean;
  message?: string;
  paymentId?: number;
}

export default PaymentService;