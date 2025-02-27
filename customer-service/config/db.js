const mysql = require('mysql2');
require('dotenv').config(); // must be at the top

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false } // for self-signed certificate, if needed
});

pool.promise().query("SELECT 1;")
    .then(() => console.log("Connected to the database successfully."))
    .catch((err) => console.error("Database connection failed:", err));

module.exports = pool.promise();

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
