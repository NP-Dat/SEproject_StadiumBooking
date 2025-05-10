import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { eventService } from '../../../apis/services';
import type { Event } from '../../../types/event';
import styles from './Events.module.css';
import { Login } from '../../core/Auth/Login/Login';
import { Register } from '../../core/Auth/Register/Register';

function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        async function fetchEvents() {
            setLoading(true);
            try {
                const response = await eventService.getAllEvents();
                if (response.success && response.data) {
                    setEvents(Array.isArray(response.data) ? response.data : [response.data]);
                } else setError(response.error || 'Failed to fetch events');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching events');
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    function handleBookEvent(eventId: number) {
        if (!isAuthenticated) {
            setSelectedEventId(eventId);
            setShowLoginModal(true);
        } else {
            navigate(`/events/${eventId}/schedules`);
        }
    }

    function handleLoginSuccess() {
        setShowLoginModal(false);
        if (selectedEventId) navigate(`/events/${selectedEventId}/schedules`);
    }

    function handleRegisterSuccess() {
        setShowRegisterModal(false);
        if (selectedEventId) navigate(`/events/${selectedEventId}/schedules`);
    }

    if (loading) return <div className={styles.loading}>Loading events...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
        <div className={styles.eventsContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Upcoming Events</h1>
                <p className={styles.subtitle}>Find and book tickets for the best events in town</p>
            </div>
            <div className={styles.eventsList}>
                {events.map(event => (
                    <div key={event.id} className={styles.eventCard}>
                        <h2 className={styles.eventTitle}>{event.name}</h2>
                        <p className={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</p>
                        <p className={styles.eventDescription}>{event.description}</p>
                        {event.stadium && (
                            <p className={styles.eventVenue}>Venue: {event.stadium.name}</p>
                        )}
                        <button className={styles.bookButton} onClick={() => handleBookEvent(event.id)}>
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
            {showLoginModal && (
                <Login onClose={() => setShowLoginModal(false)} onSwitchToRegister={() => { setShowLoginModal(false); setShowRegisterModal(true) }} onLogin={handleLoginSuccess} />
            )}
            {showRegisterModal && (
                <Register onClose={() => setShowRegisterModal(false)} onSwitchToLogin={() => { setShowRegisterModal(false); setShowLoginModal(true) }} onRegister={handleRegisterSuccess} />
            )}
        </div>
    );
}

export default Events;