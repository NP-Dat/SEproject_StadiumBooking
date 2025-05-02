import { Schedule } from '../types/schedule';

const BASE_URL = 'http://localhost:8003/api';

export class ScheduleService {
  static async getSchedulesByEventId(eventId: string): Promise<Schedule[]> {
    const response = await fetch(`${BASE_URL}/schedules/event/${eventId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch schedules');
    }
    const json = await response.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
    throw new Error('Unexpected schedule response format');
  }
}
