# Authentication Service

This service handles user authentication, authorization, and user management for the ticket booking microservice architecture.

## Service Overview

The Authentication Service is responsible for:
- User registration and login
- Owner registration and login
- Token generation and validation
- User profile management
- Authorization across microservices

## Directory Structure

```
Auth/
├── index.js                 # Entry point for the Auth service
├── package.json             # Dependencies and scripts
├── README.md                # This documentation file
└── src/
    ├── config/
    │   └── db.js            # Database configuration
    ├── controllers/
    │   ├── authControllers.js    # Authentication logic (login, refresh token, logout)
    │   ├── ownerControllers.js   # Event owner management 
    │   └── userController.js     # User account management
    ├── middleware/
    │   ├── authMiddleware.js     # Token verification middleware
    │   └── validationMiddleware.js # Request validation middleware
    ├── models/
    │   ├── ownerModels.js        # Database models for event owners
    │   └── userModels.js         # Database models for users
    ├── routes/
    │   ├── authRoutes.js         # Authentication endpoints
    │   ├── ownerRoutes.js        # Owner management endpoints
    │   └── userRoutes.js         # User management endpoints
    └── utils/
        ├── jwtUtils.js           # JWT token generation and verification
        └── passwordUtils.js      # Password hashing and validation
```

## Key Files and Their Purpose

### Entry Point
- **index.js**: Configures Express server, middleware, and routes for the Auth service.

### Configuration
- **src/config/db.js**: Sets up database connection and handles database errors.

### Controllers
- **src/controllers/authControllers.js**: Handles login, token refresh, logout, and token verification.
- **src/controllers/userController.js**: Manages user creation, profile updates, deletion.
- **src/controllers/ownerControllers.js**: Handles event owner accounts and privileges.

### Middleware
- **src/middleware/authMiddleware.js**: Verifies JWT tokens and attaches user info to requests.
- **src/middleware/validationMiddleware.js**: Validates request data before processing.

### Models
- **src/models/userModels.js**: Defines user schema and authentication methods.
- **src/models/ownerModels.js**: Defines event owner schema and privileges.

### Routes
- **src/routes/authRoutes.js**: Endpoints for login, refresh token, logout, registration.
- **src/routes/userRoutes.js**: User profile management endpoints.
- **src/routes/ownerRoutes.js**: Owner account management endpoints.

### Utilities
- **src/utils/jwtUtils.js**: Functions for generating and verifying JWT tokens.
- **src/utils/passwordUtils.js**: Functions for hashing and verifying passwords.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login for users and owners
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verify token validity

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Owners
- `POST /api/owners/register` - Register as an event owner
- `GET /api/owners/profile` - Get owner profile
- `PUT /api/owners/profile` - Update owner profile

## Integration with Other Services

The Auth Service is a critical component that integrates with all other microservices:

1. **API Gateway**: Routes authentication requests and verifies tokens.
2. **Event Service**: Verifies owner permissions for event management.
3. **Ticket Service**: Validates user authentication for ticket purchases.
4. **Cart Service**: Ensures users are authenticated before managing cart.
5. **Order Service**: Verifies user identity for order processing.
6. **Payment Service**: Ensures secure user authentication before payments.

## Authentication Flow

1. Users register or login through the Auth Service.
2. Upon successful authentication, the service issues JWT access and refresh tokens.
3. The access token is included in requests to other services.
4. Other services verify the token through their own authMiddleware implementations.
5. When the access token expires, clients use the refresh token to obtain a new access token.