import React, { ReactNode } from 'react'
import Dashboard from '../pages/Dashboard/Dashboard'
import Profile from '../pages/Profile/Profile'
import Bookings from '../pages/Bookings/Bookings'

interface RouteType {
  path: string
  element: ReactNode
}

export const privateRoutes: RouteType[] = [
  // Add private routes here (requiring authentication)
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/bookings',
    element: <Bookings />
  }
]
