import axios, { AxiosError } from 'axios';
import { 
    LoginCredentials, 
    RegisterCredentials, 
    AuthResponse, 
    User,
    AuthState 
} from '../types/auth';

const API_URL = 'http://localhost:8001/api/auth';

interface errorResponse {
    message: string;
}

export class AuthService {
    private static token: string | null = null;
    private static user: User | null = null;
    

    static async login(credentials: LoginCredentials): Promise<AuthState> {
         try {
            const response = await axios.post<AuthResponse>(
                `${API_URL}/login`, 
                credentials
            );
            const { user, token } = response.data;
            this.setToken(token);
            this.user = user;
            
            return {
                user,
                token,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        } catch (error) {
            const axiosError = error as AxiosError<errorResponse>;
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
            console.log('Registration attempt with:', credentials); // Debug log
            
            const response = await axios.post<AuthResponse>(
                `${API_URL}/register`, 
                credentials
            );
            
            console.log('Registration response:', response.data); // Debug log
            
            const { user, token } = response.data;
            
            if (user && token) {
                this.setToken(token);
                this.user = user;
            }
    
            return {
                user,
                token,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        } catch (error) {
            console.error('Registration error details:', error); // Debug log
            const axiosError = error as AxiosError<{message: string}>;
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
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    static getToken(): string | null {
        if (!this.token) {
            this.token = localStorage.getItem('token');
            if (this.token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            }
        }
        return this.token;
    }

    static removeToken(): void {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    }

    static async getCurrentUser(): Promise<AuthState> {
        const token = this.getToken();
        if (!token) {
            return {
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null
            };
        }

        try {
            const response = await axios.get<User>(`${API_URL}/me`);
            this.user = response.data;
            
            return {
                user: this.user,
                token,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        } catch {
            this.removeToken();
            return {
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: 'Session expired'
            };
        }
    }

    static logout(): AuthState {
        this.removeToken();
        return {
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null
        };
    }

    static isAuthenticated(): boolean {
        return !!(this.getToken() && this.user);
    }
}