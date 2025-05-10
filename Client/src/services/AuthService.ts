import axios from 'axios';
import type { User, LoginCredentials, RegisterCredentials, AuthState, AuthResponse } from '../types/auth';

const API_URL = 'http://localhost:8001/api/auth';

export class AuthService {
    static async checkAuth(): Promise<AuthState> {
        try {
            const userId = localStorage.getItem('userId');
            
            if (!userId) {
                return {
                    success: false,
                    error: 'No user ID found'
                };
            }

            const response = await axios.get(`${API_URL}/verify/${userId}`);
            
            if (response.data.valid) {
                return {
                    success: true,
                    data: {
                        user: response.data.user
                    }
                };
            }

            return {
                success: false,
                error: 'Invalid user'
            };
        } catch (error) {
            this.logout();
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Auth check failed'
            };
        }
    }

    static async login(credentials: LoginCredentials): Promise<AuthState> {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);

            if (response.data.success && response.data.user) {
                localStorage.setItem('userId', response.data.user.id.toString());
                localStorage.setItem('userName', response.data.user.userName);

                return {
                    success: true,
                    data: {
                        user: response.data.user
                    }
                };
            }

            return {
                success: false,
                error: response.data.message || 'Login failed'
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Login failed'
            };
        }
    }

    static async register(credentials: RegisterCredentials): Promise<AuthState> {
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/register`, credentials);

            if (response.data.success && response.data.user) {
                localStorage.setItem('userId', response.data.user.id.toString());
                localStorage.setItem('userName', response.data.user.userName);

                return {
                    success: true,
                    data: {
                        user: response.data.user
                    }
                };
            }

            return {
                success: false,
                error: response.data.message || 'Registration failed'
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Registration failed'
            };
        }
    }

    static logout(): void {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                axios.post(`${API_URL}/logout/${userId}`).catch(error => {
                    console.error('Logout API call failed:', error);
                });
            }
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
        }
    }
}