import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { eventService } from '../../../apis/services'
import type { Event } from '../../../types/event'
import styles from './Stadium.module.css'
import { Login } from '../../core/Auth/Login/Login'
import { Register } from '../../core/Auth/Register/Register'

function Stadium() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null)

    useEffect(() => {
        async function fetchStadiumEvents() {
            if (!id) return
            setLoading(true)
            try {
                const response = await eventService.getEventsByStadiumId(Number(id))
                if (response.success && response.data) {
                    setEvents(Array.isArray(response.data) ? response.data : [response.data])
                } else setError(response.error || 'Failed to fetch stadium events')
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching stadium events')
            } finally {
                setLoading(false)
            }
        }
        fetchStadiumEvents()
    }, [id])

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

    if (loading) return <div className={styles.loading}>Loading stadium events...</div>
    if (error) return <div className={styles.error}>Error: {error}</div>

    return (
        <div className={styles.stadiumContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Stadium Events</h1>
                <p className={styles.subtitle}>Find and book tickets for events at this stadium</p>
            </div>
            <div className={styles.eventsList}>
                {events.map(event => (
                    <div key={event.id} className={styles.eventCard}>
                        <h2 className={styles.eventTitle}>{event.name}</h2>
                        <p className={styles.eventDate}>{new Date(event.date).toLocaleDateString()}</p>
                        <p className={styles.eventDescription}>{event.description}</p>
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

export default Stadium