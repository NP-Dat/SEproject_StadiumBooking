const pool = require('../config/db');

class UserModel {
  static async findById(id) {
    const [users] = await pool.query(
      'SELECT id, userName, email, fullName, birth, passWord, phoneNumber, address FROM Customers WHERE id = ?',
      [id]
    );
    if (!users.length) return null;
    return users[0];
  }

  static async updateProfile(userId, profileData) {
    const { fullName, phoneNumber, address} = profileData;
    const [result] = await pool.query(
      // updated_at isnt in the Customers table in DB yet, might delete if not needed
      `UPDATE Customers 
       SET fullName = ?, phoneNumber = ?, address = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [fullName, phoneNumber, address, userId]
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
}

module.exports = UserModel;