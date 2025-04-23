const pool = require('../config/db');

class EventModel {
  static async create(eventData, userId) {
    const { title, description, venue, event_date, category, total_tickets, price } = eventData;
    
    const [result] = await pool.query(
      `INSERT INTO events (title, description, venue, event_date, category, 
        total_tickets, available_tickets, price, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, venue, event_date, category, 
       total_tickets, total_tickets, price, userId]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [events] = await pool.query(
      'SELECT * FROM events WHERE id = ?',
      [id]
    );
    return events[0];
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM events WHERE 1=1';
    const params = [];

    if (filters.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }

    if (filters.date) {
      query += ' AND DATE(event_date) = ?';
      params.push(filters.date);
    }

    query += ' ORDER BY event_date ASC';

    const [events] = await pool.query(query, params);
    return events;
  }

  static async update(id, eventData) {
    const { title, description, venue, event_date, category, price } = eventData;
    
    const [result] = await pool.query(
      `UPDATE events 
       SET title = ?, description = ?, venue = ?, 
           event_date = ?, category = ?, price = ?
       WHERE id = ?`,
      [title, description, venue, event_date, category, price, id]
    );
    return result.affectedRows > 0;
  }

  static async updateAvailableTickets(id, quantity) {
    const [result] = await pool.query(
      `UPDATE events 
       SET available_tickets = available_tickets + ?
       WHERE id = ?`,
      [quantity, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM events WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = EventModel;