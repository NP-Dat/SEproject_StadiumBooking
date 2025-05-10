const express = require('express');
const StadiumController = require('../controllers/stadiumController');

const router = express.Router();

// Get all stadiums (with events)
router.get('/', StadiumController.getAllStadiums);

// Get a specific stadium by ID (with events)
router.get('/:id', StadiumController.getStadiumById);

// --- Optional Basic CRUD routes ---
// Create a new stadium
router.post('/', StadiumController.createStadium);

// Update an existing stadium
router.put('/:id', StadiumController.updateStadium);

// Delete a stadium
router.delete('/:id', StadiumController.deleteStadium);

module.exports = router;