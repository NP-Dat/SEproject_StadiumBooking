const EventSchedule = require('../models/eventScheduleModel');

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await EventSchedule.getAllSchedules();
    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await EventSchedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }
    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getScheduleByEventId = async (req, res) => {
  try {
    const schedules = await EventSchedule.getScheduleByEventId(req.params.eventId);
    if (!schedules.length) {
      return res.status(404).json({ success: false, message: 'No schedules found for this event' });
    }
    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    // Extract query parameters if provided
    const eventId = req.query.event_id;
    const stadiumId = req.query.stadium_id;
    
    // Merge query parameters with request body
    let scheduleData = { ...req.body };
    if (eventId) scheduleData.eventID = eventId;
    if (stadiumId) scheduleData.stadiumID = stadiumId;
    
    // Validate required fields
    if (!scheduleData.eventID || !scheduleData.stadiumID || !scheduleData.date || 
        !scheduleData.timeStart || !scheduleData.timeEnd) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: eventID, stadiumID, date, timeStart, and timeEnd are required' 
      });
    }
    
    const schedule = await EventSchedule.create(scheduleData);
    res.status(201).json({ success: true, data: schedule });
  } catch (error) {
    // Handle schedule conflict errors as client errors (400)
    if (error.message.includes('Schedule conflict')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    // Get ID from query parameter instead of route parameter
    const scheduleId = req.query.schedule_id;
    
    if (!scheduleId) {
      return res.status(400).json({ success: false, message: 'Missing schedule_id query parameter' });
    }
    
    // Check if schedule exists
    const schedule = await EventSchedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }
    
    const updatedSchedule = await EventSchedule.update(scheduleId, req.body);
    res.status(200).json({ success: true, data: updatedSchedule });
  } catch (error) {
    // Handle schedule conflict errors as client errors (400)
    if (error.message.includes('Update failed')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    // Handle not found errors
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    // Get ID from query parameter instead of route parameter
    const scheduleId = req.query.schedule_id;
    
    if (!scheduleId) {
      return res.status(400).json({ success: false, message: 'Missing schedule_id query parameter' });
    }
    
    // Check if schedule exists
    const schedule = await EventSchedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }
    
    await EventSchedule.delete(scheduleId);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    // Handle not found errors
    if (error.message.includes('not found')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
