import { LoginCredentials, RegisterCredentials, AuthResponse, AuthError, User } from '../types/auth';

// Mock user database
const mockUsers: (User & { password: string })[] = [
    {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        password: 'admin123' // In real app, this would be hashed
    },
    {
        id: '2',
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user',
        password: 'user123' // In real app, this would be hashed
    }
];

// Mock token storage
let mockToken: string | null = null;

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        await delay(1000); // Simulate network delay

        const user = mockUsers.find(u => 
            u.email === credentials.email && 
            u.password === credentials.password
        );

        if (!user) {
            throw {
                message: 'Invalid email or password',
                code: 'INVALID_CREDENTIALS'
            } as AuthError;
        }

        // Generate mock token
        const token = `mock-token-${user.id}-${Date.now()}`;
        mockToken = token;

        // Remove password from user object
        const { password, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token
        };
    },

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        await delay(1000); // Simulate network delay

        // Check if email already exists
        if (mockUsers.some(u => u.email === credentials.email)) {
            throw {
                message: 'Email already exists',
                code: 'EMAIL_EXISTS'
            } as AuthError;
        }

        // Create new user
        const newUser = {
            id: String(mockUsers.length + 1),
            email: credentials.email,
            name: credentials.name,
            role: 'user' as const,
            password: credentials.password // In real app, this would be hashed
        };

        mockUsers.push(newUser);

        // Generate mock token
        const token = `mock-token-${newUser.id}-${Date.now()}`;
        mockToken = token;

        // Remove password from user object
        const { password, ...userWithoutPassword } = newUser;

        return {
            user: userWithoutPassword,
            token
        };
    },

    async logout(): Promise<void> {
        await delay(500); // Simulate network delay
        mockToken = null;
    },

    async getCurrentUser(): Promise<AuthResponse | null> {
        await delay(500); // Simulate network delay

        if (!mockToken) {
            return null;
        }

        // Extract user ID from mock token
        const userId = mockToken.split('-')[2];
        const user = mockUsers.find(u => u.id === userId);

        if (!user) {
            return null;
        }

        // Remove password from user object
        const { password, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token: mockToken
        };
    }
};
