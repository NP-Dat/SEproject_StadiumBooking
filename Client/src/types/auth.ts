// Authentication-related types

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
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
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthError {
  message: string
  code: string
}
