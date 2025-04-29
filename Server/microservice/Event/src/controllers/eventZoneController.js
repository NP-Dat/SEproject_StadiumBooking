const EventZone = require('../models/eventZoneModel');

// Public
exports.listBySchedule = async (req, res) => {
  const zones = await EventZone.listBySchedule(req.params.scheduleId);
  res.json({ success: true, zones });
};

// Organizer/Admin
exports.create = async (req, res) => {
  const zone = await EventZone.create(req.body);
  res.status(201).json({ success: true, zone });
};
exports.update = async (req, res) => {
  const updated = await EventZone.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'Zone not found' });
  res.json({ success: true, message: 'Zone updated' });
};
exports.delete = async (req, res) => {
  const deleted = await EventZone.delete(req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'Zone not found' });
  res.json({ success: true, message: 'Zone deleted' });
};
