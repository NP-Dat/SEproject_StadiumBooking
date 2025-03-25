import React from "react";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Events from "../pages/Events/Events";
import Terms from "../pages/Legal/Terms";
import Policy from "../pages/Legal/Policy";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

const publicRoutes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/events", element: <Events /> },
    { path: "/terms", element: <Terms /> },
    { path: "/policy", element: <Policy /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
];

export default publicRoutes;
