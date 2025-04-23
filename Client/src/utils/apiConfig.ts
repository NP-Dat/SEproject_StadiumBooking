/**
 * API configuration utility to easily switch between mock and real API implementations
 */

// Set to true to use mock APIs, false to use real APIs
export const USE_MOCK_API = true

// Function to determine whether to use mock or real implementation
export const useMockImplementation = () => {
  // Use environment variable if available, otherwise fallback to constant
  return process.env.REACT_APP_USE_MOCK_API === 'true' || USE_MOCK_API
}

/**
 * Helper to conditionally return mock or real implementation
 * @param mockImpl The mock implementation function
 * @param realImpl The real API implementation function
 * @returns Either mock or real implementation based on configuration
 */
export function apiImplementation<T, R>(
  mockImpl: (args: T) => Promise<R>,
  realImpl: (args: T) => Promise<R>
): (args: T) => Promise<R> {
  return useMockImplementation() ? mockImpl : realImpl
}

/**
 * Helper for APIs that don't take arguments
 * @param mockImpl The mock implementation function
 * @param realImpl The real API implementation function
 * @returns Either mock or real implementation based on configuration
 */
export function apiImplementationNoArgs<R>(
  mockImpl: () => Promise<R>,
  realImpl: () => Promise<R>
): () => Promise<R> {
  return useMockImplementation() ? mockImpl : realImpl
}

/**
 * Storage key for mock data
 * Use this to store mock data in localStorage for persistence between page reloads
 */
export const MOCK_DATA_STORAGE_KEY = 'stadium_booking_mock_data'

/**
 * Save mock data to localStorage
 * @param data The data to save
 */
export const saveMockData = (data: any) => {
  localStorage.setItem(MOCK_DATA_STORAGE_KEY, JSON.stringify(data))
}

/**
 * Load mock data from localStorage
 * @returns The stored mock data or null if none exists
 */
export const loadMockData = (): any => {
  const data = localStorage.getItem(MOCK_DATA_STORAGE_KEY)
  return data ? JSON.parse(data) : null
}

/**
 * Clear mock data from localStorage
 */
export const clearMockData = () => {
  localStorage.removeItem(MOCK_DATA_STORAGE_KEY)
} 