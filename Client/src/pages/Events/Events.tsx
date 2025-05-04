import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import { EventService } from '../../services/EventService';
import { Event } from '../../types/event';
import styles from './Events.module.css';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const navigate = useNavigate();
    const { isAuthenticated, login, register } = AuthService.useAuth();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await EventService.getEvents();
                setEvents(eventsData);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err.message : 'An error occurred while fetching events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleBookEvent = (eventId: number) => {
        if (!isAuthenticated) {
            setSelectedEventId(eventId);
            setShowLoginModal(true);
        } else {
            // Navigate directly to schedules instead of event detail
            navigate(`/schedules/event/${eventId}`);
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
                        <p className={styles.eventDate}>{EventService.formatDate(event.date)}</p>
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