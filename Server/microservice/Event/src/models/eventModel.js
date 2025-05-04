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
    
    // Check if an event with the same name and date already exists
    const [existingEvents] = await pool.query(
      'SELECT * FROM EventList WHERE name = ? AND date = ?',
      [name, date]
    );
    
    if (existingEvents.length > 0) {
      // Event already exists, throw an error
      throw new Error('Event already exists: An event with this name and date is already in the system');
    }
    
    // If no existing event is found, proceed with creation
    const [result] = await pool.query(
      'INSERT INTO EventList (name, date, owner) VALUES (?, ?, ?)',
      [name, date, owner]
    );
    
    return { id: result.insertId, name, date, owner };
  }

  static async update(id, event) {
    const { name, date, owner } = event;
    
    // Check if the event with the given ID exists
    const [existingEvent] = await pool.query('SELECT * FROM EventList WHERE id = ?', [id]);
    
    if (existingEvent.length === 0) {
      throw new Error(`Event with ID ${id} not found`);
    }
    
    // Check if updating would create a duplicate (same name and date as another event)
    const [duplicateCheck] = await pool.query(
      'SELECT * FROM EventList WHERE name = ? AND date = ? AND id != ?',
      [name, date, id]
    );
    
    if (duplicateCheck.length > 0) {
      throw new Error('Update failed: Another event with this name and date already exists');
    }
    
    // Proceed with the update
    await pool.query(
      'UPDATE EventList SET name = ?, date = ?, owner = ? WHERE id = ?',
      [name, date, owner, id]
    );
    
    return { id, name, date, owner };
  }

  static async delete(id) {
    // Check if the event exists before deleting
    const [existingEvent] = await pool.query('SELECT * FROM EventList WHERE id = ?', [id]);
    
    if (existingEvent.length === 0) {
      throw new Error(`Cannot delete: Event with ID ${id} not found`);
    }
    
    // Proceed with deletion
    await pool.query('DELETE FROM EventList WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = Event;
