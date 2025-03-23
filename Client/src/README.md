my-react-app-project-2025/
├── public/                          // Các tệp tĩnh (favicon, index.html, manifest.json)
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/                             // Mã nguồn chính
│   ├── assets/                      // Ảnh, font, icons, CSS, SCSS...
│   ├── components/                  // Các component dùng chung
│   │   ├── ui/                      // Các component UI chung (Button, Modal, Input)
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   ├── layout/                  // Các Layout như Navbar, Sidebar, Footer
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   ├── hooks/                       // Custom hooks (useAuth, useTheme...)
│   │   ├── useAuth.ts
│   │   ├── useTheme.ts
│   ├── utils/                       // Hàm tiện ích (FormatDate, debounce...)
│   │   ├── formatDate.ts
│   │   ├── debounce.ts
│   ├── pages/                       // Các trang (Home, About, Dashboard...)
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   ├── index.ts
│   │   ├── About/
│   │   │   ├── About.tsx
│   │   │   ├── index.ts
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── index.ts
│   ├── store/                       // Quản lý state (Redux, Zustand...)
│   │   ├── slices/                  // Redux Slices (authSlice, userSlice)
│   │   │   ├── authSlice.ts
│   │   │   ├── userSlice.ts
│   │   ├── index.ts                  // Combine các reducers
│   ├── routes/                       // Cấu hình Router
│   │   ├── privateRoutes.ts         // Route yêu cầu đăng nhập
│   │   ├── publicRoutes.ts          // Route không yêu cầu đăng nhập
│   │   ├── index.tsx                // App Router chính
│   ├── services/                     // API services (Axios, Fetch)
│   │   ├── authService.ts           // Service xác thực
│   │   ├── userService.ts           // Service người dùng
│   ├── config/                       // Cấu hình chung (axios, env, theme...)
│   │   ├── axios.ts                 // Cấu hình axios
│   │   ├── env.ts                   // Load biến môi trường
│   │   ├── theme.ts                 // Dark/Light Theme config
│   ├── types/                        // Chứa TypeScript types
│   │   ├── user.ts                   // Định nghĩa kiểu dữ liệu User
│   │   ├── auth.ts                   // Định nghĩa kiểu dữ liệu Auth
│   ├── App.tsx                       // Component gốc của ứng dụng
│   ├── main.tsx                      // Entry point của Ứng dụng