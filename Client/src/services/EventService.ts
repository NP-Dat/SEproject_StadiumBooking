import { Event, EventResponse } from '../types/event';

const API_URL = 'http://localhost:8003/api/events';

export class EventService {
    static async getEvents(): Promise<Event[]> {
        try {
            const response = await fetch(`${API_URL}/`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
            }
            
            const responseData: EventResponse = await response.json();
            if (responseData.success && Array.isArray(responseData.data)) {
                return responseData.data;
            }
            throw new Error('Invalid response format from server');
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }

    static async getEventById(eventId: string): Promise<Event> {
        try {
            const response = await fetch(`${API_URL}/${eventId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch event details: ${response.status} ${response.statusText}`);
            }
            
            const responseData: EventResponse = await response.json();
            if (responseData.success && responseData.data) {
                return responseData.data as Event;
            }
            throw new Error('Invalid response format from server');
        } catch (error) {
            console.error('Error fetching event details:', error);
            throw error;
        }
    }

    static formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
} 