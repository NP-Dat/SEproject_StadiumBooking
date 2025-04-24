import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import Login from '../../../pages/Auth/Login/Login';
import Register from '../../../pages/Auth/Register/Register';
import { useAuth } from '../../../contexts/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, isAdmin } = useAuth();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const openLoginModal = () => {
        setRegisterModalOpen(false);
        setLoginModalOpen(true);
    };

    const openRegisterModal = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false);
    };

    const closeRegisterModal = () => {
        setRegisterModalOpen(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.logo}>
                        <h1
                            className={styles.logoText}
                            onClick={() => navigate('/')}
                        >
                            Weblify<span className={styles.logoAccent}> Co.</span>
                        </h1>
                    </div>

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
                            to="/events"
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                            }
                        >
                            Events
                        </NavLink>
                        <NavLink
                            to="/venues"
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                            }
                        >
                            Venues
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                            }
                        >
                            About
                        </NavLink>
                        {isAuthenticated && isAdmin && (
                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                                }
                            >
                                Admin Panel
                            </NavLink>
                        )}
                    </div>

                    <form onSubmit={handleSearch} className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search events, venues..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                        <button type="submit" className={styles.searchButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </form>

                    <div className={styles.buttonContainer}>
                        {isAuthenticated ? (
                            <div className={styles.userActions}>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className={styles.profileButton}
                                >
                                    <span className={styles.userName}>
                                        {user?.name} {isAdmin && '(Admin)'}
                                    </span>
                                </button>
                                <button
                                    onClick={() => navigate('/cart')}
                                    className={styles.cartButton}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <>
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
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            {loginModalOpen && (
                <Login
                    onClose={closeLoginModal}
                    onSwitchToRegister={openRegisterModal}
                    onLogin={openLoginModal}
                />
            )}

            {registerModalOpen && (
                <Register
                    onClose={closeRegisterModal}
                    onSwitchToLogin={openLoginModal}
                    onRegister={openRegisterModal}
                />
            )}
        </>
    );
};

export default Navbar;
