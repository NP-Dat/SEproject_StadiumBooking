const Paymentpool = require('../config/db');

class PaymentModel {
  // Wallet operations
  static async getWallet(userId) {
    const [rows] = await Paymentpool.query(
      'SELECT id, balance, status FROM Wallet WHERE userID = ? AND status = \'ACTIVE\'',
      [userId]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  static async createOrUpdateWallet(userId, initialBalance = 0) {
  
    const [existingWallet] = await Paymentpool.query(
      'SELECT id FROM Wallet WHERE userID = ?',
      [userId]
    );
    
    if (existingWallet.length > 0) {
      // Update existing wallet
      await Paymentpool.query(
        'UPDATE Wallet SET status = \'ACTIVE\' WHERE userID = ?',
        [userId]
      );
      return this.getWallet(userId);
    } else {
      // Create new wallet
      const [result] = await Paymentpool.query(
        'INSERT INTO Wallet (userID, balance, status) VALUES (?, ?, \'ACTIVE\')',
        [userId, initialBalance]
      );
      return { id: result.insertId, balance: initialBalance, status: 'ACTIVE' };
    }
  }

  static async updateWalletBalance(userId, amount, isDeduction = false) {
    // Get current balance first to ensure sufficient funds
    const wallet = await this.getWallet(userId);
    
    if (!wallet) {
      throw new Error('Wallet not found or not active');
    }
    
    if (isDeduction && wallet.balance < amount) {
      throw new Error('Insufficient funds');
    }
    
    const operation = isDeduction ? 'balance - ?' : 'balance + ?';
    
    const [result] = await Paymentpool.query(
      `UPDATE Wallet SET balance = ${operation} WHERE userID = ? AND status = 'ACTIVE'`,
      [amount, userId]
    );
    
    if (result.affectedRows === 0) {
      throw new Error('Failed to update wallet balance');
    }
    
    return this.getWallet(userId);
  }

  // Payment operations
  static async createPayment(paymentData) {
    const { totalCost, cartID, service } = paymentData;
    
    const [result] = await Paymentpool.query(
      `INSERT INTO Payments 
      (time, date, service, totalCost, cartID)
      VALUES (CURRENT_TIME(), CURRENT_DATE(), ?, ?, ?)`,
      [service, totalCost, cartID]
    );
    
    return result.insertId;
  }

  static async getPayment(paymentId) {
    const [rows] = await Paymentpool.query(
      `SELECT id, totalCost, service, date, time, cartID
      FROM Payments
      WHERE id = ?`,
      [paymentId]
    );
    
    return rows.length > 0 ? rows[0] : null;
  }

  // Process payment with wallet
  static async processPaymentWithWallet(userId, cartData) {
    const { id: cartId, totalPrice } = cartData;
    
    // Start transaction
    const connection = await Paymentpool.getConnection();
    await connection.beginTransaction();
    
    try {
      // 1. Check wallet balance
      const wallet = await this.getWallet(userId);
      
      if (!wallet || wallet.balance < totalPrice) {
        throw new Error('Insufficient funds in wallet');
      }
      
      // 2. Create payment record
      let paymentId;
      
      const [paymentResult] = await connection.query(
        `INSERT INTO Payments 
        (time, date, service, totalCost, cartID)
        VALUES (CURRENT_TIME(), CURRENT_DATE(), 'WALLET', ?, ?)`,
        [totalPrice, cartId]
      );
      
      paymentId = paymentResult.insertId;
      
      // 3. Update wallet balance
      await connection.query(
        'UPDATE Wallet SET balance = balance - ? WHERE userID = ? AND status = \'ACTIVE\'',
        [totalPrice, userId]
      );
      
      // 4. Update cart status to 'paid'
      await connection.query(
        'UPDATE Carts SET status = \'paid\' WHERE id = ?',
        [cartId]
      );
      await connection.commit();
      
      return {
        success: true,
        paymentId,
        message: 'Payment processed successfully'
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
  
  //Add funds to wallet
  static async addFundsToWallet(userId, amount) {
    const connection = await Paymentpool.getConnection();
    await connection.beginTransaction();
    
    try {
      // 1. Check if wallet exists
      let wallet = await this.getWallet(userId);
      
      if (!wallet) {
        // Create a new wallet if it doesn't exist
        wallet = await this.createOrUpdateWallet(userId, amount);
      } else {
        // Update existing wallet balance
        await this.updateWalletBalance(userId, amount, false);
        wallet = await this.getWallet(userId);
      }
      
      // Create a record of the fund addition
      const [paymentResult] = await connection.query(
        `INSERT INTO Payments 
        (time, date, service, totalCost, cartID)
        VALUES (CURRENT_TIME(), CURRENT_DATE(), 'DEPOSIT', ?, NULL)`,
        [amount]
      );
      
      const paymentId = paymentResult.insertId;
      
      await connection.commit();
      
      return {
        success: true,
        paymentId,
        message: 'Funds added successfully',
        wallet: wallet
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
  
  // Get user wallet balance with payment in a single response
  static async getPaymentWithUserBalance(paymentId, userId) {
    const payment = await this.getPayment(paymentId);
    
    if (!payment) {
      return null;
    }
    
    const wallet = await this.getWallet(userId);
    const userBalance = wallet ? wallet.balance : 0;
    
    return {
      id: payment.id,
      amount: payment.totalCost,
      method: payment.service,
      date: payment.date,
      time: payment.time,
      userBalance
    };
  }
  
  // Added method for getting payment history
  static async getPaymentHistory(userId) {
    try {
      // Get all payments associated with user's carts
      const [rows] = await Paymentpool.query(
        `SELECT p.id, p.time, p.date, p.service, p.totalCost, p.cartID
         FROM Payments p
         JOIN Carts c ON p.cartID = c.id
         WHERE c.userID = ?
         ORDER BY p.date DESC, p.time DESC`,
        [userId]
      );
      
      return rows.length > 0 ? rows : [];
    } catch (error) {
      console.error('Error getting payment history:', error);
      return null;
    }
  }

  // Added method for getting wallet balance
  static async getWalletBalance(userId) {
    const wallet = await this.getWallet(userId);
    return wallet ? wallet.balance : 0;
  }
  
  // Database connection utility
  static async getConnection() {
    return await Paymentpool.getConnection();
  }
}

module.exports = PaymentModel;