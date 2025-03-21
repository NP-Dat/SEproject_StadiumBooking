const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class OwnerModel {
  static async findByEmail(email) {
    const [users] = await pool.query('SELECT * FROM Owners WHERE email = ?', [email]);
    return users[0];
  }

  static async findPasswordByEmail(email) {
    const [passwords] = await pool.query('SELECT passWord FROM Owners WHERE email = ?', [email]);
    return passwords.length > 0 ? passwords[0].passWord : null;
  }

  static async findById(id) {
    const [users] = await pool.query('SELECT id, username, email FROM Owners WHERE id = ?', [id]);
    return users[0];
  }

  static async create(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO Owners (userName, email, passWord, phoneNumber) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, '555123456789']
    );
    return result.insertId;
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = OwnerModel;