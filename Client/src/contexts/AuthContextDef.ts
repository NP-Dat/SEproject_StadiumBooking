import { createContext } from 'react';
import { User } from '../types/auth';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string, fullname: string, birth: string, phonenumber: string, address: string) => Promise<void>;
    logout: () => void;
    loginAsAdmin: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);