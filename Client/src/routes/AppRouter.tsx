import { Routes, Route } from 'react-router-dom'
import { privateRoutes } from './privateRoutes'
import { publicRoutes } from './publicRoutes'
import { RouteType } from '../types/routes'
import ProtectedRoute from './ProtectedRoute'
import ZoneSelection from '../pages/ZoneSelection/ZoneSelection'
import BookingForm from '../pages/BookingDetail/BookingDetail'
import Payment from '../pages/Payment/Payment'
import PaymentPage from '../pages/Payment/PaymentPage'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
// Remove or comment out this import
// import Ticket from '../pages/Ticket/Ticket'

export const AppRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map((route: RouteType) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
      
      <Route path="/schedules/event/:eventId/zones" element={<ZoneSelection />} />
      <Route path="/booking/:scheduleId/zone/:zoneId" element={<BookingForm />} />
      <Route path="/payment/:bookingId" element={<Payment />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      {/* Remove or comment out this route */}
      {/* <Route path="/ticket/:id" element={<Ticket />} /> */}
      
      {privateRoutes.map((route: RouteType) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute>
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  )
}