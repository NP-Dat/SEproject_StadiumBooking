const pool = require('../config/db');

class EventSchedule {
  static async getAllSchedules() {
    const [rows] = await pool.query(`
      SELECT es.*, s.name as stadiumName, e.name as eventName 
      FROM EventSchedules es
      JOIN Stadiums s ON es.stadiumID = s.id
      JOIN EventList e ON es.eventID = e.id
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT es.*, s.name as stadiumName, e.name as eventName 
      FROM EventSchedules es
      JOIN Stadiums s ON es.stadiumID = s.id
      JOIN EventList e ON es.eventID = e.id
      WHERE es.id = ?
    `, [id]);
    return rows[0];
  }

  static async getScheduleByEventId(eventId) {
    const [rows] = await pool.query(`
      SELECT es.*, s.name as stadiumName, e.name as eventName 
      FROM EventSchedules es
      JOIN Stadiums s ON es.stadiumID = s.id
      JOIN EventList e ON es.eventID = e.id
      WHERE es.eventID = ?
    `, [eventId]);
    return rows;
  }

  static async create(schedule) {
    const { stadiumID, eventID, date, timeStart, timeEnd } = schedule;
    
    // Check for conflicting schedules (same stadium, same date, overlapping time)
    const [existingSchedules] = await pool.query(
      `SELECT * FROM EventSchedules 
       WHERE stadiumID = ? AND date = ? AND 
       ((timeStart <= ? AND timeEnd > ?) OR (timeStart < ? AND timeEnd >= ?) OR (timeStart >= ? AND timeEnd <= ?))`,
      [stadiumID, date, timeStart, timeStart, timeEnd, timeEnd, timeStart, timeEnd]
    );
    
    if (existingSchedules.length > 0) {
      throw new Error('Schedule conflict: This stadium is already booked during the specified time');
    }
    
    const [result] = await pool.query(
      'INSERT INTO EventSchedules (stadiumID, eventID, date, timeStart, timeEnd) VALUES (?, ?, ?, ?, ?)',
      [stadiumID, eventID, date, timeStart, timeEnd]
    );
    
    return { id: result.insertId, stadiumID, eventID, date, timeStart, timeEnd };
  }

  static async update(id, schedule) {
    const { stadiumID, eventID, date, timeStart, timeEnd } = schedule;
    
    // Check if the schedule exists
    const [existingSchedule] = await pool.query('SELECT * FROM EventSchedules WHERE id = ?', [id]);
    
    if (existingSchedule.length === 0) {
      throw new Error(`Schedule with ID ${id} not found`);
    }
    
    // Check for conflicting schedules (excluding the current one)
    const [conflictingSchedules] = await pool.query(
      `SELECT * FROM EventSchedules 
       WHERE stadiumID = ? AND date = ? AND id != ? AND
       ((timeStart <= ? AND timeEnd > ?) OR (timeStart < ? AND timeEnd >= ?) OR (timeStart >= ? AND timeEnd <= ?))`,
      [stadiumID, date, id, timeStart, timeStart, timeEnd, timeEnd, timeStart, timeEnd]
    );
    
    if (conflictingSchedules.length > 0) {
      throw new Error('Update failed: This would create a schedule conflict with an existing booking');
    }
    
    await pool.query(
      'UPDATE EventSchedules SET stadiumID = ?, eventID = ?, date = ?, timeStart = ?, timeEnd = ? WHERE id = ?',
      [stadiumID, eventID, date, timeStart, timeEnd, id]
    );
    
    return { id, stadiumID, eventID, date, timeStart, timeEnd };
  }

  static async delete(id) {
    // Check if the schedule exists
    const [existingSchedule] = await pool.query('SELECT * FROM EventSchedules WHERE id = ?', [id]);
    
    if (existingSchedule.length === 0) {
      throw new Error(`Cannot delete: Schedule with ID ${id} not found`);
    }
    
    await pool.query('DELETE FROM EventSchedules WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = EventSchedule;
