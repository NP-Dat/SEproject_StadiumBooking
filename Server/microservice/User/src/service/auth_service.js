require('dotenv').config();

class AuthService {
  static async verifyToken(token) {
    try {
      const response = await axios.post(
        `${process.env.AUTH_SERVICE_URL}/api/auth/verify-token`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Auth service error:', error.message);
      throw new Error('Authentication service unavailable');
    }
  }
}

module.exports = AuthService;