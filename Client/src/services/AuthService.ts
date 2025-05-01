import axios, { AxiosError } from 'axios';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';

const API_URL = 'http://localhost:8001/api/auth';

interface ErrorResponse {
    message: string;
}

export class AuthService {
    private static user: User | null = null;

    static async login(credentials: LoginCredentials): Promise<AuthState> {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            
            if (response.data.message === 'Login successful') {
                // Get the user ID from the response
                const userId = response.data.userId || 'unknown';
                
                // Store user data
                this.user = {
                    id: userId,
                    username: credentials.username
                };
                
                // Store in localStorage for persistence
                localStorage.setItem('userId', userId);
                localStorage.setItem('username', credentials.username);
                
                return {
                    message: 'Login successful',
                    user: this.user,
                    token: null,
                    isAuthenticated: true,
                    loading: false,
                    error: null
                };
            }
            
            throw new Error('Login failed: ' + (response.data.message || 'Unknown error'));
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return {
                message: 'Login failed',
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: axiosError.response?.data?.message || 'Login failed'
            };
        }
    }

    static async register(credentials: RegisterCredentials): Promise<AuthState> {
        try {
            const response = await axios.post(`${API_URL}/register`, credentials);
            
            if (response.data.message === 'User registered successfully') {
                // After successful registration, log in automatically
                return await this.login({
                    username: credentials.username,
                    password: credentials.password
                });
            }
            
            throw new Error('Registration failed: ' + (response.data.message || 'Unknown error'));
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return {
                message: 'Registration failed',
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: axiosError.response?.data?.message || 'Registration failed'
            };
        }
    }

    static isAuthenticated(): boolean {
        return !!localStorage.getItem('userId');
    }

    static async getCurrentUser(): Promise<User | null> {
        if (!this.user) {
            const userId = localStorage.getItem('userId');
            const username = localStorage.getItem('username');
            
            if (userId && username) {
                this.user = {
                    id: userId,
                    username: username
                };
            }
        }
        return this.user;
    }

    static logout(): void {
        this.user = null;
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
    }
}