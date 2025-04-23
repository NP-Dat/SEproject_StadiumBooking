Client/
├── public/                          // Static files
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/                             // Main source code
│   ├── assets/                      // Static assets
│   │   ├── images/                  // Image assets
│   │   └── icons/                   // Icon assets
│   ├── components/                  // Shared components
│   │   ├── ui/                      // Basic UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   └── Input.module.css
│   │   │   └── Modal/
│   │   │       ├── Modal.tsx
│   │   │       └── Modal.module.css
│   │   └── layout/                  // Layout components
│   │       ├── Navbar/
│   │       │   ├── Navbar.tsx
│   │       │   └── Navbar.module.css
│   │       └── Footer/
│   │           ├── Footer.tsx
│   │           └── Footer.module.css
│   ├── hooks/                       // Custom hooks
│   │   ├── useAuth.ts
│   │   └── useTheme.ts
│   ├── utils/                       // Utility functions
│   │   ├── validation.ts
│   │   └── formatting.ts
│   ├── pages/                       // Page components
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   ├── Home.module.css
│   │   │   └── components/         // Page-specific components
│   │   │       ├── Hero/
│   │   │       │   ├── Hero.tsx
│   │   │       │   └── Hero.module.css
│   │   │       └── Venue/
│   │   │           ├── Venue.tsx
│   │   │           └── Venue.module.css
│   │   ├── Auth/
│   │   │   ├── Login/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Login.module.css
│   │   │   └── Register/
│   │   │       ├── Register.tsx
│   │   │       └── Register.module.css
│   │   └── Dashboard/
│   │       ├── Dashboard.tsx
│   │       └── Dashboard.module.css
│   ├── routes/                      // Router configuration
│   │   ├── privateRoutes.ts
│   │   ├── publicRoutes.ts
│   │   └── index.tsx
│   ├── services/                    // API services
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   └── api.ts
│   ├── store/                       // State management
│   │   ├── slices/
│   │   └── index.ts
│   ├── types/                       // TypeScript types
│   │   ├── user.ts
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── App.tsx                      // Root component
│   ├── App.module.css
│   └── main.tsx                     // Entry point
├── .env.example
└── README.md