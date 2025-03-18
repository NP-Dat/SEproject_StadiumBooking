import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Login from "../pages/public/Login";
import Dashboard from "../pages/auth/Dashboard";
import Profile from "../pages/auth/Profile";
import Bookings from "../pages/auth/Bookings";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "login", element: <Login /> },
        ],
    },
    {
        path: "/app",
        element: <AuthLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "profile", element: <Profile /> },
            { path: "bookings", element: <Bookings /> },
        ],
    },
]);
