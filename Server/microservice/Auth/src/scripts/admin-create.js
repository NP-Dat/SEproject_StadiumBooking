const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function seedAdmin() {
  let connection;
  
  try {
    // Create a connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
    
    console.log('Connected to database');
    
    // Check if any admin exists
    const [adminCheck] = await connection.execute(
      'SELECT COUNT(*) as count FROM Users WHERE role = ?',
      ['admin']
    );
    
    if (adminCheck[0].count > 0) {
      console.log('Admin user already exists. Skipping seed.');
      return;
    }
    
    // Create admin user from environment variables
    const userName = process.env.ADMIN_USERNAME;
    const passWord = process.env.ADMIN_PASSWORD;
    const fullName = process.env.ADMIN_FULLNAME;
    const email = process.env.ADMIN_EMAIL;
    const phoneNumber = process.env.ADMIN_PHONE;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passWord, salt);
    
    // Insert admin user
    await connection.execute(
      'INSERT INTO Users (userName, passWord, fullName, phoneNumber, email, role) VALUES (?, ?, ?, ?, ?, ?)',
      [userName, hashedPassword, fullName, phoneNumber, email, 'admin']
    );
    
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the seeding function
seedAdmin();
