import Profile from '../pages/user/Profile/Profile'
import UserBookings from '../pages/user/UserBookings/UserBookings'
import Booking from '../pages/booking/Booking/Booking'
import ZoneSelection from '../pages/booking/ZoneSelection/ZoneSelection'
import Payment from '../pages/booking/Payment/Payment'
import Cart from '../pages/booking/Cart/Cart'
import Confirmation from '../pages/booking/Confirmation/Confirmation'
import Ticket from '../pages/user/Ticket/Ticket'
import { RouteType } from '../types/routes'
import { TicketManagement } from '../pages/admin/Admin/TicketService/TicketManagement'

export const privateRoutes: RouteType[] = [
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/bookings',
        element: <UserBookings />
    },
    {
        path: '/booking',
        element: <Booking />
    },
    {
        path: '/zone-selection',
        element: <ZoneSelection />
    },
    {
        path: '/payment',
        element: <Payment />
    },
    {
        path: '/cart',
        element: <Cart />
    },
    {
        path: '/confirmation',
        element: <Confirmation />
    },
    {
        path: '/ticket',
        element: <Ticket />
    },
    {
        path: '/admin/tickets',
        element: <TicketManagement />
    }
]