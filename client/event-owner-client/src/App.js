// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/Profile';
import StadiumList from './components/stadiums/StadiumList';
import CreateEvent from './components/events/CreateEvent';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/stadiums" 
            element={
              <ProtectedRoute>
                <StadiumList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-event/:stadiumId" 
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;