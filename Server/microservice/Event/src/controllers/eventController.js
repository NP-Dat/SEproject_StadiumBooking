const Event = require('../models/eventModel');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.getAllEvent();
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    // If error is about duplicate data, return 400 instead of 500
    if (error.message.includes('Event already exists')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    // Get ID from query parameter instead of route parameter
    const eventId = req.query.event_id;
    
    if (!eventId) {
      return res.status(400).json({ success: false, message: 'Missing event_id query parameter' });
    }
    
    // Check if event exists
    const event = await Event.getEventById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    const updatedEvent = await Event.update(eventId, req.body);
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    // Handle unique constraint violations as client errors
    if (error.message.includes('Update failed')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    // Handle event not found errors
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    // Get ID from query parameter instead of route parameter
    const eventId = req.query.event_id;
    
    if (!eventId) {
      return res.status(400).json({ success: false, message: 'Missing event_id query parameter' });
    }
    
    // Check if event exists
    const event = await Event.getEventById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    
    await Event.delete(eventId);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    // Handle event not found errors
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
