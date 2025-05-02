import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { privateRoutes } from './privateRoutes';

// Combine all routes
const allRoutes = [...publicRoutes, ...privateRoutes];

const router = createBrowserRouter(allRoutes);

export default router;