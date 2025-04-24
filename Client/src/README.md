Client/
├── public/                          // Static files
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/                             // Main source code
│   ├── assets/                      // Static assets
│   │   ├── assets.tsx                 // Image,icons
│   ├── components/                  // Shared components
│   │   ├── ui/                      // Basic shared UI components
│   │   └── layout/                  // Layout components
│   |   ├── hooks/                   // Custom hooks (useAuth, useTheme)
│   │   ├── utils/                   //Utils functions
│   ├── pages/                       // Page components
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   ├── Home.module.css
│   │   │   └── sections/         // Page-specific components
│   │   ├── Auth/
│   │   │   ├── Login/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Login.module.css
│   │   │   └── Register/
│   │   │       ├── Register.tsx
│   │   │       └── Register.module.css
│   ├── routes/                      // Router configuration
│   │   ├── protectedRoutes.tsx
│   │   ├── publicRoutes.tsx
│   │   └── RouteTypes.ts
│   │   └── AppRouter.tsx
│   ├── services/                    // API services
│   │   ├── authService.ts
│   │   ├── userService.ts
│   ├── types/                       // TypeScript types
│   │   ├── user.ts
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── config/                     
│   ├── App.tsx                      // Root component
│   ├── App.module.css
│   └── main.tsx                     // Entry point
|   ├── .env.example
|   └── README.md