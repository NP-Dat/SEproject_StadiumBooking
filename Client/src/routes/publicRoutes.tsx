import { RouteType } from '../types/routes'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Venues from '../pages/Venues/Venues'
import Events from '../pages/Events/Events'
import FAQ from '../pages/Support/FAQ'
import Terms from '../pages/Support/Terms'
import Privacy from '../pages/Support/Privacy'
import Refund from '../pages/Support/Refund'
import Accessibility from '../pages/Support/Accessibility'
import Stadium from '../pages/Stadium/Stadium'

export const publicRoutes: RouteType[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/events',
    element: <Events />
  },
  {
    path: '/venues',
    element: <Venues />
  },
  {
    path: '/about',
    element: <About />
  },
  /*Support & Legal*/
  {
    path: '/faq',
    element: <FAQ />
  },
  {
    path: '/terms',
    element: <Terms />
  },
  {
    path: '/privacy',
    element: <Privacy />
  },
  {
    path: '/refund',
    element: <Refund />
  },
  {
    path: '/accessibility',
    element: <Accessibility />
  },

  // This is for testing the stadium seat page
  {
    path: '/stadium',
    element: <Stadium />
  },
]
