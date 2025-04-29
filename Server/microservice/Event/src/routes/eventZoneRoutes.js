const express = require('express');
const router = express.Router();
const c = require('../controllers/eventZoneController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Public
router.get('/schedule/:scheduleId', c.listBySchedule);

// Organizer/Admin
router.post('/organizer', authenticate, authorize('organizer', 'admin'), c.create);
router.put('/organizer/:id', authenticate, authorize('organizer', 'admin'), c.update);
router.delete('/organizer/:id', authenticate, authorize('organizer', 'admin'), c.delete);

module.exports = router;
