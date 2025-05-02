import { User, UpdateUserRequest, UserActionResponse } from '../types/user';

const API_URL = 'http://localhost:8002/api/users';

export class UserService {
  static async getProfile(): Promise<User | null> {
    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        console.error('No user ID found');
        return null;
      }
      
      // Pass userId in the URL as a query parameter
      const response = await fetch(`${API_URL}/me?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
      }
      
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  static async updateProfile(profileData: UpdateUserRequest): Promise<UserActionResponse> {
    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      // Format the request according to API documentation
      const updateData: Record<string, string> = {
        userId: userId,
        phonenumber: profileData.phonenumber,
        address: profileData.address,
        fullname: profileData.fullname,
        email: profileData.email
      };
      
      // Add password only if it exists
      if (profileData.password) {
        updateData.password = profileData.password;
      }
      
      const response = await fetch(`${API_URL}/me`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status} ${response.statusText}`);
      }
      
      const responseData = await response.json();
      
      return {
        success: true,
        message: responseData.message || 'Profile updated successfully',
        userId: responseData.user?.id
      };
    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update profile'
      };
    }
  }

  static async getAllUsers(): Promise<User[] | null> {
    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      // Use userId for authentication instead of token
      const response = await fetch(`${API_URL}/all?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
      }
      
      const users = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching all users:', error);
      return null;
    }
  }

  static async deleteUser(targetUserId: string): Promise<UserActionResponse> {
    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      const response = await fetch(`${API_URL}/profile-deleting`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          userId: targetUserId,
          requesterId: userId // Include the ID of the user making the request
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status} ${response.statusText}`);
      }
      
      return {
        success: true,
        message: 'User deleted successfully',
        userId: parseInt(targetUserId)
      };
    } catch (error) {
      console.error('Error deleting user:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete user'
      };
    }
  }

  // Delete your own account
  static async deleteAccount(): Promise<UserActionResponse> {
    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      const response = await fetch(`${API_URL}/profile-deleting`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete account: ${response.status} ${response.statusText}`);
      }
      
      // Clear user data from localStorage
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      
      return {
        success: true,
        message: 'Your account has been deleted successfully',
        userId: parseInt(userId)
      };
    } catch (error) {
      console.error('Error deleting account:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to delete account'
      };
    }
  }

  static async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL.split('/api')[0]}/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      return response.ok;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
  
  // Format date similar to EventService
  static formatDate(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}