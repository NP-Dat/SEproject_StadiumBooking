const { body, validationResult } = require('express-validator');

// Validate profile update input
const validateProfileUpdate = [
  body('fullName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  
  body('phoneNumber')
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage('Must provide a valid phone number'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage('Address must be between 5 and 255 characters'),
  
  body('birth')
    .optional()
    .isDate()
    .withMessage('Must provide a valid date')
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
  validateProfileUpdate,
  handleValidationErrors
};
