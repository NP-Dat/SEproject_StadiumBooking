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
    const [result] = await pool.query(
      'INSERT INTO EventSchedules (stadiumID, eventID, date, timeStart, timeEnd) VALUES (?, ?, ?, ?, ?)',
      [stadiumID, eventID, date, timeStart, timeEnd]
    );
    return { id: result.insertId, stadiumID, eventID, date, timeStart, timeEnd };
  }

  static async update(id, schedule) {
    const { stadiumID, eventID, date, timeStart, timeEnd } = schedule;
    await pool.query(
      'UPDATE EventSchedules SET stadiumID = ?, eventID = ?, date = ?, timeStart = ?, timeEnd = ? WHERE id = ?',
      [stadiumID, eventID, date, timeStart, timeEnd, id]
    );
    return { id, stadiumID, eventID, date, timeStart, timeEnd };
  }

  static async delete(id) {
    await pool.query('DELETE FROM EventSchedules WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = EventSchedule;
