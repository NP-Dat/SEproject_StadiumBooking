const db = require('../config/db');

class User {
  // Get user profile by ID
  static async getProfileById(id) {
    try {
      const [rows] = await db.execute(
        'SELECT id, userName, fullName, birth, phoneNumber, address, email, role FROM Users WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  static async updateProfile(id, userData) {
    const { fullName, birth, phoneNumber, address } = userData;
    
    try {
      // Build dynamic query based on provided fields
      let query = 'UPDATE Users SET ';
      const params = [];
      const updates = [];
      
      if (fullName !== undefined) {
        updates.push('fullName = ?');
        params.push(fullName);
      }
      
      if (birth !== undefined) {
        updates.push('birth = ?');
        params.push(birth);
      }
      
      if (phoneNumber !== undefined) {
        updates.push('phoneNumber = ?');
        params.push(phoneNumber);
      }
      
      if (address !== undefined) {
        updates.push('address = ?');
        params.push(address);
      }
      
      // If no fields to update, return early
      if (updates.length === 0) {
        return false;
      }
      
      query += updates.join(', ') + ' WHERE id = ?';
      params.push(id);
      
      const [result] = await db.execute(query, params);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get all users (Admin only)
  static async getAllUsers() {
    const [rows] = await db.execute(
      'SELECT id, userName, fullName, birth, phoneNumber, address, email, role FROM Users'
    );
    return rows;
  }

  // Search (Admin only)
  static async searchUsers(query) {
    const searchTerm = `%${query}%`;
    
    const [rows] = await db.execute(
      `SELECT id, userName, fullName, birth, phoneNumber, address, email, role
       FROM Users
       WHERE userName LIKE ? OR fullName LIKE ? OR email LIKE ?`,
      [searchTerm, searchTerm, searchTerm]
    );

    return rows;
  }

  // Get statistics (Admin only)
  static async getStatistics() {
    /// Get total user count
    const [totalCount] = await db.query('SELECT COUNT(*) AS totalCount FROM Users');

  // Get users registed in the last 30 days
    const [recentCount] = await db.query(
      'SELECT COUNT(*) AS recentCount FROM Users WHERE createdAt >= NOW() - INTERVAL 30 DAY'
    );

    // Get users by age groups
    const [ageGroups] = await db.query(
      `SELECT 
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, birth, CURDATE()) < 18 THEN 1 ELSE 0 END) AS under_18,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, birth, CURDATE()) BETWEEN 18 AND 25 THEN 1 ELSE 0 END) AS between_18_and_25,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, birth, CURDATE()) BETWEEN 26 AND 35 THEN 1 ELSE 0 END) AS between_26_and_35,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, birth, CURDATE()) > 35 THEN 1 ELSE 0 END) AS over_35
       FROM Users`
    );

    return {
      totalCount: totalCount[0].totalCount,
      recentCount: recentCount[0].recentCount,
      ageGroups: ageGroups[0],
    };
  }  
}

module.exports = User;
