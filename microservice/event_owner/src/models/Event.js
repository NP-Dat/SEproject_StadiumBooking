const pool = require('../config/db');

class EventModel {
  static async createEvent(name, date, owner, stadiumID, timeStart, timeEnd) {
    const [event] = await pool.query('INSERT INTO EventList (name, date, owner) VALUES (?, ?, ?)', [name, date, owner]);
    const [eventID] = await pool.query('SELECT id FROM EventList WHERE name = ? AND date = ? AND owner = ?', [name, date, owner]);
    const [schedule] = await pool.query('INSERT INTO EventSchedules (stadiumID, eventID, date, timeStart, timeEnd) VALUES (?, ?, ?, ?, ?)', [stadiumID, eventID[0].id, date, timeStart, timeEnd]);
    return event, schedule;
  }
}

module.exports = EventModel;