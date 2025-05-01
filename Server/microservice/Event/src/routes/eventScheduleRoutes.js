const express = require('express');
const eventScheduleController = require('../controllers/eventScheduleController');
// const { authenticateToken, authorizeOwner } = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.get('/', eventScheduleController.getAllSchedules);
router.get('/:id', eventScheduleController.getScheduleById);
router.get('/event/:eventId', eventScheduleController.getScheduleByEventId);

// Protected routes later with different user roles
// router.post('/', authenticateToken, authorizeOwner, eventScheduleController.createSchedule);
// router.put('/:id', authenticateToken, authorizeOwner, eventScheduleController.updateSchedule);
// router.delete('/:id', authenticateToken, authorizeOwner, eventScheduleController.deleteSchedule);

module.exports = router;
