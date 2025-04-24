# Stadium Booking Client

## Project Structure
```
Client/
├── public/                          # Static files
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/                             # Main source code
│   ├── assets/                      # Static assets
│   │   └── assets.tsx               # Image, icons
│   ├── components/                  # Shared components
│   │   ├── ui/                      # Basic shared UI components
│   │   └── layout/                  # Layout components
│   │       ├── Navbar/
│   │       └── Footer/
│   ├── contexts/                    # React Context providers
│   │   └── AuthContext.tsx          # Authentication context
│   ├── pages/                       # Page components
│   │   ├── Home/                    # Home page
│   │   ├── Auth/                    # Authentication pages
│   │   │   ├── Login/
│   │   │   └── Register/
│   │   ├── Dashboard/               # User dashboard
│   │   ├── Profile/                 # User profile
│   │   ├── Bookings/                # Booking management
│   │   ├── Venues/                  # Venue listing
│   │   ├── Events/                  # Event listing
│   │   └── Support/                 # Support pages
│   │       ├── FAQ/
│   │       ├── Terms/
│   │       ├── Privacy/
│   │       ├── Refund/
│   │       └── Accessibility/
│   ├── routes/                      # Router configuration
│   │   ├── protectedRoutes.tsx      # Protected routes
│   │   ├── publicRoutes.tsx         # Public routes
│   │   └── AppRouter.tsx            # Main router
│   ├── services/                    # API services
│   │   └── authService.ts           # Authentication service
│   ├── types/                       # TypeScript types
│   │   ├── auth.ts                  # Authentication types
│   │   └── routes.ts                # Route types
│   ├── utils/                       # Utility functions
│   │   ├── routeUtils.ts            # Route utilities
│   │   └── ScrollToTop.tsx          # Scroll restoration
│   ├── config/                      # Configuration
│   │   └── env.ts                   # Environment variables
│   ├── App.tsx                      # Root component
│   ├── App.module.css               # Global styles
│   └── main.tsx                     # Entry point
```

## Key Features

### Authentication
- JWT-based authentication
- Protected routes
- Role-based access control
- Session persistence
- Automatic token refresh

### Routing
- Public and protected routes
- Route protection with HOC
- Loading states
- Error handling
- Scroll restoration

### State Management
- Context API for global state
- Local storage for persistence
- Type-safe state updates
- Error state handling

### API Integration
- Centralized API services
- Type-safe API calls
- Error handling
- Response validation

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

## Environment Variables
```env
VITE_API_URL=http://localhost:5000/api
NODE_ENV=development
```

## API Endpoints

### Authentication
- POST `/auth/login` - User login
- POST `/auth/register` - User registration
- POST `/auth/logout` - User logout

### Protected Routes
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/bookings` - Booking management

### Public Routes
- `/` - Home page
- `/venues` - Venue listing
- `/events` - Event listing
- `/about` - About page
- `/faq` - FAQ page
- `/terms` - Terms of service
- `/privacy` - Privacy policy
- `/refund` - Refund policy
- `/accessibility` - Accessibility statement

## Best Practices

### Code Organization
- Feature-based directory structure
- Separation of concerns
- Reusable components
- Type safety

### State Management
- Context for global state
- Local state for components
- Proper error handling
- Loading states

### API Calls
- Centralized services
- Type-safe requests
- Error handling
- Response validation

### Routing
- Protected routes
- Loading states
- Error boundaries
- Scroll restoration