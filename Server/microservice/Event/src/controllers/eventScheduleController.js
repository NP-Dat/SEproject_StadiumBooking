const EventSchedule = require('../models/eventScheduleModel');

// Public
exports.findById = async (req, res) => {
  const schedule = await EventSchedule.findById(req.params.id);
  if (!schedule) return res.status(404).json({ success: false, message: 'Schedule not found' });
  res.json({ success: true, schedule });
};
exports.listByEvent = async (req, res) => {
  const schedules = await EventSchedule.listByEvent(req.params.eventId);
  res.json({ success: true, schedules });
};

// Organizer
exports.create = async (req, res) => {
  // Optionally, check for conflicts here
  const schedule = await EventSchedule.create(req.body);
  res.status(201).json({ success: true, schedule });
};
exports.update = async (req, res) => {
  const updated = await EventSchedule.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'Schedule not found' });
  res.json({ success: true, message: 'Schedule updated' });
};
exports.delete = async (req, res) => {
  const deleted = await EventSchedule.delete(req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'Schedule not found' });
  res.json({ success: true, message: 'Schedule deleted' });
};
exports.getOrganizerCalendarView = async (req, res) => {
  const { startDate, endDate } = req.query;
  const calendar = await EventSchedule.getOrganizerCalendarView(req.user.id, startDate, endDate);
  res.json({ success: true, calendar });
};
exports.checkSchedulingConflicts = async (req, res) => {
  const { stadiumID, date, timeStart, timeEnd } = req.body;
  const conflicts = await EventSchedule.checkSchedulingConflicts(stadiumID, date, timeStart, timeEnd);
  res.json({ success: true, conflicts });
};
exports.getAvailableStadiums = async (req, res) => {
  const { date, timeStart, timeEnd } = req.query;
  const stadiums = await EventSchedule.getAvailableStadiums(date, timeStart, timeEnd);
  res.json({ success: true, stadiums });
};

// Admin
exports.listAll = async (req, res) => {
  const schedules = await EventSchedule.listAll(req.query);
  res.json({ success: true, schedules });
};
exports.getStadiumUtilization = async (req, res) => {
  const { startDate, endDate } = req.query;
  const stats = await EventSchedule.getStadiumUtilization(startDate, endDate);
  res.json({ success: true, stats });
};
exports.getUpcomingSchedules = async (req, res) => {
  const { limit } = req.query;
  const schedules = await EventSchedule.getUpcomingSchedules(Number(limit) || 10);
  res.json({ success: true, schedules });
};
