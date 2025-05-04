const Paymentpool = require('../config/db');

class PaymentModel {
  // Wallet operations
  static async getWallet(userId) {
    const [rows] = await Paymentpool.query(
      "SELECT id, balance, status FROM Wallet WHERE userID = ? AND status = 'ACTIVE'",
      [userId]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  static async createOrUpdateWallet(userId, initialBalance) {
    const connection = await Paymentpool.getConnection();
    await connection.beginTransaction(); // Start a transaction

    try {
        // Try to find an existing wallet first
        let wallet = await this.getWallet(userId);

        if (!wallet) {
            // If no wallet exists, create a new one
            const [result] = await connection.query(
                `INSERT INTO Wallet (userID, balance, status) VALUES (?, ?, ?)`,
                [userId, initialBalance, 'active'] // Assuming 'active' status for new wallets
            );
            // Fetch the newly created wallet
            [wallet] = await connection.query(
                `SELECT * FROM Wallet WHERE id = ?`,
                [result.insertId]
            );
            wallet = wallet[0]; // Get the single row
        } else {
            // If wallet exists, update the balance
             await connection.query(
                `UPDATE Wallet SET balance = balance + ? WHERE userID = ?`,
                [initialBalance, userId]
            );
            // Fetch the updated wallet
            [wallet] = await connection.query(
                `SELECT * FROM Wallet WHERE userID = ?`,
                [userId]
            );
             wallet = wallet[0]; // Get the single row
        }

        await connection.commit(); // Commit the transaction
        return wallet;

    } catch (error) {
        await connection.rollback(); // Rollback on error
        console.error('Error creating or updating wallet:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}
  static async createAndProcessPayment(userId, paymentData) {
    const { totalCost, cartID, service } = paymentData;
    // Start transaction
    const connection = await this.getConnection();
    await connection.beginTransaction();
    try {
      // 1. Check wallet balance
      const wallet = await this.getWallet(userId);
      if (!wallet) {
        throw new Error('Wallet not found or not active');
      }
      if (wallet.balance < totalCost) {
        throw new Error('Insufficient funds in wallet');
      }
      if (wallet.balance < 0) {
        throw new Error('Wallet balance cannot be negative');
      }
      // 2. Create payment record
      const [paymentResult] = await connection.query(
        `INSERT INTO Payments 
        (time, date, service, totalCost, cartID)
        VALUES (CURRENT_TIME(), CURRENT_DATE(), ?, ?, ?)`,
        [service, totalCost, cartID]
      );
      const paymentId = paymentResult.insertId;
      // 3. Update wallet balance
      await connection.query(
        "UPDATE Wallet SET balance = balance - ? WHERE userID = ? AND status = 'ACTIVE'",
        [totalCost, userId]
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
  
  static async addFundsToWallet(userId, amount) {
    // Start transaction
    const connection = await this.getConnection();
    await connection.beginTransaction();
    
    try {
      // Update wallet balance
      await connection.query(
        "UPDATE Wallet SET balance = balance + ? WHERE userID = ? AND status = 'ACTIVE'",
        [amount, userId]
      );
      
      await connection.commit();
      
      return {
        success: true,
        message: 'Funds added successfully'
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
  // Get wallet balance for a user
  static async getWalletBalance(userId) {
    const [rows] = await Paymentpool.query(
      "SELECT id, balance FROM Wallet WHERE userID = ? AND status = 'ACTIVE'",
      [userId]
    );
    
    return rows.length > 0 ? rows[0] : null;
  }
  // Get payment history for a user
  static async getPaymentHistory(userId) {
    const [rows] = await Paymentpool.query(
      `SELECT id, totalCost, service, date, time
      FROM Payments 
      ORDER BY date DESC, time DESC`,
      [userId]
    );
    
    return rows.length > 0 ? rows : null;
  }
  // Database connection utility
  static async getConnection() {
    return await Paymentpool.getConnection();
  }
}

module.exports = PaymentModel;