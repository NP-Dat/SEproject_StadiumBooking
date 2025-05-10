export type VenueStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE'

export interface Venue {
    id: string
    name: string
    location: string
    capacity: number
    status: VenueStatus
    description?: string
    imageUrl?: string
    createdAt: string
    updatedAt: string
} 