import { Event, Schedule } from '../types/admin';

const API_BASE_URL = 'http://localhost:8003/api';

// Event APIs
export const createEvent = async (event: Event): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/events/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error('Failed to create event');
  }
  return response.json();
};

export const updateEvent = async (eventId: number, event: Event): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/events/update?event_id=${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error('Failed to update event');
  }
  return response.json();
};

export const deleteEvent = async (eventId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/events/delete?event_id=${eventId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
};

// Schedule APIs
export const createSchedule = async (schedule: Schedule): Promise<Schedule> => {
  const response = await fetch(`${API_BASE_URL}/schedules/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(schedule),
  });
  if (!response.ok) {
    throw new Error('Failed to create schedule');
  }
  return response.json();
};

export const updateSchedule = async (scheduleId: number, schedule: Schedule): Promise<Schedule> => {
  const response = await fetch(`${API_BASE_URL}/schedules/update?schedule_id=${scheduleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(schedule),
  });
  if (!response.ok) {
    throw new Error('Failed to update schedule');
  }
  return response.json();
};

export const deleteSchedule = async (scheduleId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/schedules/delete?schedule_id=${scheduleId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete schedule');
  }
}; 