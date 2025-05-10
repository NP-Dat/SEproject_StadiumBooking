import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../apis/services'
import type { User, LoginCredentials, RegisterCredentials, AuthState } from '../types/auth'
import type { ApiResponse } from '../apis/api'

interface AuthContextType {
    isAuthenticated: boolean
    isAdmin: boolean
    isLoading: boolean
    user: User | null
    login: (credentials: LoginCredentials) => Promise<AuthState>
    logout: () => void
    register: (credentials: RegisterCredentials) => Promise<AuthState>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        let isMounted = true

        const checkAuth = async () => {
            try {
                const userId = localStorage.getItem('userId')
                if (!userId) {
                    if (isMounted) {
                        setIsAuthenticated(false)
                        setIsAdmin(false)
                        setUser(null)
                        setIsLoading(false)
                    }
                    return
                }

                const response = await authAPI.verify(userId)
                if (isMounted) {
                    if (response.success && response.data?.user) {
                        setIsAuthenticated(true)
                        setIsAdmin(response.data.user.role === 'admin')
                        setUser(response.data.user)
                    } else {
                        setIsAuthenticated(false)
                        setIsAdmin(false)
                        setUser(null)
                        // Clear invalid auth data
                        localStorage.removeItem('userId')
                        localStorage.removeItem('userName')
                    }
                }
            } catch (error) {
                console.error('Error checking auth status:', error)
                if (isMounted) {
                    setIsAuthenticated(false)
                    setIsAdmin(false)
                    setUser(null)
                    // Clear invalid auth data
                    localStorage.removeItem('userId')
                    localStorage.removeItem('userName')
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        checkAuth()

        return () => {
            isMounted = false
        }
    }, [])

    const login = async (credentials: LoginCredentials): Promise<AuthState> => {
        try {
            setIsLoading(true)
            const response = await authAPI.login(credentials)
            if (response.success && response.data?.user) {
                setIsAuthenticated(true)
                setIsAdmin(response.data.user.role === 'admin')
                setUser(response.data.user)
                // Store auth data
                localStorage.setItem('userId', response.data.user.id.toString())
                localStorage.setItem('userName', response.data.user.userName)
            }
            return response
        } catch (error) {
            console.error('Login error:', error)
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Login failed'
            }
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        try {
            const userId = localStorage.getItem('userId')
            if (userId) {
                authAPI.logout(userId)
            }
            localStorage.removeItem('userId')
            localStorage.removeItem('userName')
            setIsAuthenticated(false)
            setIsAdmin(false)
            setUser(null)
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    const register = async (credentials: RegisterCredentials): Promise<AuthState> => {
        try {
            setIsLoading(true)
            const response = await authAPI.register(credentials)
            if (response.success && response.data?.user) {
                setIsAuthenticated(true)
                setIsAdmin(response.data.user.role === 'admin')
                setUser(response.data.user)
                // Store auth data
                localStorage.setItem('userId', response.data.user.id.toString())
                localStorage.setItem('userName', response.data.user.userName)
            }
            return response
        } catch (error) {
            console.error('Registration error:', error)
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Registration failed'
            }
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        isAuthenticated,
        isAdmin,
        isLoading,
        user,
        login,
        logout,
        register
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}