import { createContext } from 'react';
import { User } from '../types/auth';

interface LoginResult {
    success: boolean;
    message: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<LoginResult>;
    register: (
        username: string, 
        email: string, 
        password: string, 
        fullname: string, 
        birth: string, 
        phonenumber: string, 
        address: string
    ) => Promise<LoginResult>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    login: async () => ({ success: false, message: 'Not implemented' }),
    register: async () => ({ success: false, message: 'Not implemented' }),
    logout: () => {}
});