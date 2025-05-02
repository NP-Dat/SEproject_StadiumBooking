export interface User {
    id: string;
    username: string;
}

export interface AuthState {
    message: string;
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    password: string;
    fullname: string;
    birth: string;
    phonenumber: string;
    email: string;
    address: string;
}

export interface AuthResponse {
    message: string;
    userId?: string;
}