const pool = require('../config/db');

class TicketTypeModel {
  static async findByEventId(eventScheduleID) {
    // 1. Get all zones for the event schedule, including size
    const [zones] = await pool.query(
      'SELECT id, name, startSeatID, endSeatID, size, eventScheduleID, price, status FROM eventZone WHERE eventScheduleID = ?',
      [eventScheduleID]
    );

    if (zones.length === 0) {
      return [];
    }

    // 2. Get counts of booked tickets for these zones in this schedule
    const zoneIds = zones.map(z => z.id);
    const placeholders = zoneIds.map(() => '?').join(',');
    const [bookedCounts] = await pool.query(
      `SELECT zoneID, COUNT(*) as bookedCount 
       FROM Tickets 
       WHERE scheduleID = ? AND zoneID IN (${placeholders}) 
       GROUP BY zoneID`,
      [eventScheduleID, ...zoneIds]
    );

    // 3. Create a map for easy lookup of booked counts
    const bookedCountMap = bookedCounts.reduce((map, item) => {
      map[item.zoneID] = item.bookedCount;
      return map;
    }, {});

    // 4. Calculate available seats for each zone (using booked count)
    // Note: We use the booked count against the total size defined by start/end IDs
    // The 'size' column from DB is returned but not strictly needed for this calculation if start/end are reliable
    const zonesWithAvailability = zones.map(zone => {
      // Use start/end for accurate total count, assuming they are the source of truth
      const totalSeats = (zone.endSeatID - zone.startSeatID + 1);
      const booked = bookedCountMap[zone.id] || 0;
      const availableSeats = totalSeats - booked;
      return {
        ...zone, // Includes id, name, startSeatID, endSeatID, size, price, status
        availableSeats: availableSeats >= 0 ? availableSeats : 0
      };
    });

    return zonesWithAvailability;
  }

  static async findById(id) {
    // Select all relevant columns including size
    const [ticketTypes] = await pool.query(
      'SELECT id, name, startSeatID, endSeatID, size, eventScheduleID, price, status FROM eventZone WHERE id = ?',
      [id]
    );
    // Availability is not calculated here by default
    return ticketTypes[0];
  }

  static async create(eventZoneData) {
    // Calculate size from start/end IDs
    const { name, startSeatID, endSeatID, eventScheduleID, price, status } = eventZoneData;
    const calculatedSize = endSeatID - startSeatID + 1;

    if (calculatedSize <= 0) {
        throw new Error('endSeatID must be greater than or equal to startSeatID.');
    }

    const [result] = await pool.query(
      'INSERT INTO eventZone (name, startSeatID, endSeatID, size, eventScheduleID, price, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, startSeatID, endSeatID, calculatedSize, eventScheduleID, price, status]
    );
    return result.insertId;
  }

  static async update(id, eventZoneData) {
    // Recalculate size from start/end IDs
    const { name, startSeatID, endSeatID, price, status } = eventZoneData;
    const calculatedSize = endSeatID - startSeatID + 1;

     if (calculatedSize <= 0) {
        throw new Error('endSeatID must be greater than or equal to startSeatID.');
    }

    const [result] = await pool.query(
      'UPDATE eventZone SET name = ?, startSeatID = ?, endSeatID = ?, size = ?, price = ?, status = ? WHERE id = ?',
      [name, startSeatID, endSeatID, calculatedSize, price, status, id]
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
}

module.exports = TicketTypeModel;