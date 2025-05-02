import { RouteType } from '../types/routes'
import Profile from '../pages/Profile/Profile'
import Cart from '../pages/Cart/Cart'
import ProtectedRoute from './ProtectedRoute'

export const privateRoutes: RouteType[] = [
    {
        path: '/profile',
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        )
    },
    {
        path: '/cart',
        element: (
            <ProtectedRoute>
                <Cart />
            </ProtectedRoute>
        )
    }
]