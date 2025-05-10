import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Core Pages
import Home from '../pages/core/Home/Home'
import About from '../pages/core/About/About'
import Login from '../pages/core/Auth/Login/Login'
import Register from '../pages/core/Auth/Register/Register'

// Booking Pages
import Booking from '../pages/booking/Booking/Booking'
import ZoneSelection from '../pages/booking/ZoneSelection/ZoneSelection'
import Payment from '../pages/booking/Payment/Payment'
import Cart from '../pages/booking/Cart/Cart'
import Confirmation from '../pages/booking/Confirmation/Confirmation'

// User Pages
import Profile from '../pages/user/Profile/Profile'
import UserBookings from '../pages/user/UserBookings/UserBookings'
import Ticket from '../pages/user/Ticket/Ticket'

// Admin Pages
import AdminPanel from '../pages/admin/AdminPanel/AdminPanel'

// Event Pages
import Events from '../pages/events/Events/Events'
import Stadium from '../pages/events/Stadium/Stadium'
import Venues from '../pages/events/Venues/Venues'
import ScheduleEvent from '../pages/events/ScheduleEvent/ScheduleEvent'

// Support Pages
import Support from '../pages/support/Support/Support'

// Error Pages
import NotFound from '../pages/core/NotFound/NotFound'

function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
    </div>
  )
}

export function AppRoutes() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()

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
      <Route path="/stadium" element={<Stadium />} />
      <Route path="/support" element={<Support />} />

      {/* Protected Routes */}
      {isAuthenticated && (
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<UserBookings />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/zone-selection" element={<ZoneSelection />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </>
      )}

      {/* Admin Routes */}
      {isAdmin && (
        <>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/schedule-event" element={<ScheduleEvent />} />
        </>
      )}

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}