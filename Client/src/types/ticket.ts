export interface Ticket {
    id: number
    userId: number
    seatId: number
    scheduleId: number
    zoneId: number
    cartId: number
    createdAt: string
    updatedAt: string
}

export interface TicketZone {
    id: number
    name: string
    startSeatId: number
    endSeatId: number
    size: number
    eventScheduleId: number
    price: number
    status: 'available' | 'sold_out' | 'reserved'
}

export interface TicketSchedule {
    id: number
    stadiumId: number
    eventId: number
    date: string
    timeStart: string
    timeEnd: string
}

export interface TicketEvent {
    id: number
    name: string
    date: string
    owner: string
    description: string
}

export interface TicketCart {
    id: number
    userId: number
    numberOfTicket: number
    totalPrice: number
    status: 'unpaid' | 'paid'
}

export interface TicketResponse {
    success: boolean
    data?: Ticket | Ticket[]
    error?: string
}

export interface TicketZoneResponse {
    success: boolean
    data?: TicketZone | TicketZone[]
    error?: string
}

export interface TicketScheduleResponse {
    success: boolean
    data?: TicketSchedule | TicketSchedule[]
    error?: string
}

export interface TicketEventResponse {
    success: boolean
    data?: TicketEvent | TicketEvent[]
    error?: string
}

export interface TicketCartResponse {
    success: boolean
    data?: TicketCart | TicketCart[]
    error?: string
}

export interface CreateTicketInput {
    seatId: number
    scheduleId: number
    zoneId: number
    cartId: number
}

export interface UpdateTicketInput {
    id: number
    seatId?: number
    scheduleId?: number
    zoneId?: number
    cartId?: number
}

export interface CreateTicketZoneInput {
    name: string
    startSeatId: number
    endSeatId: number
    size: number
    eventScheduleId: number
    price: number
    status: 'available' | 'sold_out' | 'reserved'
}

export interface UpdateTicketZoneInput {
    id: number
    name?: string
    startSeatId?: number
    endSeatId?: number
    size?: number
    eventScheduleId?: number
    price?: number
    status?: 'available' | 'sold_out' | 'reserved'
}

export interface TicketQueryParams {
    userId?: number
    scheduleId?: number
    zoneId?: number
    cartId?: number
    status?: string
    page?: number
    limit?: number
}

export interface TicketZoneQueryParams {
    eventScheduleId?: number
    status?: 'available' | 'sold_out' | 'reserved'
    minPrice?: number
    maxPrice?: number
    page?: number
    limit?: number
}

export interface TicketFilter {
    dateRange?: {
        start: string
        end: string
    }
    priceRange?: {
        min: number
        max: number
    }
    status?: string[]
    zoneIds?: number[]
}

export interface AddToCartInput {
    ticketId: number
    quantity: number
}

export interface UpdateCartInput {
    cartId: number
    ticketId: number
    quantity: number
}

export interface TicketPaymentInput {
    cartId: number
    paymentMethod: 'credit_card' | 'debit_card' | 'wallet'
    paymentDetails: {
        cardNumber?: string
        expiryDate?: string
        cvv?: string
        walletId?: number
    }
}

export interface TicketPaymentResponse {
    success: boolean
    data?: {
        paymentId: number
        amount: number
        status: 'success' | 'failed' | 'pending'
        transactionId: string
    }
    error?: string
} 