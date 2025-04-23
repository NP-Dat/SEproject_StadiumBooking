import axios from 'axios'
import axiosInstance from '../config/axios'
import { useMockImplementation } from '../utils/apiConfig'

// Types
export interface Stadium {
  id: string
  name: string
  location: string
  capacity: number
  imageUrl: string
}

export interface Seat {
  id: string
  section: string
  row: string
  number: string
  price: number
  isAvailable: boolean
  stadiumId: string
}

export interface Booking {
  id: string
  userId: string
  seats: Seat[]
  event: Event
  totalPrice: number
  bookingDate: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

export interface Event {
  id: string
  name: string
  description: string
  stadiumId: string
  date: string
  time: string
  type: string
}

// Mock data
const MOCK_STADIUMS: Stadium[] = [
  {
    id: '1',
    name: 'Central Stadium',
    location: 'New York, NY',
    capacity: 45000,
    imageUrl: 'https://placehold.co/600x400?text=Central+Stadium'
  },
  {
    id: '2',
    name: 'East End Arena',
    location: 'Boston, MA',
    capacity: 35000,
    imageUrl: 'https://placehold.co/600x400?text=East+End+Arena'
  }
]

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    name: 'Championship Final',
    description: 'The final match of the national championship',
    stadiumId: '1',
    date: '2023-12-15',
    time: '19:00',
    type: 'Football'
  },
  {
    id: '2',
    name: 'Rock Concert',
    description: 'Annual rock festival',
    stadiumId: '2',
    date: '2023-11-20',
    time: '20:00',
    type: 'Concert'
  }
]

// Helper functions
const generateMockSeats = (stadiumId: string): Seat[] => {
  const seats: Seat[] = [];
  const sections = ['A', 'B', 'C'];
  const rows = ['1', '2', '3', '4', '5'];
  const seatsPerRow = 10;

  sections.forEach(section => {
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        seats.push({
          id: `${stadiumId}-${section}-${row}-${i}`,
          section,
          row,
          number: i.toString(),
          price: 50 + (sections.indexOf(section) * 25),
          isAvailable: Math.random() > 0.3, // 70% of seats are available
          stadiumId
        });
      }
    });
  });

  return seats;
};

/**
 * Stadium service
 * Provides methods for stadiums, seats, and basic booking operations
 */
const stadiumService = {
  /**
   * Get all stadiums
   * @returns Promise with list of stadiums
   */
  getStadiums: async (): Promise<Stadium[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_STADIUMS), 500);
      });
    } else {
      // Real API implementation
      const response = await axiosInstance.get('/stadiums')
      return response.data
    }
  },

  /**
   * Get stadium by ID
   * @param id Stadium ID
   * @returns Promise with stadium details or null if not found
   */
  getStadiumById: async (id: string): Promise<Stadium | null> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const stadium = MOCK_STADIUMS.find(s => s.id === id) || null;
          resolve(stadium);
        }, 500);
      });
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/stadiums/${id}`)
      return response.data
    }
  },

  /**
   * Get events for a stadium
   * @param stadiumId Optional stadium ID to filter events
   * @returns Promise with list of events
   */
  getEvents: async (stadiumId?: string): Promise<Event[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const events = stadiumId 
            ? MOCK_EVENTS.filter(e => e.stadiumId === stadiumId)
            : MOCK_EVENTS;
          resolve(events);
        }, 500);
      });
    } else {
      // Real API implementation
      const url = stadiumId ? `/stadiums/${stadiumId}/events` : '/events'
      const response = await axiosInstance.get(url)
      return response.data
    }
  },

  /**
   * Get event by ID
   * @param id Event ID
   * @returns Promise with event details or null if not found
   */
  getEventById: async (id: string): Promise<Event | null> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const event = MOCK_EVENTS.find(e => e.id === id) || null;
          resolve(event);
        }, 500);
      });
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/events/${id}`)
      return response.data
    }
  },

  /**
   * Get seats for a stadium/event combination
   * @param stadiumId Stadium ID
   * @param eventId Optional event ID to check seat availability
   * @returns Promise with list of seats
   */
  getSeats: async (stadiumId: string, eventId?: string): Promise<Seat[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(generateMockSeats(stadiumId));
        }, 700);
      });
    } else {
      // Real API implementation
      const url = eventId 
        ? `/stadiums/${stadiumId}/seats?eventId=${eventId}`
        : `/stadiums/${stadiumId}/seats`
      
      const response = await axiosInstance.get(url)
      return response.data
    }
  },

  /**
   * Get available seats for an event
   * @param eventId Event ID
   * @returns Promise with list of available seats
   */
  getAvailableSeats: async (eventId: string): Promise<Seat[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const event = MOCK_EVENTS.find(e => e.id === eventId);
          if (!event) {
            resolve([]);
            return;
          }
          
          const seats = generateMockSeats(event.stadiumId).filter(seat => seat.isAvailable);
          resolve(seats);
        }, 700);
      });
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/events/${eventId}/available-seats`)
      return response.data
    }
  },

  /**
   * Get seat details
   * @param seatId Seat ID
   * @returns Promise with seat details
   */
  getSeatById: async (seatId: string): Promise<Seat | null> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          // Parse the seatId to extract stadiumId
          const stadiumId = seatId.split('-')[0];
          const allSeats = generateMockSeats(stadiumId);
          const seat = allSeats.find(s => s.id === seatId) || null;
          resolve(seat);
        }, 500);
      });
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/seats/${seatId}`)
      return response.data
    }
  },

  /**
   * Book seats for an event
   * @param userId User ID
   * @param eventId Event ID
   * @param seatIds Array of seat IDs to book
   * @returns Promise with booking details
   */
  bookSeats: async (userId: string, eventId: string, seatIds: string[]): Promise<Booking> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const event = MOCK_EVENTS.find(e => e.id === eventId);
          if (!event) {
            reject(new Error('Event not found'));
            return;
          }
          
          const stadium = MOCK_STADIUMS.find(s => s.id === event.stadiumId);
          if (!stadium) {
            reject(new Error('Stadium not found'));
            return;
          }
          
          const allSeats = generateMockSeats(stadium.id);
          const selectedSeats = allSeats.filter(seat => seatIds.includes(seat.id));
          
          if (selectedSeats.length !== seatIds.length) {
            reject(new Error('Some selected seats are not valid'));
            return;
          }
          
          const unavailableSeats = selectedSeats.filter(seat => !seat.isAvailable);
          if (unavailableSeats.length > 0) {
            reject(new Error('Some selected seats are not available'));
            return;
          }
          
          const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
          
          const booking: Booking = {
            id: `booking-${Date.now()}`,
            userId,
            seats: selectedSeats,
            event,
            totalPrice,
            bookingDate: new Date().toISOString(),
            status: 'confirmed'
          };
          
          resolve(booking);
        }, 1000);
      });
    } else {
      // Real API implementation
      const response = await axiosInstance.post('/bookings', { userId, eventId, seatIds })
      return response.data
    }
  },

  /**
   * Check if seats are available for booking
   * @param eventId Event ID
   * @param seatIds Array of seat IDs
   * @returns Promise with availability status for each seat
   */
  checkSeatAvailability: async (eventId: string, seatIds: string[]): Promise<{seatId: string, available: boolean}[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const event = MOCK_EVENTS.find(e => e.id === eventId);
          if (!event) {
            resolve([]);
            return;
          }
          
          const allSeats = generateMockSeats(event.stadiumId);
          const results = seatIds.map(seatId => {
            const seat = allSeats.find(s => s.id === seatId);
            return {
              seatId,
              available: seat ? seat.isAvailable : false
            };
          });
          
          resolve(results);
        }, 800);
      });
    } else {
      // Real API implementation
      const response = await axiosInstance.post(`/events/${eventId}/check-seats`, { seatIds })
      return response.data
    }
  },

  /**
   * Get user bookings
   * @param userId User ID
   * @returns Promise with list of user bookings
   */
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          // Create a mock booking
          const event = MOCK_EVENTS[0];
          const stadium = MOCK_STADIUMS.find(s => s.id === event.stadiumId)!;
          const seats = generateMockSeats(stadium.id).slice(0, 3);
          const totalPrice = seats.reduce((sum, seat) => sum + seat.price, 0);
          
          const booking: Booking = {
            id: `booking-123`,
            userId,
            seats,
            event,
            totalPrice,
            bookingDate: new Date().toISOString(),
            status: 'confirmed'
          };
          
          resolve([booking]);
        }, 800);
      });
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/users/${userId}/bookings`)
      return response.data
    }
  },

  /**
   * Cancel booking
   * @param bookingId Booking ID
   * @returns Promise with cancellation success status
   */
  cancelBooking: async (bookingId: string): Promise<boolean> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 600);
      });
    } else {
      // Real API implementation
      const response = await axiosInstance.put(`/bookings/${bookingId}/cancel`)
      return response.data.success
    }
  }
};

export default stadiumService 