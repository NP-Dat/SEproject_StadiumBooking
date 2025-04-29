const express = require('express');
const router = express.Router();
const c = require('../controllers/eventController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Public
router.get('/approved', c.listApproved);
router.get('/:id', c.findById);

// Organizer
router.get('/organizer/myevents', authenticate, authorize('organizer'), c.listByOwner);
router.post('/organizer', authenticate, authorize('organizer'), c.create);
router.put('/organizer/:id', authenticate, authorize('organizer'), c.update);
router.delete('/organizer/:id', authenticate, authorize('organizer'), c.delete);

// Admin
router.get('/admin/all', authenticate, authorize('admin'), c.listAll);
router.put('/admin/:id/status', authenticate, authorize('admin'), c.setStatus);

module.exports = router;
