const pool = require('../config/db');

class BookingModel {

  async getStartAndEndOfZone(zoneID) {
    try {
      const query = `
        SELECT startSeatID, endSeatID
        FROM eventZone
        WHERE id = ?
      `;
      
      const [result] = await pool.query(query, [zoneID]);
      
      // Return the start and end seat IDs as an object if found, otherwise return null
      if (result[0]) {
        return { start: result[0].startSeatID, 
                end: result[0].endSeatID 
              };
      }
      console.log(`No start and end found with ID ${zoneID}`);
      return null;
    } catch (error) {
      console.error('Error getting start and end seat IDs:', error);
      throw error;
    }
  }

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

      const zone = await this.getStartAndEndOfZone(zoneID);
      
      // Return the maxSeatID if found, otherwise return startSeatID

      return result[0]?.maxSeatID || zone.start - 1; // -1 because we will increment it in the insertMultipleTickets method
    } catch (error) {
      console.error('Error getting biggest seatID:', error);
      throw error;
    }
  }

  /**
   * Insert multiple tickets with incrementing seatIDs
   * @param {number} userID - User ID for the tickets
   * @param {number} scheduleID - Schedule ID for the tickets
   * @param {number} zoneID - Zone ID for the tickets
   * @param {number} cartID - Cart ID for the tickets
   * @param {number} count - Number of tickets to insert
   * @returns {Promise<Array>} - Array of inserted ticket IDs
   */
  async insertMultipleTickets(userID, scheduleID, zoneID, cartID, count) {
    try {
      const highestSeatID = await this.getBiggestSeatID(scheduleID, zoneID);
      const zone = await this.getStartAndEndOfZone(zoneID);

      const startSeatID = highestSeatID; // Use the highest seat ID as the starting point
      if (startSeatID + count > zone.end){
        throw new Error(`Not enough seats available in zone ${zoneID}. Only ${zone.end - startSeatID} seats left.`);
      }
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

  async updateCartStatus(cartID, status) {
    try {
      const query = `
        UPDATE Carts
        SET status = ?
        WHERE id = ?
      `;
      
      const [result] = await pool.query(query, [status, cartID]);

      if (result.affectedRows === 0) {
        throw new Error(`Cart with ID ${cartID} not found`);
      }
      return result.affectedRows;
    } catch (error) {
      console.error('Error updating cart status:', error);
      throw error;
    }

  }

  async deleteCart(cartID) {
    try {
      const query = `
        DELETE FROM Carts
        WHERE id = ?
      `;
      
      const [result] = await pool.query(query, [cartID]);
      if (result.affectedRows === 0) {
        throw new Error(`Cart with ID ${cartID} not found for deletion`);
      }
      return result.affectedRows;
    } catch (error) {
      console.error('Error deleting cart:', error);
      throw error;
    }
  }
}

module.exports = BookingModel;