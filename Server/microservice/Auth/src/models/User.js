const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class UserModel {
  static async findByEmail(email) {
    const [users] = await pool.query('SELECT 1 FROM Customers WHERE email = ?', [email]);
    return users[0] ? true : false;
  }

  static async findPasswordByEmail(email) {
    const [passwords] = await pool.query('SELECT passWord FROM Customers WHERE email = ?', [email]);
    return passwords.length > 0 ? passwords[0].passWord : null;
  }

  static async findById(id) {
    const [users] = await pool.query('SELECT id, username, email FROM users WHERE id = ?', [id]);
    return users[0];
  }

  static async create(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO Customers (userName, email, passWord, fullName, birth, phoneNumber, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, email, hashedPassword,"Dat", "2000-01-01", "0123456789", "HCM"]
    );
    return result.insertId;
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = UserModel;