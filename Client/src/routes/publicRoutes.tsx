import { RouteType } from '../types/routes'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Venues from '../pages/Venues/Venues'
import Events from '../pages/Events/Events'
import EventDetail from '../pages/Events/EventDetail'
import FAQ from '../pages/Support/FAQ'
import Terms from '../pages/Support/Terms'
import Privacy from '../pages/Support/Privacy'
import Refund from '../pages/Support/Refund'
import Accessibility from '../pages/Support/Accessibility'
import SchedulePage from '../pages/ScheduleEvent/Schedule'
import Stadium from '../pages/Stadium/Stadium'
import EventListByStadium from '../pages/Stadium/EventListByStadium'

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
    path: '/events/:eventId',
    element: <EventDetail />
  },
  {
    path: '/venues',
    element: <Venues />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/stadium',
    element: <Stadium />
  },
  {
    path: '/eventsbystadium/:id',
    element: <EventListByStadium />
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
  {
    path: '/schedules/event/:eventId',
    element: <SchedulePage />
  },

  // This is for testing the stadium seat page
  // {
  //    path: '/stadium',
  //   element: <Stadium_map zones={[]} scheduleId={0} />
  // },
]
