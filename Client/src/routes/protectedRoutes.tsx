import Profile from "../pages/Profile/Profile";

export const protectedRoutes = [
    {
        path: "/profile",
        element: <Profile />
    },
    // ...other protected routes
];