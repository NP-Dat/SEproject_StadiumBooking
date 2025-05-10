// Auth endpoints
export const authEndpoints = {
    login: '/auth/login',
    register: '/auth/register',
    verify: (userId: string) => `/auth/verify/${userId}`,
    logout: (userId: string) => `/auth/logout/${userId}`,
    profile: '/auth/profile'
} as const;

// Event endpoints
export const eventEndpoints = {
    getAll: '/events',
    getById: (id: string) => `/events/${id}`,
    create: '/events/create',
    update: '/events/update',
    delete: '/events/delete'
} as const;

// Schedule endpoints
export const scheduleEndpoints = {
    getAll: '/schedules',
    getById: (id: number) => `/schedules/${id}`,
    getByEventId: (eventId: number) => `/schedules/event/${eventId}`,
    create: '/schedules/create',
    update: '/schedules/update',
    delete: '/schedules/delete'
} as const;

// Payment endpoints
export const paymentEndpoints = {
    createWallet: '/payment/createWallet',
    getBalance: '/payment/balance',
    addFunds: '/payment/addFunds',
    transfer: '/payment/transfer',
    getTransactions: '/payment/transactions'
} as const;

// Booking endpoints
export const bookingEndpoints = {
    create: '/booking/create',
    getById: (id: number) => `/booking/${id}`,
    getUserBookings: '/booking/user',
    cancel: (id: number) => `/booking/${id}/cancel`,
    confirm: (id: number) => `/booking/${id}/confirm`
} as const;

// Ticket endpoints
export const ticketEndpoints = {
    getAll: '/tickets',
    getById: (id: number) => `/tickets/${id}`,
    getUserTickets: '/tickets/user',
    create: '/tickets/create',
    update: '/tickets/update',
    delete: '/tickets/delete'
} as const;

// User endpoints
export const userEndpoints = {
    getProfile: '/user/profile',
    updateProfile: '/user/profile',
    deleteProfile: '/user/profile',
    getAllUsers: '/user/all'
} as const;

// Stadium endpoints
export const stadiumEndpoints = {
    getAll: '/stadiums',
    getById: (id: number) => `/stadiums/${id}`,
    create: '/stadiums/create',
    update: '/stadiums/update',
    delete: '/stadiums/delete'
} as const; 