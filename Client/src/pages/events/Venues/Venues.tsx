import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { eventService } from '../../../apis/services'
import type { Event } from '../../../types/event'
import styles from './Venues.module.css'
import { Login } from '../../core/Auth/Login/Login'
import { Register } from '../../core/Auth/Register/Register'

function Venues() {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null)

    useEffect(() => {
        async function fetchEvents() {
            setLoading(true)
            try {
                const response = await eventService.getAllEvents()
                if (response.success && response.data) {
                    setEvents(Array.isArray(response.data) ? response.data : [response.data])
                } else setError(response.error || 'Failed to fetch events')
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching events')
            } finally {
                setLoading(false)
            }
        }
        fetchEvents()
    }, [])

    function handleBookEvent(eventId: number) {
        if (!isAuthenticated) {
            setSelectedEventId(eventId)
            setShowLoginModal(true)
        } else {
            navigate(`/events/${eventId}/schedules`)
        }
    }

    function handleLoginSuccess() {
        setShowLoginModal(false)
        if (selectedEventId) navigate(`/events/${selectedEventId}/schedules`)
    }

    function handleRegisterSuccess() {
        setShowRegisterModal(false)
        if (selectedEventId) navigate(`/events/${selectedEventId}/schedules`)
    }

    if (loading) return <div className={styles.loading}>Loading venues...</div>
    if (error) return <div className={styles.error}>Error: {error}</div>

    return (
        <div className={styles.venuesContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Available Venues</h1>
                <p className={styles.subtitle}>Find and book tickets for events at our venues</p>
            </div>
            <div className={styles.venuesList}>
                {events.map(event => (
                    <div key={event.id} className={styles.venueCard}>
                        <h2 className={styles.venueTitle}>{event.name}</h2>
                        <p className={styles.venueDate}>{new Date(event.date).toLocaleDateString()}</p>
                        <p className={styles.venueDescription}>{event.description}</p>
                        {event.stadium && (
                            <p className={styles.venueLocation}>Location: {event.stadium.name}</p>
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
    )
}

export default Venues