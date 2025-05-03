const pool = require('../config/db');

class TicketModel {
    async getBookedTickets(userId) {
        try {
            const query = `
                SELECT u.fullname, el.name AS eventName, es.date, es.timeStart, s.name AS stadiumName, s.address, st.seat_number
                FROM Tickets t
                JOIN Customers u ON t.userID = u.id
                JOIN EventSchedules es ON t.scheduleID = es.id
                JOIN EventList el ON es.eventID = el.id
                JOIN Stadiums s ON es.stadiumID = s.id
                JOIN Seats st ON t.seatID = st.id

                WHERE t.userID = ?;
            `;
            const [result] = await pool.query(query, [userId]);
            return result;
        } catch (error) {
            console.error('Error getting booked tickets:', error);
            throw error;
        }
    }
}

module.exports = TicketModel;