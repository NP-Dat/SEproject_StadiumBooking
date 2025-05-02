const mysql = require('mysql2');
require('dotenv').config();

// 1. Add connection timeout and retry logic
const Paymentpool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql-30c1cee5-npdat-seproject-demo.h.aivencloud.com',
  user: process.env.DB_USER || 'avnadmin',
  port: process.env.DB_PORT || 18801,
  password: process.env.DB_PASSWORD || 'AVNS_V2KckzMRUmiKB1zpepL',
  database: process.env.DB_NAME || 'payment_db_v1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000, // Increase timeout to 60 seconds
  acquireTimeout: 10000  // Increase acquire timeout to 60 seconds
}).promise();
module.exports = Paymentpool;
