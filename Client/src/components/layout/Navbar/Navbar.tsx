import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Navbar.module.css';
import Login from '../../../pages/Auth/Login/Login';
import Register from '../../../pages/Auth/Register/Register';
import UserMenu from './UserMenu/UserMenu';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, login, register } = useAuth();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

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

    const handleLogin = async (email: string, password: string) => {
        try {
            await login(email, password);
            closeLoginModal();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleRegister = async (email: string, password: string, name: string) => {
        try {
            await register(name, email, password);
            closeRegisterModal();
        } catch (error) {
            console.error('Registration failed:', error);
        }
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
                        <h1 className={styles.logoText} onClick={() => navigate('/')}>
                            Stadium<span className={styles.logoAccent}>Book</span>
                        </h1>
                    </div>

                    <div className={styles.navLinks}>
                        <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                            Home
                        </NavLink>
                        <NavLink to="/events" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                            Events
                        </NavLink>
                        <NavLink to="/venues" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                            Venues
                        </NavLink>
                        <NavLink to="/about" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                            About
                        </NavLink>
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

                    <div className={styles.userActions}>
                        {isAuthenticated && user ? (
                            <UserMenu 
                                showProfileMenu={showProfileMenu} 
                                setShowProfileMenu={setShowProfileMenu}
                            />
                        ) : (
                            <div className={styles.buttonContainer}>
                                <button onClick={openLoginModal} className={styles.loginButton}>
                                    Login
                                </button>
                                <button onClick={openRegisterModal} className={styles.signUpButton}>
                                    Register
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </header>

            {loginModalOpen && (
                <Login
                    onClose={closeLoginModal}
                    onSwitchToRegister={openRegisterModal}
                    onLogin={handleLogin}
                />
            )}

            {registerModalOpen && (
                <Register
                    onClose={closeRegisterModal}
                    onSwitchToLogin={openLoginModal}
                    onRegister={handleRegister}
                />
            )}
        </>
    );
};

export default Navbar;
