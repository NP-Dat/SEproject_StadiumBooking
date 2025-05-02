import axios from 'axios';
import { TicketType } from '../types/ticketType';

export const TicketTypeService = {
  getTicketTypesByScheduleId: async (scheduleId: number): Promise<TicketType[]> => {
    const res = await axios.get(`http://localhost:8005/api/schedules/${scheduleId}/ticket-types`);
    return res.data;
  },
};
