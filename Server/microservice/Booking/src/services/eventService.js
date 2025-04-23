
class EventService {
  static async checkEventAvailability(eventId, quantity) {
    try {
      const response = await axios.get(
        `${process.env.EVENT_SERVICE_URL}/api/events/${eventId}`
      );
      
      const event = response.data;
      if (!event || event.available_tickets < quantity) {
        throw new Error('Not enough tickets available');
      }
      
      return event;
    } catch (error) {
      throw new Error('Failed to check event availability');
    }
  }

  static async reserveTickets(eventId, userId, quantity) {
    try {
      const response = await axios.post(
        `${process.env.EVENT_SERVICE_URL}/api/tickets/purchase`,
        { eventId, quantity },
        { headers: { userId } }
      );
      
      return response.data.tickets;
    } catch (error) {
      throw new Error('Failed to reserve tickets');
    }
  }
}

module.exports = EventService;