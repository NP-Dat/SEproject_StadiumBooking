import { RouteType } from '../types/routes'
import Profile from '../pages/Profile/Profile'
import Cart from '../pages/Cart/Cart'

export const privateRoutes: RouteType[] = [
    {
        path: '/profile',
        element: (
                <Profile />
        )
    },
    {
        path: '/cart',
        element: (
                <Cart />
        )
    }
]