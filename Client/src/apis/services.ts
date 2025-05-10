import { apiClients, apiRequest, ApiResponse } from './api';
import { authEndpoints, eventEndpoints, scheduleEndpoints, paymentEndpoints, bookingEndpoints, ticketEndpoints, userEndpoints, stadiumEndpoints } from './endpoints';
import type { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';
import type { Event, EventResponse, EventSchedule, EventScheduleResponse, EventZone, EventZoneResponse } from '../types/event';
import type { Booking } from '../types/booking';
import type { Ticket } from '../types/ticket';
import { api } from './api';
import type { Venue } from '../types/venue';

// Auth API Service
export const authAPI = {
    login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
        // Special admin account handling
        if (credentials.userName === 'admin' && credentials.passWord === 'admin123') {
            const adminUser: User = {
                id: 1,
                userName: 'admin',
                passWord: 'admin123',
                fullName: 'Admin User',
                birth: '2000-01-01',
                phoneNumber: '1234567890',
                address: 'Admin Address',
                email: 'admin@example.com',
                role: 'admin',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            return {
                success: true,
                data: {
                    success: true,
                    user: adminUser
                }
            };
        }

        // Regular login flow
        return apiRequest<AuthResponse>(apiClients.auth, {
            method: 'POST',
            url: authEndpoints.login,
            data: credentials
        });
    },

    register: (credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> =>
        apiRequest<AuthResponse>(apiClients.auth, {
            method: 'POST',
            url: authEndpoints.register,
            data: credentials
        }),

    verify: (userId: string) =>
        apiRequest<{ valid: boolean; user: User; isAdmin: boolean }>(apiClients.auth, {
            method: 'GET',
            url: authEndpoints.verify(userId)
        }),

    logout: (userId: string) =>
        apiRequest(apiClients.auth, {
            method: 'POST',
            url: authEndpoints.logout(userId)
        }),

    getProfile: () =>
        apiRequest<User>(apiClients.auth, {
            method: 'GET',
            url: authEndpoints.profile
        })
};

// Event API Service
export const eventAPI = {
    getAll: () =>
        apiRequest<Event[]>(apiClients.event, {
            method: 'GET',
            url: eventEndpoints.getAll
        }),

    getById: (id: string) =>
        apiRequest<Event>(apiClients.event, {
            method: 'GET',
            url: eventEndpoints.getById(id)
        }),

    create: (event: Omit<Event, 'id'>) =>
        apiRequest<Event>(apiClients.event, {
            method: 'POST',
            url: eventEndpoints.create,
            data: event
        }),

    update: (event: Event) =>
        apiRequest<Event>(apiClients.event, {
            method: 'PUT',
            url: eventEndpoints.update,
            data: event
        }),

    delete: (id: string) =>
        apiRequest(apiClients.event, {
            method: 'DELETE',
            url: eventEndpoints.delete,
            data: { id }
        })
};

// Schedule API Service
export const scheduleAPI = {
    getAll: () =>
        apiRequest<EventSchedule[]>(apiClients.event, {
            method: 'GET',
            url: scheduleEndpoints.getAll
        }),

    getById: (id: number) =>
        apiRequest<EventSchedule>(apiClients.event, {
            method: 'GET',
            url: scheduleEndpoints.getById(id)
        }),

    getByEventId: (eventId: number) =>
        apiRequest<EventSchedule[]>(apiClients.event, {
            method: 'GET',
            url: scheduleEndpoints.getByEventId(eventId)
        }),

    create: (schedule: Omit<EventSchedule, 'id'>) =>
        apiRequest<EventSchedule>(apiClients.event, {
            method: 'POST',
            url: scheduleEndpoints.create,
            data: schedule
        }),

    update: (id: number, schedule: Omit<EventSchedule, 'id'>) =>
        apiRequest<EventSchedule>(apiClients.event, {
            method: 'PUT',
            url: scheduleEndpoints.update,
            data: { ...schedule, id }
        }),

    delete: (id: number) =>
        apiRequest(apiClients.event, {
            method: 'DELETE',
            url: scheduleEndpoints.delete,
            data: { id }
        })
};

// Payment API Service
export const paymentAPI = {
    createWallet: (userId: string, initialBalance: number = 0) =>
        apiRequest(apiClients.payment, {
            method: 'POST',
            url: paymentEndpoints.createWallet,
            data: { userID: parseInt(userId), initialBalance }
        }),

    getBalance: () =>
        apiRequest<{ balance: number }>(apiClients.payment, {
            method: 'GET',
            url: paymentEndpoints.getBalance
        }),

    addFunds: (amount: number) =>
        apiRequest(apiClients.payment, {
            method: 'POST',
            url: paymentEndpoints.addFunds,
            data: { amount }
        }),

    transfer: (toUserId: string, amount: number) =>
        apiRequest(apiClients.payment, {
            method: 'POST',
            url: paymentEndpoints.transfer,
            data: { toUserId, amount }
        }),

    getTransactions: () =>
        apiRequest(apiClients.payment, {
            method: 'GET',
            url: paymentEndpoints.getTransactions
        })
};

// Booking API Service
export const bookingAPI = {
    create: (booking: Omit<Booking, 'id'>) =>
        apiRequest<Booking>(apiClients.booking, {
            method: 'POST',
            url: bookingEndpoints.create,
            data: booking
        }),

    getById: (id: number) =>
        apiRequest<Booking>(apiClients.booking, {
            method: 'GET',
            url: bookingEndpoints.getById(id)
        }),

    getUserBookings: () =>
        apiRequest<Booking[]>(apiClients.booking, {
            method: 'GET',
            url: bookingEndpoints.getUserBookings
        }),

    cancel: (id: number) =>
        apiRequest(apiClients.booking, {
            method: 'POST',
            url: bookingEndpoints.cancel(id)
        }),

    confirm: (id: number) =>
        apiRequest(apiClients.booking, {
            method: 'POST',
            url: bookingEndpoints.confirm(id)
        })
};

// Ticket API Service
export const ticketAPI = {
    getAll: () =>
        apiRequest<Ticket[]>(apiClients.ticket, {
            method: 'GET',
            url: ticketEndpoints.getAll
        }),

    getById: (id: number) =>
        apiRequest<Ticket>(apiClients.ticket, {
            method: 'GET',
            url: ticketEndpoints.getById(id)
        }),

    getUserTickets: () =>
        apiRequest<Ticket[]>(apiClients.ticket, {
            method: 'GET',
            url: ticketEndpoints.getUserTickets
        }),

    create: (ticket: Omit<Ticket, 'id'>) =>
        apiRequest<Ticket>(apiClients.ticket, {
            method: 'POST',
            url: ticketEndpoints.create,
            data: ticket
        }),

    update: (ticket: Ticket) =>
        apiRequest<Ticket>(apiClients.ticket, {
            method: 'PUT',
            url: ticketEndpoints.update,
            data: ticket
        }),

    delete: (id: number) =>
        apiRequest(apiClients.ticket, {
            method: 'DELETE',
            url: ticketEndpoints.delete,
            data: { id }
        })
};

// User API Service
export const userAPI = {
    getProfile: () =>
        apiRequest<User>(apiClients.user, {
            method: 'GET',
            url: userEndpoints.getProfile
        }),

    updateProfile: (user: User) =>
        apiRequest<User>(apiClients.user, {
            method: 'PUT',
            url: userEndpoints.updateProfile,
            data: user
        }),

    deleteProfile: () =>
        apiRequest(apiClients.user, {
            method: 'DELETE',
            url: userEndpoints.deleteProfile
        }),

    getAllUsers: () =>
        apiRequest<User[]>(apiClients.user, {
            method: 'GET',
            url: userEndpoints.getAllUsers
        })
};

// Stadium API Service
export const stadiumAPI = {
    getAll: () =>
        apiRequest(apiClients.stadium, {
            method: 'GET',
            url: stadiumEndpoints.getAll
        }),

    getById: (id: number) =>
        apiRequest(apiClients.stadium, {
            method: 'GET',
            url: stadiumEndpoints.getById(id)
        }),

    create: (stadium: any) =>
        apiRequest(apiClients.stadium, {
            method: 'POST',
            url: stadiumEndpoints.create,
            data: stadium
        }),

    update: (stadium: any) =>
        apiRequest(apiClients.stadium, {
            method: 'PUT',
            url: stadiumEndpoints.update,
            data: stadium
        }),

    delete: (id: number) =>
        apiRequest(apiClients.stadium, {
            method: 'DELETE',
            url: stadiumEndpoints.delete,
            data: { id }
        })
};

// Venue API Service
export const venueAPI = {
    getAll: () =>
        apiRequest<Venue[]>(apiClients.event, {
            method: 'GET',
            url: '/venues'
        }),

    getById: (id: string) =>
        apiRequest<Venue>(apiClients.event, {
            method: 'GET',
            url: `/venues/${id}`
        }),

    create: (venue: Omit<Venue, 'id' | 'createdAt' | 'updatedAt'>) =>
        apiRequest<Venue>(apiClients.event, {
            method: 'POST',
            url: '/venues',
            data: venue
        }),

    update: (venue: Venue) =>
        apiRequest<Venue>(apiClients.event, {
            method: 'PUT',
            url: `/venues/${venue.id}`,
            data: venue
        }),

    delete: (id: string) =>
        apiRequest(apiClients.event, {
            method: 'DELETE',
            url: `/venues/${id}`
        })
};

export const eventService = {
    getAllEvents: async (): Promise<EventResponse> => {
        try {
            const response = await api.get('/events')
            return { success: true, data: response.data }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch events' }
        }
    },
    getEventById: async (id: number): Promise<EventResponse> => {
        try {
            const response = await api.get(`/events/${id}`)
            return { success: true, data: response.data }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch event' }
        }
    },
    getEventSchedules: async (eventId: number): Promise<EventScheduleResponse> => {
        try {
            const response = await api.get(`/events/${eventId}/schedules`)
            return { success: true, data: response.data }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch schedules' }
        }
    },
    getEventZones: async (scheduleId: number): Promise<EventZoneResponse> => {
        try {
            const response = await api.get(`/schedules/${scheduleId}/zones`)
            return { success: true, data: response.data }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch zones' }
        }
    },
    getEventsByStadiumId: async (stadiumId: number): Promise<EventResponse> => {
        try {
            const response = await api.get(`/stadiums/${stadiumId}/events`)
            return { success: true, data: response.data }
        } catch (error) {
            return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch stadium events' }
        }
    }
} 