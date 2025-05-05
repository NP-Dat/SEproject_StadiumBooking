const pool = require('../config/db');

// Helper function to check for overlapping seat ranges
async function checkOverlap(eventScheduleID, newStartSeatID, newEndSeatID, excludeZoneId = null) {
    let query = 'SELECT id, name, startSeatID, endSeatID FROM eventZone WHERE eventScheduleID = ?';
    const params = [eventScheduleID];

    if (excludeZoneId !== null) {
        query += ' AND id != ?';
        params.push(excludeZoneId);
    }

    const [existingZones] = await pool.query(query, params);

    for (const zone of existingZones) {
        const existingStart = zone.startSeatID;
        const existingEnd = zone.endSeatID;

        // Check for overlap: (StartA <= EndB) and (EndA >= StartB)
        if (newStartSeatID <= existingEnd && newEndSeatID >= existingStart) {
            throw new Error(`Seat range [${newStartSeatID}-${newEndSeatID}] overlaps with existing zone '${zone.name}' (ID: ${zone.id}) range [${existingStart}-${existingEnd}].`);
        }
    }
}

// Helper function to get stadium capacity and current zones total size
async function getCapacityAndCurrentSize(eventScheduleID, excludeZoneId = null) {
    // 1. Get stadiumID from eventScheduleID
    const [schedule] = await pool.query(
        'SELECT stadiumID FROM EventSchedules WHERE id = ?',
        [eventScheduleID]
    );
    if (!schedule || schedule.length === 0) {
        throw new Error(`Event schedule with ID ${eventScheduleID} not found.`);
    }
    const stadiumID = schedule[0].stadiumID;

    // 2. Get stadium capacity
    const [stadium] = await pool.query(
        'SELECT size FROM Stadiums WHERE id = ?',
        [stadiumID]
    );
    if (!stadium || stadium.length === 0) {
        throw new Error(`Stadium with ID ${stadiumID} not found.`);
    }
    // Ensure stadiumCapacity is a number
    const stadiumCapacity = Number(stadium[0].size);

    // 3. Calculate current total size of existing zones for this schedule
    let query = 'SELECT SUM(size) as currentTotalSize FROM eventZone WHERE eventScheduleID = ?';
    const params = [eventScheduleID];
    if (excludeZoneId !== null) {
        query += ' AND id != ?';
        params.push(excludeZoneId);
    }
    const [result] = await pool.query(query, params);
    // Ensure currentTotalSize is a number
    const currentTotalSize = Number(result[0].currentTotalSize || 0); // Default to 0 if no zones exist

    return { stadiumCapacity, currentTotalSize };
}

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
    const { name, startSeatID, endSeatID, eventScheduleID, price, status } = eventZoneData;
    const calculatedSize = endSeatID - startSeatID + 1;

    if (calculatedSize <= 0) {
        throw new Error('endSeatID must be greater than or equal to startSeatID.');
    }

    // --- Validation Logic --- 
    // 1. Check Capacity
    const { stadiumCapacity, currentTotalSize } = await getCapacityAndCurrentSize(eventScheduleID);
    const numCurrentTotalSize = Number(currentTotalSize);
    const numCalculatedSize = Number(calculatedSize);
    const numStadiumCapacity = Number(stadiumCapacity);
    if (numCurrentTotalSize + numCalculatedSize > numStadiumCapacity) {
        throw new Error(`Cannot create zone. Adding ${numCalculatedSize} seats would exceed stadium capacity of ${numStadiumCapacity}. Current total zone size: ${numCurrentTotalSize}.`);
    }

    // 2. Check Overlap
    await checkOverlap(eventScheduleID, startSeatID, endSeatID);
    // --- End Validation --- 

    const [result] = await pool.query(
      'INSERT INTO eventZone (name, startSeatID, endSeatID, size, eventScheduleID, price, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, startSeatID, endSeatID, calculatedSize, eventScheduleID, price, status]
    );
    return result.insertId;
  }

  static async update(id, eventZoneData) {
    const { name, startSeatID, endSeatID, price, status } = eventZoneData;
    const calculatedSize = endSeatID - startSeatID + 1;

     if (calculatedSize <= 0) {
        throw new Error('endSeatID must be greater than or equal to startSeatID.');
    }

    // --- Validation Logic --- 
    // First, get the eventScheduleID for the zone being updated
    const zoneToUpdate = await this.findById(id);
    if (!zoneToUpdate) {
        throw new Error(`Event zone with ID ${id} not found.`);
    }
    const eventScheduleID = zoneToUpdate.eventScheduleID;

    // 1. Check Capacity
    const { stadiumCapacity, currentTotalSize } = await getCapacityAndCurrentSize(eventScheduleID, id);
    const numCurrentTotalSize = Number(currentTotalSize);
    const numCalculatedSize = Number(calculatedSize);
    const numStadiumCapacity = Number(stadiumCapacity);
    if (numCurrentTotalSize + numCalculatedSize > numStadiumCapacity) {
        throw new Error(`Cannot update zone. New size ${numCalculatedSize} would make total zone size (${numCurrentTotalSize + numCalculatedSize}) exceed stadium capacity of ${numStadiumCapacity}.`);
    }

    // 2. Check Overlap (excluding the current zone being updated)
    await checkOverlap(eventScheduleID, startSeatID, endSeatID, id);
    // --- End Validation --- 

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