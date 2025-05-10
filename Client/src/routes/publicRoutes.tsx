import { RouteType } from '../types/routes'
import Home from '../pages/core/Home/Home'
import About from '../pages/core/About/About'
import Venues from '../pages/events/Venues/Venues'
import Events from '../pages/events/Events/Events'
import EventDetail from '../pages/events/Events/EventDetail'
import FAQ from '../pages/support/Support/FAQ'
import Terms from '../pages/support/Support/Terms'
import Privacy from '../pages/support/Support/Privacy'
import Refund from '../pages/support/Support/Refund'
import Accessibility from '../pages/support/Support/Accessibility'
import Stadium from '../pages/events/Stadium/Stadium'
import SchedulePage from '../pages/events/ScheduleEvent/ScheduleEvent'
// import Stadium from '../pages/Stadium/Stadium'

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
  {
     path: '/stadium',
    element: <Stadium zones={[]} scheduleId={0} />
  },
]
