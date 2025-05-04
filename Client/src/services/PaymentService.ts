import axios from 'axios';

const BASE_URL = 'http://localhost:8006/api/payments';

export const PaymentService = {
  processPayment: async (userId: number, cartId: number, amount: number) => {
    try {
      const response = await axios.post(`${BASE_URL}/process`, {
        userID: userId,
        cartID: cartId,
        amount: amount
      });
      return { success: true, ...response.data };
    } catch (error) {
      console.error('Error processing payment:', error);
      return { success: false, message: 'Payment processing failed' };
    }
  },

  getWalletBalance: async (userId: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/balance/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      throw error;
    }
  },

  addFundsToWallet: async (userId: number, amount: number) => {
    try {
      await axios.post(`${BASE_URL}/addFunds`, {
        userID: userId,
        amount: amount
      });
      return { success: true };
    } catch (error) {
      console.error('Error adding funds to wallet:', error);
      return { success: false, message: 'Failed to add funds' };
    }
  },

  getPaymentHistory: async (userId: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/history/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting payment history:', error);
      throw error;
    }
  }
};

export default PaymentService;

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