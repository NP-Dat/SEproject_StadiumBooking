import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './routes/AppRouter'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
