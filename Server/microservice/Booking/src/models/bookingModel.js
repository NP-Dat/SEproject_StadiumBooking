const pool = require('../config/db');
const moment = require('moment');

class BookingModel {
  /**
   * Get the biggest seatID for tickets with specific scheduleID and zoneID
   * @param {number} scheduleID - The schedule ID
   * @param {number} zoneID - The zone ID
   * @returns {Promise<number>} - The biggest seatID or 0 if no records found
   */
  async getBiggestSeatID(scheduleID, zoneID) {
    try {
      const query = `
        SELECT MAX(seatID) AS maxSeatID
        FROM Tickets
        WHERE scheduleID = ? AND zoneID = ?
      `;
      
      const [result] = await pool.query(query, [scheduleID, zoneID]);
      
      // Return the maxSeatID if found, otherwise return 0
      return result[0]?.maxSeatID || 0;
    } catch (error) {
      console.error('Error getting biggest seatID:', error);
      throw error;
    }
  }

  /**
   * Insert multiple tickets with incrementing seatIDs
   * @param {number} userID - User ID for the tickets
   * @param {number} startSeatID - Starting seat ID (will increment from this value)
   * @param {number} scheduleID - Schedule ID for the tickets
   * @param {number} zoneID - Zone ID for the tickets
   * @param {number} cartID - Cart ID for the tickets
   * @param {number} count - Number of tickets to insert
   * @returns {Promise<Array>} - Array of inserted ticket IDs
   */
  async insertMultipleTickets(userID, startSeatID, scheduleID, zoneID, cartID, count) {
    try {
      const insertedTicketIds = [];
      
      // Begin transaction
      await pool.query('START TRANSACTION');
      
      for (let i = 0; i < count; i++) {
        const currentSeatID = startSeatID + i + 1; // Increment from the starting seat ID
        
        const query = `
          INSERT INTO Tickets (userID, seatID, scheduleID, zoneID, cartID)
          VALUES (?, ?, ?, ?, ?)
        `;
        
        const [result] = await pool.query(query, [userID, currentSeatID, scheduleID, zoneID, cartID]);
        insertedTicketIds.push(result.insertId);
      }
      
      // Commit transaction
      await pool.query('COMMIT');
      
      return insertedTicketIds;
    } catch (error) {
      // Rollback transaction in case of error
      await pool.query('ROLLBACK');
      console.error('Error inserting multiple tickets:', error);
      throw error;
    }
  }

  /**
   * Create a new cart for a user with ticket information
   * @param {number} userID - ID of the user creating the cart
   * @param {Array<Object>} ticketInfo - Array of ticket information objects
   *                                    Each object should have: {zoneID, scheduleID, quantity}
   * @returns {Promise<Object>} - The created cart with ID and calculated values
   */
  async createCart(userID, ticketInfo) {
    try {
      // Begin transaction
      await pool.query('START TRANSACTION');
      
      // Calculate total number of tickets
      const numberOfTickets = ticketInfo.reduce((total, item) => total + item.quantity, 0);
      
      // Calculate total price by querying zone prices and multiplying by quantities
      let totalPrice = 0;
      for (const item of ticketInfo) {
        const query = 'SELECT price FROM eventZone WHERE id = ?';
        const [results] = await pool.query(query, [item.zoneID]);
        
        if (results.length === 0) {
          throw new Error(`Zone with ID ${item.zoneID} not found`);
        }
        
        const zonePrice = results[0].price;
        totalPrice += zonePrice * item.quantity;
      }
      
      // Insert the cart with unpaid status
      const insertCartQuery = `
        INSERT INTO Carts (userID, numberOfTicket, totalPrice, status)
        VALUES (?, ?, ?, 'unPaid')
      `;
      
      const [result] = await pool.query(insertCartQuery, [userID, numberOfTickets, totalPrice]);
      const cartID = result.insertId;
      
      // Commit transaction
      await pool.query('COMMIT');
      
      return {
        id: cartID,
        userID,
        numberOfTicket: numberOfTickets,
        totalPrice,
        status: 'unPaid'
      };
    } catch (error) {
      // Rollback transaction in case of error
      await pool.query('ROLLBACK');
      console.error('Error creating cart:', error);
      throw error;
    }
  }
}

module.exports = BookingModel;