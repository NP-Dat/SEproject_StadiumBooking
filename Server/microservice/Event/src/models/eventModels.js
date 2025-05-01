const pool = require('../config/db');

class Event {
  static async getAllEvent() {
    const [rows] = await pool.query('SELECT * FROM EventList');
    return rows;
  }

  static async getEventById(id) {
    const [rows] = await pool.query('SELECT * FROM EventList WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(event) {
    const { name, date, owner } = event;
    const [result] = await pool.query(
      'INSERT INTO EventList (name, date, owner) VALUES (?, ?, ?)',
      [name, date, owner]
    );
    return { id: result.insertId, name, date, owner };
  }

  static async update(id, event) {
    const { name, date, owner } = event;
    await pool.query(
      'UPDATE EventList SET name = ?, date = ?, owner = ? WHERE id = ?',
      [name, date, owner, id]
    );
    return { id, name, date, owner };
  }

  static async delete(id) {
    await pool.query('DELETE FROM EventList WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = Event;
