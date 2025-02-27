const db = require('../config/db');

exports.createUser = async (username, email, passwordHash) => { // Tạo user mới
  const [result] = await db.execute(
    'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
    [username, email, passwordHash]
  );
  return result.insertId;
};

exports.findUserByEmail = async (email) => { // Tìm user theo email (wow, no generate comment dc ne)
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};
