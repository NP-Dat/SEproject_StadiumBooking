// Authentication-related types

export interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
    role: 'user' | 'admin'
  }
  token: string
  expiresIn: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ResetPasswordData {
  email: string
}

export interface NewPasswordData {
  password: string
  confirmPassword: string
  token: string
}

export interface AuthState {
  user: {
    id: string
    name: string
    email: string
    role: 'user' | 'admin'
  } | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
