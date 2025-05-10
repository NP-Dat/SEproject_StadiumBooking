import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add request interceptor for authentication
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

// API Base URLs
export const API_BASE_URLS = {
    AUTH: 'http://localhost:8001/api',
    EVENT: 'http://localhost:8003/api',
    PAYMENT: 'http://localhost:8006/api',
    BOOKING: 'http://localhost:8004/api',
    TICKET: 'http://localhost:8005/api',
    USER: 'http://localhost:8002/api',
    STADIUM: 'http://localhost:8007/api'
} as const;

// Common response type for all API responses
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

// Create API clients for each service
export const apiClients = {
    auth: api,
    event: api,
    payment: api,
    booking: api,
    ticket: api,
    user: api,
    stadium: api
};

// Generic API request function
export const apiRequest = async <T>(
    client: typeof api,
    config: any
): Promise<ApiResponse<T>> => {
    try {
        const response: any = await client(config);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null as T,
                error: error.response?.data?.message || error.message
            };
        }
        throw error;
    }
};