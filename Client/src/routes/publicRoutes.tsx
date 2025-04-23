import { RouteType } from '../types/routes'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Venues from '../pages/Venues/Venues'
import Events from '../pages/Events/Events'

export const publicRoutes: RouteType[] = [
  {
    path: '/',
    element: <Home />
  },

  {
    path: '/',
    element: <Events />
  },
  {
    path: '/venues',
    element: <Venues />
  },
  {
    path: '/about',
    element: <About />
  }
]
