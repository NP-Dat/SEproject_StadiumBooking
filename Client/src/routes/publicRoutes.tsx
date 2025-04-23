import React from "react";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import LoginPage from "../pages/Login/LoginPage";
import StadiumView from "../pages/Stadium/StadiumView";

const publicRoutes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/login", element: <LoginPage />},
    { path: "/Stadiums", element: <StadiumView />}
];

export default publicRoutes;
