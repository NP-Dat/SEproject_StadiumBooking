import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './routes/AppRouter'
import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'
import ScrollToTop from './components/utils/ScrollToTop'
import styles from './App.module.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className={styles.app}>
        <div className={styles.background}></div>
        <Navbar />
        <main className={styles.main}>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
