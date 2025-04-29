const db = require('../config/db');

class EventSchedule {
  // Public/Customer
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM EventSchedules WHERE id = ?', [id]);
    return rows[0];
  }
  static async listByEvent(eventID) {
    const [rows] = await db.execute('SELECT * FROM EventSchedules WHERE eventID = ?', [eventID]);
    return rows;
  }

  // Organizer
  static async create({ stadiumID, eventID, date, timeStart, timeEnd }) {
    const [result] = await db.execute(
      'INSERT INTO EventSchedules (stadiumID, eventID, date, timeStart, timeEnd) VALUES (?, ?, ?, ?, ?)',
      [stadiumID, eventID, date, timeStart, timeEnd]
    );
    return this.findById(result.insertId);
  }
  static async update(id, { stadiumID, eventID, date, timeStart, timeEnd }) {
    await db.execute(
      'UPDATE EventSchedules SET stadiumID = ?, eventID = ?, date = ?, timeStart = ?, timeEnd = ? WHERE id = ?',
      [stadiumID, eventID, date, timeStart, timeEnd, id]
    );
    return true;
  }
  static async delete(id) {
    await db.execute('DELETE FROM EventSchedules WHERE id = ?', [id]);
    return true;
  }
  static async getOrganizerCalendarView(organizerID, startDate, endDate) {
    const [rows] = await db.execute(
      `SELECT es.*, e.name as eventName, s.name as stadiumName 
       FROM EventSchedules es
       JOIN EventList e ON es.eventID = e.id
       JOIN Stadiums s ON es.stadiumID = s.id
       WHERE e.owner = ? AND es.date BETWEEN ? AND ?
       ORDER BY es.date, es.timeStart`,
      [organizerID, startDate, endDate]
    );
    return rows;
  }
  static async checkSchedulingConflicts(stadiumID, date, timeStart, timeEnd, excludeScheduleID = null) {
    let query = `
      SELECT * FROM EventSchedules 
      WHERE stadiumID = ? AND date = ? AND 
      ((timeStart < ? AND timeEnd > ?) OR (timeStart < ? AND timeEnd > ?) OR (timeStart >= ? AND timeEnd <= ?))`;
    const params = [stadiumID, date, timeEnd, timeStart, timeStart, timeEnd, timeStart, timeEnd];
    if (excludeScheduleID) {
      query += ' AND id != ?';
      params.push(excludeScheduleID);
    }
    const [conflicts] = await db.execute(query, params);
    return conflicts;
  }
  static async getAvailableStadiums(date, timeStart, timeEnd) {
    const [rows] = await db.execute(
      `SELECT s.* FROM Stadiums s
       WHERE s.id NOT IN (
         SELECT DISTINCT stadiumID FROM EventSchedules
         WHERE date = ? AND 
         ((timeStart < ? AND timeEnd > ?) OR (timeStart < ? AND timeEnd > ?) OR (timeStart >= ? AND timeEnd <= ?))
       ) AND s.status = 'active'`,
      [date, timeEnd, timeStart, timeStart, timeEnd, timeStart, timeEnd]
    );
    return rows;
  }

  // Admin
  static async listAll(filters = {}) {
    let query = `
      SELECT es.*, e.name as eventName, e.status as eventStatus, s.name as stadiumName, u.fullName as organizerName
      FROM EventSchedules es
      JOIN EventList e ON es.eventID = e.id
      JOIN Stadiums s ON es.stadiumID = s.id
      JOIN Users u ON e.owner = u.id
      WHERE 1=1`;
    const params = [];
    if (filters.startDate) {
      query += ' AND es.date >= ?';
      params.push(filters.startDate);
    }
    if (filters.endDate) {
      query += ' AND es.date <= ?';
      params.push(filters.endDate);
    }
    if (filters.stadiumID) {
      query += ' AND es.stadiumID = ?';
      params.push(filters.stadiumID);
    }
    if (filters.eventStatus) {
      query += ' AND e.status = ?';
      params.push(filters.eventStatus);
    }
    query += ' ORDER BY es.date, es.timeStart';
    const [rows] = await db.execute(query, params);
    return rows;
  }
  static async getStadiumUtilization(startDate, endDate) {
    const [rows] = await db.execute(
      `SELECT s.id, s.name, COUNT(es.id) as scheduleCount, 
              SUM(TIMESTAMPDIFF(MINUTE, es.timeStart, es.timeEnd)) as totalMinutesUsed
       FROM Stadiums s
       LEFT JOIN EventSchedules es ON s.id = es.stadiumID AND es.date BETWEEN ? AND ?
       GROUP BY s.id
       ORDER BY scheduleCount DESC`,
      [startDate, endDate]
    );
    return rows;
  }
  static async getUpcomingSchedules(limit = 10) {
    const [rows] = await db.execute(
      `SELECT es.*, e.name as eventName, e.status as eventStatus, s.name as stadiumName, u.fullName as organizerName
       FROM EventSchedules es
       JOIN EventList e ON es.eventID = e.id
       JOIN Stadiums s ON es.stadiumID = s.id
       JOIN Users u ON e.owner = u.id
       WHERE es.date >= CURDATE() OR (es.date = CURDATE() AND es.timeStart > CURTIME())
       ORDER BY es.date, es.timeStart
       LIMIT ?`,
      [limit]
    );
    return rows;
  }
}

module.exports = EventSchedule;
