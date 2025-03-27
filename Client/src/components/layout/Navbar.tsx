import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                {/* Logo */}
                <div className={styles.logo}>
                    <h1
                        className={styles.logoText}
                        onClick={() => navigate('/')}
                    >
                        Webify <span className={styles.logoAccent}>Co.</span>
                    </h1>
                </div>

                {/* Navigation Links */}
                <div className={styles.navLinks}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/stadiums"
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                        }
                    >
                        Stadiums
                    </NavLink>
                    <NavLink
                        to="/bookings"
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                        }
                    >
                        My Bookings
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                        }
                    >
                        Contact
                    </NavLink>
                </div>

                {/* Modern Search Bar */}
                <input
                    type="search"
                    placeholder="Search events, venues, or teams..."
                    className={styles.searchBar}
                />

                {/* Buttons */}
                <div className={styles.buttonContainer}>
                    <button
                        onClick={() => navigate('/login')}
                        className={styles.loginButton}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className={styles.signUpButton}
                    >
                        Sign Up
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
