const db = require('../config/db');

exports.createCustomer = async (userName, passWord, fullName, birth, phoneNumber, address, email) => {
  const [result] = await db.execute(
      `INSERT INTO Customers (userName, passWord, fullName, birth, phoneNumber, address, email)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userName, passWord, fullName, birth, phoneNumber, address, email]
  );
  return result.insertId;
};

exports.findCustomerByEmail = async (email) => {
  const [rows] = await db.execute(
      "SELECT * FROM Customers WHERE email = ?",
      [email]
  );
  return rows[0];
};
