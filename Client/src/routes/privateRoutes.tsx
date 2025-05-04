import { RouteType } from '../types/routes'
import Profile from '../pages/Profile/Profile'
import UserBookings from '../pages/UserBookings/UserBookings'
import BookingDetail from '../pages/BookingDetail/BookingDetail'

export const privateRoutes: RouteType[] = [
    {
        path: '/profile',
        element: (
                <Profile />
        )
    },
    {
        path: '/bookings',
        element: (
                <UserBookings />
        )
    },
    {
        path: '/bookings/:cartId',
        element: (
                <BookingDetail />
        )
    }
]