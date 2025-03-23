import React from "react";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";

const publicRoutes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
];

export default publicRoutes;
