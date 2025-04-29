const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  // Find user by username or email
  static async findByCredentials(credential) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM Users WHERE userName = ? OR email = ? LIMIT 1',
        [credential, credential]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const [rows] = await db.execute(
        'SELECT id, userName, email, fullName, role FROM Users WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new user
  static async create(userData) {
    const { userName, passWord, fullName, birth, phoneNumber, address, email, role } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passWord, salt);
    
    try {
      const [result] = await db.execute(
        'INSERT INTO Users (userName, passWord, fullName, birth, phoneNumber, address, email, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [userName, hashedPassword, fullName, birth, phoneNumber, address, email, role || 'customer']
      );
      
      return { id: result.insertId, ...userData, passWord: undefined };
    } catch (error) {
      throw error;
    }
  }

  // Check if username or email already exists
  static async checkExisting(userName, email) {
    try {
      const [rows] = await db.execute(
        'SELECT * FROM Users WHERE userName = ? OR email = ?',
        [userName, email]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Update user role
  static async updateRole(userId, role) {
    try {
      const [result] = await db.execute(
        'UPDATE Users SET role = ? WHERE id = ?',
        [role, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Check if any admin exists
  static async adminExists() {
    try {
      const [rows] = await db.execute(
        'SELECT COUNT(*) as count FROM Users WHERE role = ?',
        ['admin']
      );
      return rows[0].count > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get all users (for admin panel)
  static async getAllUsers() {
    try {
      const [rows] = await db.execute(
        'SELECT id, userName, fullName, email, phoneNumber, role FROM Users'
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Change password
  static async changePassword(userId, currentPassword, newPassword) {
    try {
      // First verify the current password
      const [rows] = await db.execute(
        'SELECT passWord FROM Users WHERE id = ?',
        [userId]
      );
      
      if (!rows[0]) {
        return { success: false, message: 'User not found' };
      }
      
      const isMatch = await bcrypt.compare(currentPassword, rows[0].passWord);
      if (!isMatch) {
        return { success: false, message: 'Current password is incorrect' };
      }
      
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Update the password
      const [result] = await db.execute(
        'UPDATE Users SET passWord = ? WHERE id = ?',
        [hashedPassword, userId]
      );
      
      return { 
        success: result.affectedRows > 0, 
        message: result.affectedRows > 0 ? 'Password updated successfully' : 'Failed to update password' 
      };
    } catch (error) {
      throw error;
    }
  }

  // Forgot password - Reset password by email
  static async resetPasswordByEmail(email, newPassword) {
    try {
      // Check if user exists
      const [rows] = await db.execute(
        'SELECT id FROM Users WHERE email = ?',
        [email]
      );
      
      if (!rows[0]) {
        return { success: false, message: 'No account found with that email address' };
      }
      
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Update the password
      const [result] = await db.execute(
        'UPDATE Users SET passWord = ? WHERE id = ?',
        [hashedPassword, rows[0].id]
      );
      
      return { 
        success: result.affectedRows > 0,
        message: result.affectedRows > 0 ? 'Password has been reset successfully' : 'Failed to reset password'
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
