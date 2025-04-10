// User-related types

export interface User {
  id: string
  name: string
  email: string
  profilePicture?: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  phone?: string
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  preferences?: {
    notifications: boolean
    newsletter: boolean
    theme: 'light' | 'dark' | 'system'
  }
}
