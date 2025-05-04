import axios from 'axios';
import { TicketType } from '../types/ticketType';

export const TicketTypeService = {
  getTicketTypesByScheduleId: async (scheduleId: number): Promise<TicketType[]> => {
    const res = await axios.get(`http://localhost:8005/api/schedules/${scheduleId}/ticket-types`);
    return res.data;
  },
};

const BASE_URL = 'http://localhost:8007/api/tickets';

export const TicketService = {
  generateTicket: async (userId: number, bookingData: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/generate`, {
        userId,
        eventId: bookingData.eventId,
        zoneName: bookingData.zoneName,
        quantity: bookingData.quantity,
        price: bookingData.price
      });
      return response.data;
    } catch (error) {
      console.error('Error generating ticket:', error);
      throw error;
    }
  },
  
  getUserTickets: async (userId: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user tickets:', error);
      throw error;
    }
  },
  
  getTicketById: async (ticketId: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket details:', error);
      throw error;
    }
  }
};

export default TicketService;
