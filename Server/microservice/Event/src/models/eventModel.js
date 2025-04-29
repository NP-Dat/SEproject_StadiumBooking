const db = require('../config/db');

class Event {
  // Public/Customer
  static async listApproved() {
    const [rows] = await db.execute('SELECT * FROM EventList WHERE status = \'approved\'');
    return rows;
  }
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM EventList WHERE id = ?', [id]);
    return rows[0];
  }

  // Organizer
  static async listByOwner(ownerId) {
    const [rows] = await db.execute('SELECT * FROM EventList WHERE owner = ?', [ownerId]);
    return rows;
  }
  static async create({ name, date, owner }) {
    const [result] = await db.execute(
      'INSERT INTO EventList (name, date, owner) VALUES (?, ?, ?)', [name, date, owner]
    );
    return this.findById(result.insertId);
  }
  static async update(id, { name, date }) {
    // Only allow update if event is still pending
    const event = await this.findById(id);
    if (!event || event.status !== 'pending') return false;
    await db.execute('UPDATE EventList SET name = ?, date = ? WHERE id = ?', [name, date, id]);
    return true;
  }
  static async delete(id) {
    // Only allow delete if event is still pending
    const event = await this.findById(id);
    if (!event || event.status !== 'pending') return false;
    await db.execute('DELETE FROM EventList WHERE id = ?', [id]);
    return true;
  }

  // Admin
  static async listAll() {
    const [rows] = await db.execute('SELECT * FROM EventList');
    return rows;
  }
  static async setStatus(id, status) {
    await db.execute('UPDATE EventList SET status = ? WHERE id = ?', [status, id]);
  }
}

module.exports = Event;
