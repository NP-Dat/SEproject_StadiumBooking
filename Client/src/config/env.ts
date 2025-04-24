// API Base URL adjusted to use the correct service port
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:' + (import.meta.env.VITE_API_PORT || '8000') + '/api';

// Define the ports for each service
export const PORT_AUTH = import.meta.env.VITE_PORT_AUTH || '8001';  // Auth Service
export const PORT_USER = import.meta.env.VITE_PORT_USER || '8002';  // User Service
export const PORT_EVENT = import.meta.env.VITE_PORT_EVENT || '8003';  // Event Service
export const PORT_BOOKING = import.meta.env.VITE_PORT_BOOKING || '8004';  // Booking Service
export const PORT_EVENT_OWNER = import.meta.env.VITE_PORT_EVENT_OWNER || '8008';  // Event Owner Service
export const PORT_API_GATEWAY = import.meta.env.VITE_PORT_API_GATEWAY || '8000';  // API Gateway

