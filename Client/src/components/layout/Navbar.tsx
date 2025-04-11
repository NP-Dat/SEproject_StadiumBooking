import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import AuthModals from '../auth/AuthModals';

const Navbar = () => {
    const navigate = useNavigate();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const openLoginModal = () => {
        setRegisterModalOpen(false);
        setLoginModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    const openRegisterModal = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                {/* Logo */}
                <div className={styles.logo}>
                    <h1
                        className={styles.logoText}
                        onClick={() => {
                            navigate('/');
                            closeMobileMenu();
                        }}
                    >
                        Webify <span className={styles.logoAccent}>Co.</span>
                    </h1>
                </div>

                {/* Navigation Links - Desktop */}
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

                {/* Modern Search Bar - Desktop */}
                <input
                    type="search"
                    placeholder="Search events, venues, or teams..."
                    className={styles.searchBar}
                />

                {/* Buttons - Desktop */}
                <div className={styles.buttonContainer}>
                    <button
                        onClick={openLoginModal}
                        className={styles.loginButton}
                    >
                        Login
                    </button>
                    <button
                        onClick={openRegisterModal}
                        className={styles.signUpButton}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Hamburger Menu - Mobile */}
                <div className={styles.hamburger} onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <div className={styles.mobileNavLinks}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                        }
                        onClick={closeMobileMenu}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/stadiums"
                        className={({ isActive }) =>
                            `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                        }
                        onClick={closeMobileMenu}
                    >
                        Stadiums
                    </NavLink>
                    <NavLink
                        to="/bookings"
                        className={({ isActive }) =>
                            `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                        }
                        onClick={closeMobileMenu}
                    >
                        My Bookings
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                        }
                        onClick={closeMobileMenu}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                        }
                        onClick={closeMobileMenu}
                    >
                        Contact
                    </NavLink>
                </div>
                
                {/* Mobile Search */}
                <div className={styles.mobileSearch}>
                    <input
                        type="search"
                        placeholder="Search events, venues, or teams..."
                        className={styles.searchBar}
                        style={{ width: '100%' }}
                    />
                </div>
                
                {/* Mobile Buttons */}
                <div className={styles.mobileButtons}>
                    <button
                        onClick={openLoginModal}
                        className={styles.loginButton}
                        style={{ width: '100%' }}
                    >
                        Login
                    </button>
                    <button
                        onClick={openRegisterModal}
                        className={styles.signUpButton}
                        style={{ width: '100%' }}
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Auth Modals */}
            <AuthModals
                loginOpen={loginModalOpen}
                registerOpen={registerModalOpen}
                onCloseLogin={() => setLoginModalOpen(false)}
                onCloseRegister={() => setRegisterModalOpen(false)}
                onSwitchToRegister={() => {
                    setLoginModalOpen(false);
                    setRegisterModalOpen(true);
                }}
                onSwitchToLogin={() => {
                    setRegisterModalOpen(false);
                    setLoginModalOpen(true);
                }}
            />
        </header>
    );
};

export default Navbar;
