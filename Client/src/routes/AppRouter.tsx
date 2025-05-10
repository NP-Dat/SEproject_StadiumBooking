import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Home from '../pages/core/Home/Home'
import About from '../pages/core/About/About'
import { Login } from '../pages/core/Auth/Login/Login'
import { Register } from '../pages/core/Auth/Register/Register'
import ZoneSelection from '../pages/booking/ZoneSelection/ZoneSelection'
import Payment from '../pages/booking/Payment/Payment'
import Profile from '../pages/user/Profile/Profile'
import Ticket from '../pages/user/Ticket/Ticket'
import { AdminDashboard } from '../pages/admin/Admin/AdminDashboard'
import { AdminUsers } from '../pages/admin/Users/AdminUsers'
import { AdminEvents } from '../pages/admin/Events/AdminEvents'
import { AdminReports } from '../pages/admin/Reports/AdminReports'
import { AdminVenues } from '../pages/admin/Venues/AdminVenues'
import { AdminScheduleEvent } from '../pages/admin/ScheduleEvent/AdminScheduleEvent'
import { TicketManagement } from '../pages/admin/Tickets/TicketManagement'
import Events from '../pages/events/Events/Events'
import Stadium from '../pages/events/Stadium/Stadium'
import Support from '../pages/support/Support/Support'
import NotFound from '../pages/core/NotFound/NotFound'

function LoadingSpinner() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%'
        }}>
            <div>Loading...</div>
        </div>
    )
}

function AdminRoute({ children }: { children: React.ReactNode }) {
    const { isAdmin, isLoading, isAuthenticated } = useAuth()

    if (isLoading) return <LoadingSpinner />
    if (!isAuthenticated) return <Navigate to="/login" replace />
    if (!isAdmin) return <Navigate to="/" replace />

    return <>{children}</>
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return <LoadingSpinner />
    if (!isAuthenticated) return <Navigate to="/login" replace />

    return <>{children}</>
}

export function AppRoutes() {
    const { isLoading } = useAuth()

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route path="/stadium/:id" element={<Stadium />} />
            <Route path="/support" element={<Support />} />

            {/* Protected User Routes */}
            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />
            <Route path="/ticket/:id" element={
                <ProtectedRoute>
                    <Ticket />
                </ProtectedRoute>
            } />
            <Route path="/events/:id/zones" element={
                <ProtectedRoute>
                    <ZoneSelection />
                </ProtectedRoute>
            } />
            <Route path="/payment" element={
                <ProtectedRoute>
                    <Payment />
                </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
                <AdminRoute>
                    <AdminDashboard />
                </AdminRoute>
            } />
            <Route path="/admin/users" element={
                <AdminRoute>
                    <AdminUsers />
                </AdminRoute>
            } />
            <Route path="/admin/events" element={
                <AdminRoute>
                    <AdminEvents />
                </AdminRoute>
            } />
            <Route path="/admin/reports" element={
                <AdminRoute>
                    <AdminReports />
                </AdminRoute>
            } />
            <Route path="/admin/venues" element={
                <AdminRoute>
                    <AdminVenues />
                </AdminRoute>
            } />
            <Route path="/admin/schedules" element={
                <AdminRoute>
                    <AdminScheduleEvent />
                </AdminRoute>
            } />
            <Route path="/admin/tickets" element={
                <AdminRoute>
                    <TicketManagement />
                </AdminRoute>
            } />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}