const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customerModel = require('../models/customerModel');
require('dotenv').config();

exports.register = async (req, res) => {
  const { userName, passWord, fullName, birth, phoneNumber, address, email } = req.body;
  try {
    // Check if the email already exists
    const existingCustomer = await customerModel.findCustomerByEmail(email);
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email is already in use' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(passWord, 10);
    const customerId = await customerModel.createCustomer(userName, hashedPassword, fullName, birth, phoneNumber, address, email);
    res.status(201).json({ message: 'Registration successful', customerId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, passWord } = req.body;
  try {
    const customer = await customerModel.findCustomerByEmail(email);
    if (!customer) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const isMatch = await bcrypt.compare(passWord, customer.passWord);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    // Create a JWT token
    const token = jwt.sign({ id: customer.id, email: customer.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
