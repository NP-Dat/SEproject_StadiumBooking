export interface Stadium {
  id: number
  name: string
  address: string
  size: number
  status: 'active' | 'maintenance' | 'closed'
  description?: string
  imageUrl?: string
  facilities?: string[]
  createdAt: string
  updatedAt: string
} 