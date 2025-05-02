import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Events.module.css';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';

interface Event {
    id: number;
    name: string;
    date: string;
    owner: string;
}

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const navigate = useNavigate();
    const { isAuthenticated, login, register } = useAuth();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                console.log('Fetching events from:', 'http://localhost:8003/api/events/');
                const response = await fetch('http://localhost:8003/api/events/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    console.error('API Response:', {
                        status: response.status,
                        statusText: response.statusText,
                        errorData
                    });
                    throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
                }
                
                const responseData = await response.json();
                console.log('Received events data:', responseData);
                
                if (responseData.success && Array.isArray(responseData.data)) {
                    setEvents(responseData.data);
                } else {
                    throw new Error('Invalid response format from server');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err.message : 'An error occurred while fetching events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleBookEvent = (eventId: number) => {
        if (!isAuthenticated) {
            setSelectedEventId(eventId);
            setShowLoginModal(true);
        } else {
            navigate(`/events/${eventId}`);
        }
    };

    const handleLoginSuccess = async (username: string, password: string) => {
        try {
            await login(username, password);
            setShowLoginModal(false);
            if (selectedEventId) {
                navigate(`/events/${selectedEventId}`);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleRegisterSuccess = async (
        username: string,
        email: string,
        password: string,
        fullname: string,
        birth: string,
        phonenumber: string,
        address: string
    ) => {
        try {
            await register(username, email, password, fullname, birth, phonenumber, address);
            setShowRegisterModal(false);
            if (selectedEventId) {
                navigate(`/events/${selectedEventId}`);
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading events...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    return (
        <div className={styles.eventsContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Upcoming Events</h1>
                <p className={styles.subtitle}>Find and book tickets for the best events in town</p>
            </div>

            <div className={styles.eventsList}>
                {events.map((event) => (
                    <div key={event.id} className={styles.eventCard}>
                        <h2 className={styles.eventTitle}>{event.name}</h2>
                        <p className={styles.eventDate}>{formatDate(event.date)}</p>
                        <p className={styles.eventOwner}>Organized by: {event.owner}</p>
                        <button 
                            className={styles.bookButton}
                            onClick={() => handleBookEvent(event.id)}
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>

            {showLoginModal && (
                <Login
                    onClose={() => setShowLoginModal(false)}
                    onSwitchToRegister={() => {
                        setShowLoginModal(false);
                        setShowRegisterModal(true);
                    }}
                    onLogin={handleLoginSuccess}
                />
            )}

            {showRegisterModal && (
                <Register
                    onClose={() => setShowRegisterModal(false)}
                    onSwitchToLogin={() => {
                        setShowRegisterModal(false);
                        setShowLoginModal(true);
                    }}
                    onRegister={handleRegisterSuccess}
                />
            )}
        </div>
    );
};

export default Events; 