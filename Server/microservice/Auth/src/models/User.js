const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class UserModel {
  static async findByUsername(username) {
    const [users] = await pool.query('SELECT * FROM Customers WHERE username = ?', [username]);
    return users[0];
  }

  static async findPasswordByUsername(username) {
    const [passwords] = await pool.query('SELECT passWord FROM Customers WHERE username = ?', [username]);
    return passwords.length > 0 ? passwords[0].passWord : null;
  }

  static async findById(id) {
    const [users] = await pool.query('SELECT id, username, email FROM users WHERE id = ?', [id]);
    return users[0];
  }

  static async create(username, password, fullname, birth, phonenumber, email, address) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO Customers (userName, email, passWord, fullName, birth, phoneNumber, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, email, hashedPassword,fullname, birth, phonenumber, address]
    );
    return result.insertId;
  }
  static async setRole(id){
    const [result] = await pool.query(
      'INSERT INTO Roles (userID, role) VALUES (?, ?)',
      [id, 'user']
    );
  
    return result.insertId;

  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = UserModel;