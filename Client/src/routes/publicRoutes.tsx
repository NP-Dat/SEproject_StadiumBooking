import React from 'react'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Login from '../pages/Auth/Login/Login'
import Register from '../pages/Auth/Register/Register'
import { RouteType } from './RouteTypes'

export const publicRoutes: RouteType[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]
