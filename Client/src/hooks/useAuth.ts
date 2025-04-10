import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import { LoginCredentials, RegisterData } from '../types/auth'

interface UseAuthReturn {
  isAuthenticated: boolean
  isLoading: boolean
  user: any | null
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await authService.login(credentials)
      setUser(data)
      setIsAuthenticated(true)
      navigate('/dashboard')
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to login'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true)
    setError(null)
    try {
      await authService.register(data)
      navigate('/login')
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to register'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
    navigate('/')
  }, [navigate])

  return {
    isAuthenticated,
    isLoading,
    user,
    error,
    login,
    register,
    logout
  }
}
