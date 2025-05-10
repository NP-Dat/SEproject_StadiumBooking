import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { eventService } from '../../../apis/services';
import type { Event } from '../../../types/event';
import styles from './EventDetail.module.css';
import { Login } from '../../core/Auth/Login/Login';
import { Register } from '../../core/Auth/Register/Register';

function EventDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        async function fetchEvent() {
            if (!id) return;
            setLoading(true);
            try {
                const response = await eventService.getEventById(Number(id));
                if (response.success && response.data) {
                    const eventData = Array.isArray(response.data) ? response.data[0] : response.data;
                    setEvent(eventData);
                } else setError(response.error || 'Failed to fetch event details');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching event details');
            } finally {
                setLoading(false);
            }
        }
        fetchEvent();
    }, [id]);

    function handleBookEvent() {
        if (!isAuthenticated) {
            setShowLoginModal(true);
        } else {
            navigate(`/events/${id}/schedules`);
        }
    }

    function handleLoginSuccess() {
        setShowLoginModal(false);
        navigate(`/events/${id}/schedules`);
    }

    function handleRegisterSuccess() {
        setShowRegisterModal(false);
        navigate(`/events/${id}/schedules`);
    }

    if (loading) return <div className={styles.loading}>Loading event details...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!event) return <div className={styles.error}>Event not found</div>;

    return (
        <div className={styles.eventDetailContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>{event.name}</h1>
                <p className={styles.date}>{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div className={styles.content}>
                <p className={styles.description}>{event.description}</p>
                {event.stadium && (
                    <p className={styles.venue}>Venue: {event.stadium.name}</p>
                )}
                <button className={styles.bookButton} onClick={handleBookEvent}>
                    Book Now
                </button>
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

export default EventDetail;
