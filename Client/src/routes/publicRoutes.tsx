import { RouteType } from '../types/routes'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Venues from '../pages/Venues/Venues'

export const publicRoutes: RouteType[] = [
  {
    path: '/',
    element: <Home />
  },

  /*{
    path: '/',
    element: <Event />
  }*/

  {
    path: '/venues',
    element: <Venues />
  },
  {
    path: '/about',
    element: <About />
  }
]
