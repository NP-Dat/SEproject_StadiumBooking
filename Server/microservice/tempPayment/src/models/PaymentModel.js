const pool = require('../config/db');

class PaymentModel {

  async checkAlreadyWallet(userID) {
    try {
      const query = 'SELECT id FROM Wallet WHERE userID = ?';
      const [result] = await pool.query(query, [userID]);
      if (result.length > 0) {
        console.log("result:"+result[0].id); // Log the wallet ID
        return result[0].id; // Return the wallet ID if it exists
      } else {
        return null; // No wallet found for this user
      }
    } catch (error) {
      console.error('Error checking wallet existence:', error);
      throw error;
    }
  }

  async createWallet(userID, initialBalance) {
    try {
      const query = 'INSERT INTO Wallet (userID, balance) VALUES (?, ?)';
      const [result] = await pool.query(query, [userID, initialBalance]);
      const insertedId = result.insertId; // MySQL provides the ID of the inserted row here
      return insertedId;
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
    }
  }

  async addMoney(userID, amount) {
    try {
      const query = 'UPDATE Wallet SET balance = balance + ? WHERE userID = ?';
      const [result] = await pool.query(query, [amount, userID]);
      const success = result.affectedRows > 0; // Initialize success variable
      const wallet = await this.getWallet(userID);
    
    // Return an object with both success status and wallet details
    return {
      success: success,
      balance: wallet ? wallet.balance : null
    };
    } catch (error) {
      console.error('Error adding money to wallet:', error);
      throw error;
    }
  }

  async getWallet(userID) {
    try {
      const query = 'SELECT * FROM Wallet WHERE userID = ?';
      const [result] = await pool.query(query, [userID]);
      if (result.length > 0) {
        return result[0]; // Return the wallet details
      } else {
        return null; // No wallet found for this user
      }
    } catch (error) {
      console.error('Error retrieving wallet:', error);
      throw error;
    }
  }

  async processPayment(userID, cartID, totalPrice, walletBalance) {
    try {
      const balance = walletBalance; // Ensure balance is a number
      const remain = balance - totalPrice; // Calculate remaining balance
      if (remain < 0) {
        return remain;  // Return negative balance if insufficient funds
      }

      // Deduct the total price from the wallet balance
      const query = 'UPDATE Wallet SET balance = ? WHERE userID = ?';
      const [result] = await pool.query(query, [remain, userID]);
      const success = result.affectedRows > 0; // Check if the update was successful
      if (success){
        const createdPayment = await this.createPayment(cartID, totalPrice, "wallet"); // Create a payment record
        return createdPayment; // Return the ID of the created payment if sufficient funds
      }
  
      return 0; // Return 0 if the update was failed

    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  async createPayment(cartID, totalCost, service) {
    try {
      const query = 'INSERT INTO Payments (time, date, service, totalCost, cartID) VALUES (?, ?, ?, ?, ?)';
      const currentDate = new Date();
      const gmt7Date = new Date(currentDate.getTime() + 7 * 60 * 60 * 1000); // Adjust to GMT+7
      const formattedDate = gmt7Date.toISOString().slice(0, 10); // Format date as YYYY-MM-DD
      const formattedTime = gmt7Date.toISOString().slice(11, 19); // Format time as HH:MM:SS
      const [result] = await pool.query(query, [formattedTime, formattedDate, service, totalCost, cartID]);
      const insertedId = result.insertId; // MySQL provides the ID of the inserted row here 
      return insertedId; // Return the ID of the created payment
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

}

module.exports = PaymentModel;