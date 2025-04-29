const Event = require('../models/eventModel');

// Public
exports.listApproved = async (req, res) => {
  const events = await Event.listApproved();
  res.json({ success: true, events });
};
exports.findById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event || event.status !== 'approved') return res.status(404).json({ success: false, message: 'Event not found' });
  res.json({ success: true, event });
};

// Organizer
exports.listByOwner = async (req, res) => {
  const events = await Event.listByOwner(req.user.id);
  res.json({ success: true, events });
};
exports.create = async (req, res) => {
  const event = await Event.create({ ...req.body, owner: req.user.id });
  res.status(201).json({ success: true, event });
};
exports.update = async (req, res) => {
  const updated = await Event.update(req.params.id, req.body);
  if (!updated) return res.status(403).json({ success: false, message: 'Forbidden or not pending' });
  res.json({ success: true, message: 'Event updated' });
};
exports.delete = async (req, res) => {
  const deleted = await Event.delete(req.params.id);
  if (!deleted) return res.status(403).json({ success: false, message: 'Forbidden or not pending' });
  res.json({ success: true, message: 'Event deleted' });
};

// Admin
exports.listAll = async (req, res) => {
  const events = await Event.listAll();
  res.json({ success: true, events });
};
exports.setStatus = async (req, res) => {
  await Event.setStatus(req.params.id, req.body.status);
  res.json({ success: true, message: `Event ${req.body.status}` });
};
