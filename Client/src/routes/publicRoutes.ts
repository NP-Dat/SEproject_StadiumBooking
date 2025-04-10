import React, { ReactNode } from 'react'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'

interface RouteType {
  path: string
  element: ReactNode
}

export const publicRoutes: RouteType[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  }
]
