const pool = require('../config/db');

class UserModel {
  static async findById(id) {
    const [users] = await pool.query(
      'SELECT id, username, email, full_name, phone, address, preferences FROM user_profiles WHERE user_id = ?',
      [id]
    );
    return users[0];
  }

  static async updateProfile(userId, profileData) {
    const { full_name, phone, address, preferences } = profileData;
    const [result] = await pool.query(
      `UPDATE user_profiles 
       SET full_name = ?, phone = ?, address = ?, preferences = ?, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ?`,
      [full_name, phone, address, JSON.stringify(preferences), userId]
    );
    return result.affectedRows > 0;
  }

  static async createProfile(userId, profileData) {
    const { full_name, phone, address, preferences } = profileData;
    const [result] = await pool.query(
      `INSERT INTO user_profiles (user_id, full_name, phone, address, preferences)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, full_name, phone, address, JSON.stringify(preferences)]
    );
    return result.insertId;
  }

  static async deleteProfile(userId) {
    const [result] = await pool.query(
      'DELETE FROM user_profiles WHERE user_id = ?',
      [userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = UserModel;