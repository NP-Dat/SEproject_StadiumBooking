import { RouteType } from '../types/routes'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Venues from '../pages/Venues/Venues'
import Stadium from '../pages/Stadium/Stadium'

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
  },
  
//      This is for testing the UI layout of the Stadium booking page
//      Actually, this will be in private routes
  {
    path: '/stadium',
    element: <Stadium />
  }
]
