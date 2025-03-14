import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/UI/Loader';
import PublicRoutes from "./routes/PublicRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import NotFound from "./pages/404/NotFound";
import Home from './pages/home/Home';
// Lazy load pages

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
