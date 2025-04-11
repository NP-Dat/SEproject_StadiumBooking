import { Routes, Route } from 'react-router-dom'
import { privateRoutes } from './privateRoutes'
import { publicRoutes } from './publicRoutes'
import { RouteType } from './privateRoutes'

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
      
      {privateRoutes.map((route: RouteType) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  )
} 