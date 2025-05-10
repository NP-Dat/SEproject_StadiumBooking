export interface User {
    id: number;
    userName: string;
    passWord: string;
    fullName: string;
    birth: string;
    phoneNumber: string;
    address: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    success: boolean;
    data?: {
        user: User;
        token?: string;
    };
    error?: string;
}

export interface LoginCredentials {
    userName: string;
    passWord: string;
}

export interface RegisterCredentials {
    userName: string;
    passWord: string;
    fullName: string;
    birth: string;
    phoneNumber: string;
    address: string;
    email: string;
}

export interface AuthResponse {
    success: boolean;
    user: User;
    message?: string;
    error?: string;
}

export interface LoginResult {
    success: boolean;
    message: string;
    error?: string;
}