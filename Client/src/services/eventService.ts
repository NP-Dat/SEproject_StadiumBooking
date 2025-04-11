import axiosInstance from '../config/axios'
import { useMockImplementation } from '../utils/apiConfig'
import { Event } from './stadiumService'

// Types
export interface EventFilter {
  stadiumId?: string
  date?: string
  type?: string
  search?: string
}

// Mock events data
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
  },
  {
    id: '3',
    name: 'Basketball Tournament',
    description: 'Regional basketball championship',
    stadiumId: '1',
    date: '2023-12-22',
    time: '18:30',
    type: 'Basketball'
  },
  {
    id: '4',
    name: 'Classical Music Symphony',
    description: 'A night of classical masterpieces',
    stadiumId: '2',
    date: '2024-01-15',
    time: '19:30',
    type: 'Concert'
  },
  {
    id: '5',
    name: 'World Cup Qualifier',
    description: 'International football match',
    stadiumId: '1',
    date: '2024-02-10',
    time: '20:00',
    type: 'Football'
  }
]

/**
 * Event service
 * Provides methods for event management and filtering
 */
const eventService = {
  /**
   * Get all events with optional filtering
   * @param filter Optional event filter parameters
   * @returns Promise with list of events
   */
  getEvents: async (filter?: EventFilter): Promise<Event[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          let filteredEvents = [...MOCK_EVENTS]
          
          if (filter) {
            if (filter.stadiumId) {
              filteredEvents = filteredEvents.filter(e => e.stadiumId === filter.stadiumId)
            }
            
            if (filter.date) {
              filteredEvents = filteredEvents.filter(e => e.date === filter.date)
            }
            
            if (filter.type) {
              filteredEvents = filteredEvents.filter(e => e.type === filter.type)
            }
            
            if (filter.search) {
              const searchLower = filter.search.toLowerCase()
              filteredEvents = filteredEvents.filter(e => 
                e.name.toLowerCase().includes(searchLower) || 
                e.description.toLowerCase().includes(searchLower)
              )
            }
          }
          
          resolve(filteredEvents)
        }, 600)
      })
    } else {
      // Real API implementation
      // Create query string from filter
      const queryParams = new URLSearchParams()
      if (filter) {
        if (filter.stadiumId) queryParams.append('stadiumId', filter.stadiumId)
        if (filter.date) queryParams.append('date', filter.date)
        if (filter.type) queryParams.append('type', filter.type)
        if (filter.search) queryParams.append('search', filter.search)
      }
      
      const queryStr = queryParams.toString() ? `?${queryParams.toString()}` : ''
      const response = await axiosInstance.get(`/events${queryStr}`)
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
          const event = MOCK_EVENTS.find(e => e.id === id) || null
          resolve(event)
        }, 400)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/events/${id}`)
      return response.data
    }
  },
  
  /**
   * Get upcoming events
   * @param limit Maximum number of events to return
   * @returns Promise with list of upcoming events
   */
  getUpcomingEvents: async (limit: number = 5): Promise<Event[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          // Sort events by date (ascending)
          const sortedEvents = [...MOCK_EVENTS].sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`)
            const dateB = new Date(`${b.date}T${b.time}`)
            return dateA.getTime() - dateB.getTime()
          })
          
          // Get only future events
          const now = new Date()
          const futureEvents = sortedEvents.filter(event => {
            const eventDate = new Date(`${event.date}T${event.time}`)
            return eventDate > now
          })
          
          // Return the specified number of events
          resolve(futureEvents.slice(0, limit))
        }, 500)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/events/upcoming?limit=${limit}`)
      return response.data
    }
  },
  
  /**
   * Get all event types
   * @returns Promise with list of event types
   */
  getEventTypes: async (): Promise<string[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          // Extract unique event types
          const types = [...new Set(MOCK_EVENTS.map(event => event.type))]
          resolve(types)
        }, 300)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.get('/events/types')
      return response.data
    }
  },
  
  /**
   * Search events by query
   * @param query Search query
   * @returns Promise with list of matching events
   */
  searchEvents: async (query: string): Promise<Event[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!query) {
            resolve([])
            return
          }
          
          const searchLower = query.toLowerCase()
          const results = MOCK_EVENTS.filter(event => 
            event.name.toLowerCase().includes(searchLower) || 
            event.description.toLowerCase().includes(searchLower) ||
            event.type.toLowerCase().includes(searchLower)
          )
          
          resolve(results)
        }, 500)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/events/search?query=${encodeURIComponent(query)}`)
      return response.data
    }
  },
  
  /**
   * Get events by date range
   * @param startDate Start date (YYYY-MM-DD)
   * @param endDate End date (YYYY-MM-DD)
   * @returns Promise with list of events in date range
   */
  getEventsByDateRange: async (startDate: string, endDate: string): Promise<Event[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const start = new Date(startDate)
          const end = new Date(endDate)
          
          const events = MOCK_EVENTS.filter(event => {
            const eventDate = new Date(event.date)
            return eventDate >= start && eventDate <= end
          })
          
          resolve(events)
        }, 600)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/events?startDate=${startDate}&endDate=${endDate}`)
      return response.data
    }
  },
  
  /**
   * Get events by venue/stadium
   * @param stadiumId Stadium ID
   * @returns Promise with list of events at the stadium
   */
  getEventsByStadium: async (stadiumId: string): Promise<Event[]> => {
    if (useMockImplementation()) {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const events = MOCK_EVENTS.filter(event => event.stadiumId === stadiumId)
          resolve(events)
        }, 400)
      })
    } else {
      // Real API implementation
      const response = await axiosInstance.get(`/stadiums/${stadiumId}/events`)
      return response.data
    }
  }
}

export default eventService 