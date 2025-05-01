const EventSchedule = require('../models/eventScheduleModels');

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
    const schedule = await EventSchedule.create(req.body);
    res.status(201).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await EventSchedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }
    const updatedSchedule = await EventSchedule.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedSchedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await EventSchedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }
    await EventSchedule.delete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
