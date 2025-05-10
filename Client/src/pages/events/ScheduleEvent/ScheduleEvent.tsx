import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { eventService } from '../../../apis/services'
import type { Event, EventSchedule } from '../../../types/event'
import styles from './ScheduleEvent.module.css'
import { Login } from '../../core/Auth/Login/Login'
import { Register } from '../../core/Auth/Register/Register'

function ScheduleEvent() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [event, setEvent] = useState<Event | null>(null)
    const [schedules, setSchedules] = useState<EventSchedule[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)

    useEffect(() => {
        async function fetchEventAndSchedules() {
            if (!id) return
            setLoading(true)
            try {
                const eventResponse = await eventService.getEventById(Number(id))
                if (eventResponse.success && eventResponse.data) {
                    const eventData = Array.isArray(eventResponse.data) ? eventResponse.data[0] : eventResponse.data
                    setEvent(eventData)
                } else {
                    setError(eventResponse.error || 'Failed to fetch event details')
                    setLoading(false)
                    return
                }

                const schedulesResponse = await eventService.getEventSchedules(Number(id))
                if (schedulesResponse.success && schedulesResponse.data) {
                    const schedulesData = Array.isArray(schedulesResponse.data) ? schedulesResponse.data : [schedulesResponse.data]
                    setSchedules(schedulesData)
                } else {
                    setError(schedulesResponse.error || 'Failed to fetch schedules')
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching data')
            } finally {
                setLoading(false)
            }
        }
        fetchEventAndSchedules()
    }, [id])

    function handleBookSchedule(scheduleId: number) {
        if (!isAuthenticated) {
            setShowLoginModal(true)
        } else {
            navigate(`/booking/create`, { state: { eventId: id, scheduleId } })
        }
    }

    function handleLoginSuccess() {
        setShowLoginModal(false)
        if (schedules.length > 0) {
            navigate(`/booking/create`, { state: { eventId: id, scheduleId: schedules[0].id } })
        }
    }

    function handleRegisterSuccess() {
        setShowRegisterModal(false)
        if (schedules.length > 0) {
            navigate(`/booking/create`, { state: { eventId: id, scheduleId: schedules[0].id } })
        }
    }

    if (loading) return <div className={styles.loading}>Loading schedules...</div>
    if (error) return <div className={styles.error}>Error: {error}</div>
    if (!event) return <div className={styles.error}>Event not found</div>

    return (
        <div className={styles.scheduleEventContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>{event.name}</h1>
                <p className={styles.description}>{event.description}</p>
            </div>
            <div className={styles.schedulesList}>
                {schedules.map(schedule => (
                    <div key={schedule.id} className={styles.scheduleCard}>
                        <h3>Schedule</h3>
                        <p>Date: {new Date(schedule.date).toLocaleDateString()}</p>
                        <p>Time: {schedule.timeStart} - {schedule.timeEnd}</p>
                        <button className={styles.bookButton} onClick={() => handleBookSchedule(schedule.id)}>
                            Book This Schedule
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

export default ScheduleEvent 