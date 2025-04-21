import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './routes/AppRouter'
import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'
import styles from './App.module.css'

function App() {
  return (
    <Router>
      <div className={styles.app}>
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
