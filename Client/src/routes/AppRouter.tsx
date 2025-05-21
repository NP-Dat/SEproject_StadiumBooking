import { Routes, Route } from 'react-router-dom';
import { privateRoutes } from './privateRoutes';
import { publicRoutes } from './publicRoutes';
import { RouteType } from '../types/routes';
import ProtectedRoute from './ProtectedRoute';
import ZoneSelection from '../pages/ZoneSelection/ZoneSelection';
import BookingForm from '../pages/BookingDetail/BookingDetail';
import Payment from '../pages/Payment/Payment';
import PaymentPage from '../pages/Payment/PaymentPage';
import PaymentSuccess from '../pages/Payment/PaymentSuccess';
import WalletPage from '../pages/Payment/WalletPage';
import AdminDashboard from '../pages/Admin/AdminDashboard'; // Verify this import path

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Admin route - This should be defined BEFORE any potential catch-all routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      
      {/* Public routes */}
      {publicRoutes.map((route: RouteType) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
      
      {/* Direct routes */}
      <Route path="/schedules/event/:eventId/zones" element={<ZoneSelection />} />
      <Route path="/booking/:scheduleId/zone/:zoneId" element={<BookingForm />} />
      <Route path="/payment/:bookingId" element={<Payment />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/wallet" element={<WalletPage />} />
      
      {/* Private routes */}
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
  );
};