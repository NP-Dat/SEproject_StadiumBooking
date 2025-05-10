import { useState, useEffect, useCallback } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { EventService } from '../../../services/EventService';
import type { Event } from '../../../types/event';
import type { LoginCredentials, RegisterCredentials } from '../../../types/auth';
import styles from './Navbar.module.css';
import { Login } from '../../../pages/core/Auth/Login/Login';
import { Register } from '../../../pages/core/Auth/Register/Register';
import UserMenu from './UserMenu/UserMenu';

interface SearchResult {
    id: number;
    name: string;
    date: string;
}

function Navbar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, login, register } = useAuth();
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const searchEvents = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        try {
            setIsSearching(true);
            setSearchError(null);
            const events = await EventService.getEvents();
            const filteredEvents = events
                .filter(event => 
                    event.name.toLowerCase().includes(query.toLowerCase())
                )
                .map(event => ({
                    id: event.id,
                    name: event.name,
                    date: EventService.formatDate(event.date)
                }));
            setSearchResults(filteredEvents);
            setShowSearchResults(true);
        } catch (error) {
            console.error('Error searching events:', error);
            setSearchError('Failed to search events. Please try again.');
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }, []);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            searchEvents(searchQuery);
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery, searchEvents]);

    const handleModalToggle = useCallback((modal: 'login' | 'register', isOpen: boolean) => {
        setLoginModalOpen(modal === 'login' && isOpen);
        setRegisterModalOpen(modal === 'register' && isOpen);
    }, []);

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
            <header className={styles.header} role="banner">
                <nav className={styles.nav} role="navigation" aria-label="Main navigation">
                    <div className={styles.logo}>
                        <h1 className={styles.logoText}>
                            <button 
                                onClick={() => navigate('/')}
                                className={styles.logoButton}
                                aria-label="Go to home page"
                            >
                                Stadium<span className={styles.logoAccent}>Book</span>
                            </button>
                        </h1>
                    </div>

                    <div className={styles.navLinks}>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                            aria-current="page"
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/events" 
                            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                        >
                            Events
                        </NavLink>
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                        >
                            About
                        </NavLink>
                    </div>

                    <div className={styles.searchContainer}>
                        <form onSubmit={handleSearch} className={styles.searchForm} role="search">
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                                aria-label="Search events"
                                aria-expanded={showSearchResults}
                                aria-controls="search-results"
                            />
                            <button 
                                type="submit" 
                                className={styles.searchButton}
                                aria-label="Search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </form>
                        {showSearchResults && (
                            <div 
                                id="search-results"
                                className={styles.searchResults}
                                role="listbox"
                            >
                                {isSearching ? (
                                    <div className={styles.searchLoading}>Searching...</div>
                                ) : searchError ? (
                                    <div className={styles.searchError}>{searchError}</div>
                                ) : searchResults.length > 0 ? (
                                    searchResults.map((event) => (
                                        <div 
                                            key={event.id} 
                                            className={styles.searchResultItem}
                                            onClick={() => handleEventClick(event.id)}
                                            role="option"
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    handleEventClick(event.id);
                                                }
                                            }}
                                        >
                                            <h4>{event.name}</h4>
                                            <p>{event.date}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.noResults}>No events found</div>
                                )}
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
                                <button 
                                    onClick={() => handleModalToggle('login', true)} 
                                    className={styles.loginButton}
                                    aria-label="Open login modal"
                                >
                                    Login
                                </button>
                                <button 
                                    onClick={() => handleModalToggle('register', true)} 
                                    className={styles.signUpButton}
                                    aria-label="Open registration modal"
                                >
                                    Register
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </header>

            {loginModalOpen && (
                <Login
                    onClose={() => handleModalToggle('login', false)}
                    onSwitchToRegister={() => handleModalToggle('register', true)}
                />
            )}

            {registerModalOpen && (
                <Register
                    onClose={() => handleModalToggle('register', false)}
                    onSwitchToLogin={() => handleModalToggle('login', true)}
                />
            )}
        </>
    );
}

export default Navbar;
