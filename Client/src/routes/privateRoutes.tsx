import Profile from '../pages/user/Profile/Profile'
import ZoneSelection from '../pages/booking/ZoneSelection/ZoneSelection'
import Payment from '../pages/booking/Payment/Payment'
import Ticket from '../pages/user/Ticket/Ticket'
import { RouteType } from '../types/routes'
import { TicketManagement } from '../pages/admin/Admin/TicketService/TicketManagement'

export const privateRoutes: RouteType[] = [
    {
        path: '/profile',
        element: <Profile />
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
        path: '/ticket',
        element: <Ticket />
    },
    {
        path: '/admin/tickets',
        element: <TicketManagement />
    }
]