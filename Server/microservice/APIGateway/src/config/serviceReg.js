const services = {
    auth: {
      url: process.env.AUTH_SERVICE_URL || 'http://localhost:8001',
      routes: [
        '/api/auth/login',
        '/api/auth/register',
        '/api/auth/profile'
      ]
    },

    owner: {
      url: process.env.OWNER_SERVICE_URL || 'http://localhost:8008',
      routes: [
        '/api/owner/login',
        '/api/owner/register',
        '/api/owner/profile'
      ]
    },

    users: {
      url: process.env.USER_SERVICE_URL || 'http://localhost:8002',
      routes: [
        '/api/users/profile'
      ]
    },

    events: {
      url: process.env.EVENT_SERVICE_URL || 'http://localhost:8003',
      routes: [
        '/api/events',
        '/api/tickets'
      ]
    },

    bookings: {
      url: process.env.BOOKING_SERVICE_URL || 'http://localhost:8004',
      routes: [
        '/api/bookings'
      ]
    }
    // Add other services here as needed
  };
  
  module.exports = services;