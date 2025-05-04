const pool = require('../config/db');
const bcrypt = require('bcrypt');

class UserModel {
  static async findById(id) {
    const [users] = await pool.query(
      'SELECT id, phoneNumber, address, birth, fullName, userName, email FROM Customers WHERE id = ?',
      [id]
    );
    if (!users.length) return null;
    return users[0];
  }

  static async updateProfile(id, profileData) {
    const { fullname, phonenumber, address, birth, email, password, username } = profileData;
    
    
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

  // method to verify passwords if user is updating password
  // static async verifyPassword(userId, password) {
  //   const [users] = await pool.query(
  //     'SELECT passWord FROM Customers WHERE id = ?',
  //     [userId]
  //   );
    
  //   if (!users.length) return false;
  //   console.log('Hashed password:', users[0].passWord);
  //   const hashedPassword = users[0].passWord;
  //   return await bcrypt.compare(password, hashedPassword);
  // }

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