src/
├── assets/                    // images, fonts, etc.
├── components/
│   ├── buttons/
│   │   └── PrimaryButton.tsx
│   ├── Layout/
│   │   ├── PublicLayout.tsx   // Layout for public pages (landing page)
│   │   ├── DashboardLayout.tsx // Layout for logged in/deep booking pages
│   │   ├── Header.tsx         // Common header for public pages
│   │   └── Footer.tsx         // Common footer for public pages
│   └── UI/
│       └── Loader.tsx
├── pages/
│   ├── Home/
│   │   └── Home.tsx           // Landing page (public)
│   ├── BookSeats/
│   │   └── BookSeats.tsx      // Booking pages (using DashboardLayout)
│   ├── StadiumInfo/
│   │   └── StadiumInfo.tsx    // May be public or dashboard-based
│   ├── Account/
│   │   └── Login.tsx          // Example login page
│   └── NotFound/
│       └── NotFound.tsx
├── routes/
│   ├── PublicRoutes.tsx       // Routes using PublicLayout
│   └── DashboardRoutes.tsx    // Routes using DashboardLayout
├── App.tsx
└── main.tsx