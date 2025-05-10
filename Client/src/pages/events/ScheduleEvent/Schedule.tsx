import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { eventService } from '../../../apis/services'
import type { Event, EventSchedule, EventZone } from '../../../types/event'
import styles from './Schedule.module.css'
import { Login } from '../../core/Auth/Login/Login'
import { Register } from '../../core/Auth/Register/Register'

function Schedule() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [event, setEvent] = useState<Event | null>(null)
    const [schedules, setSchedules] = useState<EventSchedule[]>([])
    const [selectedSchedule, setSelectedSchedule] = useState<EventSchedule | null>(null)
    const [zones, setZones] = useState<EventZone[]>([])
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
                    if (schedulesData.length > 0) {
                        setSelectedSchedule(schedulesData[0])
                    }
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

    useEffect(() => {
        async function fetchZones() {
            if (!selectedSchedule) return
            try {
                const zonesResponse = await eventService.getEventZones(selectedSchedule.id)
                if (zonesResponse.success && zonesResponse.data) {
                    const zonesData = Array.isArray(zonesResponse.data) ? zonesResponse.data : [zonesResponse.data]
                    setZones(zonesData)
                } else {
                    setError(zonesResponse.error || 'Failed to fetch zones')
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching zones')
            }
        }
        fetchZones()
    }, [selectedSchedule])

    function handleScheduleSelect(schedule: EventSchedule) {
        setSelectedSchedule(schedule)
    }

    function handleBookZone(zoneId: number) {
        if (!isAuthenticated) {
            setShowLoginModal(true)
        } else {
            navigate(`/booking/create`, { state: { eventId: id, scheduleId: selectedSchedule?.id, zoneId } })
        }
    }

    function handleLoginSuccess() {
        setShowLoginModal(false)
        if (selectedSchedule && zones.length > 0) {
            navigate(`/booking/create`, { state: { eventId: id, scheduleId: selectedSchedule.id, zoneId: zones[0].id } })
        }
    }

    function handleRegisterSuccess() {
        setShowRegisterModal(false)
        if (selectedSchedule && zones.length > 0) {
            navigate(`/booking/create`, { state: { eventId: id, scheduleId: selectedSchedule.id, zoneId: zones[0].id } })
        }
    }

    if (loading) return <div className={styles.loading}>Loading schedules...</div>
    if (error) return <div className={styles.error}>Error: {error}</div>
    if (!event) return <div className={styles.error}>Event not found</div>

    return (
        <div className={styles.scheduleContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>{event.name}</h1>
                <p className={styles.description}>{event.description}</p>
            </div>
            <div className={styles.schedulesSection}>
                <h2>Available Schedules</h2>
                <div className={styles.schedulesList}>
                    {schedules.map(schedule => (
                        <div
                            key={schedule.id}
                            className={`${styles.scheduleCard} ${selectedSchedule?.id === schedule.id ? styles.selected : ''}`}
                            onClick={() => handleScheduleSelect(schedule)}
                        >
                            <p>Date: {new Date(schedule.date).toLocaleDateString()}</p>
                            <p>Time: {schedule.timeStart} - {schedule.timeEnd}</p>
                        </div>
                    ))}
                </div>
            </div>
            {selectedSchedule && (
                <div className={styles.zonesSection}>
                    <h2>Available Zones</h2>
                    <div className={styles.zonesList}>
                        {zones.map(zone => (
                            <div key={zone.id} className={styles.zoneCard}>
                                <h3>{zone.name}</h3>
                                <p>Price: ${zone.price}</p>
                                <p>Available Seats: {zone.size}</p>
                                <button
                                    className={styles.bookButton}
                                    onClick={() => handleBookZone(zone.id)}
                                    disabled={zone.status === 'sold_out'}
                                >
                                    {zone.status === 'sold_out' ? 'Sold Out' : 'Book Now'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {showLoginModal && (
                <Login onClose={() => setShowLoginModal(false)} onSwitchToRegister={() => { setShowLoginModal(false); setShowRegisterModal(true) }} onLogin={handleLoginSuccess} />
            )}
            {showRegisterModal && (
                <Register onClose={() => setShowRegisterModal(false)} onSwitchToLogin={() => { setShowRegisterModal(false); setShowLoginModal(true) }} onRegister={handleRegisterSuccess} />
            )}
        </div>
    )
}

export default Schedule
