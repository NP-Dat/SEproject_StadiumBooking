const pool = require('../config/db');

class UserModel {
  static async findById(id) {
    const [users] = await pool.query(
      'SELECT id, userName, email, fullName, phoneNumber, address FROM Customers WHERE id = ?',
      [id]
    );
    return users[0];
  }

  static async updateProfile(userId, profileData) {
    const { fullName, phoneNumber, address, preferences } = profileData;
    const [result] = await pool.query(
      `UPDATE Customers 
       SET fullName = ?, phoneNumber = ?, address = ?, preferences = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [fullName, phoneNumber, address, JSON.stringify(preferences), userId]
    );
    return result.affectedRows > 0;
  }

  static async createProfile(userId, profileData) {
    const { fullName, phoneNumber, address, preferences } = profileData;
    const [result] = await pool.query(
      `INSERT INTO Customers (id, fullName, phoneNumber, address, preferences)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, fullName, phoneNumber, address, JSON.stringify(preferences)]
    );
    return result.insertId;
  }

  static async deleteProfile(userId) {
    const [result] = await pool.query(
      'DELETE FROM Customers WHERE id = ?',
      [userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = UserModel;