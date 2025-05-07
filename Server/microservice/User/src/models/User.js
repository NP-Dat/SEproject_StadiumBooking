const pool = require('../config/db');
const bcrypt = require('bcrypt');

class UserModel {
  static async findById(id) {
    const [users] = await pool.query(
      'SELECT id, phoneNumber, address, birth, fullName, userName, email FROM Customers WHERE id = ?',
      [id]
    );
    if (!users.length) return null;
    const user = users[0];

    const [tickets] = await pool.query(
      `SELECT 
         t.id AS ticketId,
         el.name AS eventName,
         es.date AS eventDate,
         es.timeStart,
         es.timeEnd,
         s.name AS stadiumName,
         ez.name AS zoneName,
         ez.price AS ticketPrice,
         se.seat_number AS seatNumber,
         c.status AS cartStatus
       FROM Tickets t
       JOIN EventSchedules es ON t.scheduleID = es.id
       JOIN EventList el ON es.eventID = el.id
       JOIN Stadiums s ON es.stadiumID = s.id
       JOIN eventZone ez ON t.zoneID = ez.id
       JOIN Seats se ON t.seatID = se.id
       JOIN Carts c ON t.cartID = c.id
       WHERE t.userID = ?`,
      [id]
    );

    // Combine user profile with tickets
    return {
      ...user,
      tickets: tickets
    };
  }

  static async updateProfile(id, profileData) {
    const { fullname, phonenumber, address, email} = profileData;
    
    const [result] = await pool.query(
      `UPDATE Customers 
       SET fullName = ?, 
           phoneNumber = ?, 
           address = ?,
           email = ?
       WHERE id = ?`,
      [fullname, phonenumber, address, email, id]
    );
    
    return result.affectedRows > 0;
  }

  static async deleteProfile(userId) {
    const [result] = await pool.query(
      'DELETE FROM Customers WHERE id = ?',
      [userId]
    );
    return result.affectedRows > 0;
  }
  static async findAllUsers() {
    console.log('findAllUsers method called');
    const [users] = await pool.query(
      'SELECT id, userName, email, fullName, birth, passWord, phoneNumber, address FROM Customers'
    );
    console.log('Users retrieved successfully');
    return users;
  }

}

module.exports = UserModel;