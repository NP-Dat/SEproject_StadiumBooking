import { createContext } from 'react';
import { User, LoginResult } from '../types/auth';

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
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
    isAdmin: false,
    login: async () => ({ success: false, message: 'Not implemented' }),
    register: async () => ({ success: false, message: 'Not implemented' }),
    logout: () => {}
});