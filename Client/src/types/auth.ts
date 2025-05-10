export interface User {
    id: string;
    username: string;
    email?: string;
    fullname?: string;
    birth?: string;
    phonenumber?: string;
    address?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: User | null;
    error?: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
    fullname: string;
    birth: string;
    phonenumber: string;
    address: string;
}

export interface AuthResponse {
    message: string;
    userId?: string;
}

export interface LoginResult {
    success: boolean;
    message: string;
    error?: string;
}