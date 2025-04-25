const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get the JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'stadium_booking_secret_key';

// Create an admin token
const adminToken = jwt.sign(
  { 
    userId: 1,  // User ID 1
    isAdmin: true  // Admin flag
  }, 
  JWT_SECRET,
  { expiresIn: '24h' } // Token expires in 24 hours
);

// Create a regular user token
const userToken = jwt.sign(
  { 
    userId: 2,  // User ID 2
    isAdmin: false  // Not an admin
  }, 
  JWT_SECRET,
  { expiresIn: '24h' } // Token expires in 24 hours
);

console.log('\n========== JWT TOKENS FOR TESTING ==========');
console.log('\nADMIN TOKEN:');
console.log(adminToken);
console.log('\nUSER TOKEN:');
console.log(userToken);
console.log('\nUse these tokens in Postman with the Authorization header:');
console.log('Bearer TOKEN_HERE');
console.log('\n===========================================');