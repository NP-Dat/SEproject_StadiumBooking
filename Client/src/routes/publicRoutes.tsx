import { RouteType } from '../types/routes'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'

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
