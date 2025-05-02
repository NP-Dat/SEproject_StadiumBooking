import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthService } from '../../../services/AuthService';
import { EventService } from '../../../services/EventService';
import { Event } from '../../../types/event';
import styles from './Navbar.module.css';
import Login from '../../../pages/Auth/Login/Login';
import Register from '../../../pages/Auth/Register/Register';
import UserMenu from './UserMenu/UserMenu';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, login, register } = AuthService.useAuth();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [searchResults, setSearchResults] = useState<Event[]>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    useEffect(() => {
        const searchEvents = async () => {
            if (searchQuery.trim().length > 0) {
                try {
                    const events = await EventService.getEvents();
                    const filteredEvents = events.filter(event => 
                        event.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setSearchResults(filteredEvents);
                    setShowSearchResults(true);
                } catch (error) {
                    console.error('Error searching events:', error);
                    setSearchResults([]);
                }
            } else {
                setSearchResults([]);
                setShowSearchResults(false);
            }
        };

        const debounceTimer = setTimeout(searchEvents, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

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

    const handleRegister = async (email: string, password: string, username: string, fullname: string, birth: string, phonenumber: string, address: string) => {
        try {
            await register(username, email, password, fullname, birth, phonenumber, address);
            closeRegisterModal();
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setShowSearchResults(false);
        }
    };

    const handleEventClick = (eventId: number) => {
        navigate(`/events/${eventId}`);
        setSearchQuery('');
        setShowSearchResults(false);
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

                    <div className={styles.searchContainer}>
                        <form onSubmit={handleSearch} className={styles.searchForm}>
                            <input
                                type="text"
                                placeholder="Search events..."
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
                        {showSearchResults && searchResults.length > 0 && (
                            <div className={styles.searchResults}>
                                {searchResults.map((event) => (
                                    <div 
                                        key={event.id} 
                                        className={styles.searchResultItem}
                                        onClick={() => handleEventClick(event.id)}
                                    >
                                        <h4>{event.name}</h4>
                                        <p>{EventService.formatDate(event.date)}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

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
