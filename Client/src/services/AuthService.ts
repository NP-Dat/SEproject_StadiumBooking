import axios, { AxiosError } from 'axios';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth';

const API_URL = 'http://localhost:8001/api/auth';
const PAYMENT_API_URL = 'http://localhost:8006/api/payment';

interface ErrorResponse {
    message: string;
}

interface AuthState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: User | null;
    error?: string;
}

export class AuthService {
    private static user: User | null = null;

    // New method to create wallet
    static async createWallet(userId: string, initialBalance: number = 0): Promise<boolean> {
        try {
            console.log('Creating wallet for user:', userId);
            const response = await axios.post(`${PAYMENT_API_URL}/createWallet`, {
                userID: parseInt(userId),
                initialBalance
            });
            
            console.log('Wallet created successfully:', response.data);
            return true;
        } catch (error) {
            console.error('Error creating wallet:', error);
            if (error instanceof AxiosError) {
                console.error('API Error:', error.response?.data);
            }
            return false;
        }
    }

    static async checkAuth(): Promise<AuthState> {
        try {
            console.log('Checking authentication status...');
            const userId = localStorage.getItem('userId');
            const username = localStorage.getItem('username');
            const isAdmin = localStorage.getItem('isAdmin') === 'true';

            console.log('Local storage values:', { userId, username, isAdmin });

            if (userId && username) {
                // Verify the token with the backend
                try {
                    const response = await axios.get(`${API_URL}/verify`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    
                    if (response.data.valid) {
                        return {
                            isAuthenticated: true,
                            isAdmin,
                            user: { id: userId, username }
                        };
                    }
                } catch (error) {
                    console.error('Token verification failed:', error);
                    // Clear invalid data
                    this.logout();
                }
            }

            return {
                isAuthenticated: false,
                isAdmin: false,
                user: null
            };
        } catch (error) {
            console.error('Auth check failed:', error);
            if (error instanceof AxiosError) {
                console.error('API Error:', error.response?.data);
            }
            return {
                isAuthenticated: false,
                isAdmin: false,
                user: null,
                error: error instanceof Error ? error.message : 'Auth check failed'
            };
        }
    }

    static async login(username: string, password: string): Promise<AuthState> {
        try {
            console.log('Attempting login for user:', username);
            
            // Check for admin credentials
            if (username === 'admin' && password === 'admin123') {
                console.log('Admin login successful');
                const adminUser = { id: 'admin', username: 'admin' };
                localStorage.setItem('userId', 'admin');
                localStorage.setItem('username', 'admin');
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('token', 'admin-token');
                return {
                    isAuthenticated: true,
                    isAdmin: true,
                    user: adminUser
                };
            }

            // Regular user login
            try {
                const response = await axios.post(`${API_URL}/login`, {
                    username,
                    password
                });

                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', user.id);
                localStorage.setItem('username', user.username);
                localStorage.setItem('isAdmin', 'false');

                return {
                    isAuthenticated: true,
                    isAdmin: false,
                    user
                };
            } catch (error) {
                console.error('Login API call failed:', error);
                if (error instanceof AxiosError) {
                    console.error('API Error:', error.response?.data);
                }
                throw error;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return {
                isAuthenticated: false,
                isAdmin: false,
                user: null,
                error: error instanceof Error ? error.message : 'Login failed'
            };
        }
    }

    static async register(
        username: string,
        email: string,
        password: string,
        fullname: string,
        birth: string,
        phonenumber: string,
        address: string
    ): Promise<AuthState> {
        try {
            console.log('Attempting registration for user:', username);
            
            try {
                const response = await axios.post(`${API_URL}/register`, {
                    username,
                    email,
                    password,
                    fullname,
                    birth,
                    phonenumber,
                    address
                });

                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', user.id);
                localStorage.setItem('username', user.username);
                localStorage.setItem('isAdmin', 'false');

                return {
                    isAuthenticated: true,
                    isAdmin: false,
                    user
                };
            } catch (error) {
                console.error('Registration API call failed:', error);
                if (error instanceof AxiosError) {
                    console.error('API Error:', error.response?.data);
                }
                throw error;
            }
        } catch (error) {
            console.error('Registration failed:', error);
            return {
                isAuthenticated: false,
                isAdmin: false,
                user: null,
                error: error instanceof Error ? error.message : 'Registration failed'
            };
        }
    }

    static logout(): void {
        console.log('Logging out user...');
        try {
            // Call logout endpoint if needed
            const token = localStorage.getItem('token');
            if (token) {
                axios.post(`${API_URL}/logout`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).catch(error => {
                    console.error('Logout API call failed:', error);
                });
            }
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            // Clear local storage
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('token');
        }
    }
}