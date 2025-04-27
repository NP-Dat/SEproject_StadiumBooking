import axios, { AxiosError } from 'axios';
import { User, AuthState } from '../types/auth';

const API_URL = 'http://localhost:8001/api/auth';

interface LoginCredentials {
    username: string;
    password: string;
}

interface RegisterCredentials {
    username: string;
    password: string;
    fullname: string;
    birth: string;
    phonenumber: string;
    email: string;
    address: string;
}

interface ErrorResponse {
    message: string;
}

export class AuthService {
    private static token: string | null = null;
    private static user: User | null = null;

    static async login(credentials: LoginCredentials): Promise<AuthState> {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            
            const { token, role } = response.data;
            
            if (token) {
                this.setToken(token);
                this.user = {
                    id: response.data.userId,
                    username: credentials.username,
                    role: role
                };
                
                return {
                    user: this.user,
                    token,
                    isAuthenticated: true,
                    loading: false,
                    error: null
                };
            }
            
            throw new Error('Invalid response format');
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return {
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
            
            throw new Error('Registration failed');
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            return {
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: axiosError.response?.data?.message || 'Registration failed'
            };
        }
    }

    static setToken(token: string): void {
        this.token = token;
        localStorage.setItem('token', token);
    }

    static getToken(): string | null {
        return this.token || localStorage.getItem('token');
    }

    static removeToken(): void {
        this.token = null;
        localStorage.removeItem('token');
    }

    static isAuthenticated(): boolean {
        return !!this.getToken();
    }

    static async getCurrentUser(): Promise<User | null> {
        if (!this.user) {
            const token = this.getToken();
            if (token) {
                try {
                    const response = await axios.get(`${API_URL}/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    this.user = response.data;
                } catch {
                    this.removeToken();
                    return null;
                }
            }
        }
        return this.user;
    }

    static logout(): void {
        this.user = null;
        this.removeToken();
    }
}