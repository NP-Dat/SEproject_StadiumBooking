const pool = require('../config/db');

class TicketTypeModel {
  static async findByEventId(eventId) {
    const [eventZones] = await pool.query(
      `SELECT ez.* 
       FROM eventZone ez
       JOIN EventSchedules es ON ez.eventScheduleID = es.id
       WHERE es.eventID = ?`,
      [eventId]
    );
    return eventZones;
  }

  static async findById(id) {
    const [eventZones] = await pool.query(
      'SELECT * FROM eventZone WHERE id = ?',
      [id]
    );
    return eventZones[0];
  }

  static async create(eventZoneData) {
    const { name, size, eventScheduleID, price, status } = eventZoneData;
    
    const [result] = await pool.query(
      `INSERT INTO eventZone (name, size, eventScheduleID, price, status)
       VALUES (?, ?, ?, ?, ?)`,
      [name, size, eventScheduleID, price, status]
    );
    return result.insertId;
  }

  static async update(id, eventZoneData) {
    const { name, size, price, status } = eventZoneData;
    
    const [result] = await pool.query(
      `UPDATE eventZone 
       SET name = ?, size = ?, price = ?, status = ?
       WHERE id = ?`,
      [name, size, price, status, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM eventZone WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  static async updateAvailability(id, size) {
    const [result] = await pool.query(
      `UPDATE eventZone 
       SET size = ?
       WHERE id = ?`,
      [size, id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = TicketTypeModel;