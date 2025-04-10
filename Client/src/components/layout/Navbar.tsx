import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

// Navbar component with responsive design
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Track scroll position for navbar styling changes
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Check if current route matches the link
  const isActiveRoute = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <Link to="/" className={styles.logoText}>
                Stadium Booking
              </Link>
            </div>
            <div className={styles.navigation}>
              <Link 
                to="/" 
                className={`${styles.navLink} ${isActiveRoute('/') ? styles.navLinkActive : styles.navLinkDefault}`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`${styles.navLink} ${isActiveRoute('/about') ? styles.navLinkActive : styles.navLinkDefault}`}
              >
                About
              </Link>
              <Link 
                to="/events" 
                className={`${styles.navLink} ${isActiveRoute('/events') ? styles.navLinkActive : styles.navLinkDefault}`}
              >
                Events
              </Link>
              <Link 
                to="/venues" 
                className={`${styles.navLink} ${isActiveRoute('/venues') ? styles.navLinkActive : styles.navLinkDefault}`}
              >
                Venues
              </Link>
            </div>
          </div>
          
          <div className={styles.authSection}>
            <div className={styles.authLinks}>
              <Link to="/login" className={styles.authLink}>
                Login
              </Link>
              <Link to="/register" className={styles.signUpLink}>
                Sign Up
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button className={styles.menuButton} onClick={toggleMobileMenu} aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              {isMobileMenuOpen ? (
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <Link 
          to="/" 
          className={`${styles.mobileNavLink} ${isActiveRoute('/') ? styles.mobileNavLinkActive : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className={`${styles.mobileNavLink} ${isActiveRoute('/about') ? styles.mobileNavLinkActive : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          About
        </Link>
        <Link 
          to="/events" 
          className={`${styles.mobileNavLink} ${isActiveRoute('/events') ? styles.mobileNavLinkActive : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Events
        </Link>
        <Link 
          to="/venues" 
          className={`${styles.mobileNavLink} ${isActiveRoute('/venues') ? styles.mobileNavLinkActive : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Venues
        </Link>
        <div style={{ marginTop: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
          <Link 
            to="/login" 
            className={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className={`${styles.mobileNavLink} ${styles.mobileNavLinkActive}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
