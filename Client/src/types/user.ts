export interface User {
    id: number; // Changed to number based on API response
    userName: string; // Changed to match API response format (userName not username)
    fullName: string;
    email: string;
    birth: string;
    phoneNumber: string;
    address: string;
    passWord?: string; // Added to match API response (but marked optional)
}

export interface UpdateUserRequest {
    token: string; // Added to match API request format
    fullname: string; // Changed to match API request format (fullname not fullName)
    email: string;
    phonenumber: string; // Changed to match API request format (phonenumber not phoneNumber)
    address: string;
    password?: string;
}

export interface DeleteUserRequest {
    userId: string; // Kept as is based on API documentation
    confirmation: boolean;
}

// Keep UserPreferences as is since it's not used in the API
export interface UserPreferences {
    notifications: boolean;
    marketingEmails: boolean;
    theme: 'light' | 'dark' | 'system';
    language: string;
}

export interface UserResponse {
    message: string;
    user: User;
}

export interface UserActionResponse {
    success: boolean;
    message: string;
    userId?: number; // Changed to number to match User.id type
}

export type UsersListResponse = Array<User>;