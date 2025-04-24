import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { AppRoutes } from './routes/AppRouter'
import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'
import ScrollToTop from './utils/ScrollToTop'
import styles from './App.module.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className={styles.app}>
          <div className={styles.background}></div>
          <Navbar />
          <main className={styles.main}>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
