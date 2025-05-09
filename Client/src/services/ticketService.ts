import api from '../utils/api'
import type {
    TicketResponse,
    TicketZoneResponse,
    TicketScheduleResponse,
    TicketEventResponse,
    TicketCartResponse,
    CreateTicketInput,
    UpdateTicketInput,
    CreateTicketZoneInput,
    UpdateTicketZoneInput,
    TicketQueryParams,
    TicketZoneQueryParams,
    TicketFilter,
    AddToCartInput,
    UpdateCartInput,
    TicketPaymentInput,
    TicketPaymentResponse
} from '../types/ticket'

export const ticketAPI = {
    // Ticket endpoints
    getTickets: async (params?: TicketQueryParams): Promise<TicketResponse> => {
        const response = await api.get<TicketResponse>('/tickets', { params })
        return response.data
    },

    getTicket: async (id: number): Promise<TicketResponse> => {
        const response = await api.get<TicketResponse>(`/tickets/${id}`)
        return response.data
    },

    createTicket: async (input: CreateTicketInput): Promise<TicketResponse> => {
        const response = await api.post<TicketResponse>('/tickets', input)
        return response.data
    },

    updateTicket: async (input: UpdateTicketInput): Promise<TicketResponse> => {
        const response = await api.put<TicketResponse>(`/tickets/${input.id}`, input)
        return response.data
    },

    deleteTicket: async (id: number): Promise<TicketResponse> => {
        const response = await api.delete<TicketResponse>(`/tickets/${id}`)
        return response.data
    },

    // Ticket Zone endpoints
    getTicketZones: async (params?: TicketZoneQueryParams): Promise<TicketZoneResponse> => {
        const response = await api.get<TicketZoneResponse>('/ticket-zones', { params })
        return response.data
    },

    getTicketZone: async (id: number): Promise<TicketZoneResponse> => {
        const response = await api.get<TicketZoneResponse>(`/ticket-zones/${id}`)
        return response.data
    },

    createTicketZone: async (input: CreateTicketZoneInput): Promise<TicketZoneResponse> => {
        const response = await api.post<TicketZoneResponse>('/ticket-zones', input)
        return response.data
    },

    updateTicketZone: async (input: UpdateTicketZoneInput): Promise<TicketZoneResponse> => {
        const response = await api.put<TicketZoneResponse>(`/ticket-zones/${input.id}`, input)
        return response.data
    },

    deleteTicketZone: async (id: number): Promise<TicketZoneResponse> => {
        const response = await api.delete<TicketZoneResponse>(`/ticket-zones/${id}`)
        return response.data
    },

    // Ticket Schedule endpoints
    getTicketSchedules: async (params?: { eventId?: number }): Promise<TicketScheduleResponse> => {
        const response = await api.get<TicketScheduleResponse>('/ticket-schedules', { params })
        return response.data
    },

    getTicketSchedule: async (id: number): Promise<TicketScheduleResponse> => {
        const response = await api.get<TicketScheduleResponse>(`/ticket-schedules/${id}`)
        return response.data
    },

    // Ticket Event endpoints
    getTicketEvents: async (params?: { date?: string }): Promise<TicketEventResponse> => {
        const response = await api.get<TicketEventResponse>('/ticket-events', { params })
        return response.data
    },

    getTicketEvent: async (id: number): Promise<TicketEventResponse> => {
        const response = await api.get<TicketEventResponse>(`/ticket-events/${id}`)
        return response.data
    },

    // Ticket Cart endpoints
    getTicketCarts: async (params?: { userId?: number }): Promise<TicketCartResponse> => {
        const response = await api.get<TicketCartResponse>('/ticket-carts', { params })
        return response.data
    },

    getTicketCart: async (id: number): Promise<TicketCartResponse> => {
        const response = await api.get<TicketCartResponse>(`/ticket-carts/${id}`)
        return response.data
    },

    // Cart management
    addToCart: async (input: AddToCartInput): Promise<TicketCartResponse> => {
        const response = await api.post<TicketCartResponse>('/ticket-carts/add', input)
        return response.data
    },

    updateCartItem: async (input: UpdateCartInput): Promise<TicketCartResponse> => {
        const response = await api.put<TicketCartResponse>(`/ticket-carts/${input.cartId}/items`, input)
        return response.data
    },

    removeFromCart: async (cartId: number, ticketId: number): Promise<TicketCartResponse> => {
        const response = await api.delete<TicketCartResponse>(`/ticket-carts/${cartId}/items/${ticketId}`)
        return response.data
    },

    // Payment processing
    processPayment: async (input: TicketPaymentInput): Promise<TicketPaymentResponse> => {
        const response = await api.post<TicketPaymentResponse>('/ticket-payments', input)
        return response.data
    },

    // Search and filter
    searchTickets: async (filter: TicketFilter): Promise<TicketResponse> => {
        const response = await api.post<TicketResponse>('/tickets/search', filter)
        return response.data
    },

    // Availability check
    checkAvailability: async (zoneId: number, date: string): Promise<{ available: boolean; remaining: number }> => {
        const response = await api.get<{ available: boolean; remaining: number }>(
            `/ticket-zones/${zoneId}/availability`,
            { params: { date } }
        )
        return response.data
    }
} 