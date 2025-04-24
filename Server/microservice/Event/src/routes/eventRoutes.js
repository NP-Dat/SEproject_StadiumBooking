const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public routes
router.get('/', EventController.getEvents);
router.get('/:id', EventController.getEvent);

// Protected routes
router.post('/', authenticateToken, EventController.createEvent);
router.put('/:id', authenticateToken, EventController.updateEvent);
router.delete('/:id', authenticateToken, EventController.deleteEvent);

module.exports = router;