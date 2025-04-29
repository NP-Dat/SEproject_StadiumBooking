const { body, validationResult } = require('express-validator');

// Validate registration input
const validateRegistration = [
  body('userName')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers and underscores'),
  
  body('passWord')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('email')
    .isEmail()
    .withMessage('Must provide a valid email address')
    .normalizeEmail(),
  
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),
  
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
];

// Validate login input
const validateLogin = [
  body('credential')
    .trim()
    .notEmpty()
    .withMessage('Username or email is required'),
  
  body('passWord')
    .notEmpty()
    .withMessage('Password is required')
];

// Validate role update
const validateRoleUpdate = [
  body('userId')
    .isInt()
    .withMessage('User ID must be an integer'),
  
  body('newRole')
    .isIn(['customer', 'organizer', 'admin'])
    .withMessage('Invalid role specified')
];

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateRoleUpdate,
  handleValidationErrors
};
