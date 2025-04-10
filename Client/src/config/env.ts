// Environment variables
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
export const NODE_ENV = import.meta.env.NODE_ENV || 'development'
export const IS_PROD = NODE_ENV === 'production'
export const IS_DEV = NODE_ENV === 'development'
export const IS_TEST = NODE_ENV === 'test'
export const APP_NAME = 'Stadium Booking'
