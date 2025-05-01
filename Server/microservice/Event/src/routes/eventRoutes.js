const express = require('express');
const eventController = require('../controllers/eventController');
const { authenticateToken, authorizeOwner } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes (no authentication required)
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

// Protected routes (require authentication)
// router.post('/', authenticateToken, authorizeOwner, eventController.createEvent);
// router.put('/:id', authenticateToken, authorizeOwner, eventController.updateEvent);
// router.delete('/:id', authenticateToken, authorizeOwner, eventController.deleteEvent);

module.exports = router;
