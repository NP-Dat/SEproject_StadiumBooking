import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Event.module.css'
import Button from '../../../../../components/ui/Button/Button'
import { eventAPI } from '../../../../../apis/services'
import type { Event } from '../../../../../types/event'

function EventSection() {
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchEvents = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await eventAPI.getAll()
            if (response.success && response.data) {
                // Take only the first 6 upcoming events
                const upcomingEvents = response.data
                    .filter(event => event.status === 'upcoming')
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 6)
                setEvents(upcomingEvents)
            } else {
                setError('Failed to load events')
            }
        } catch (err) {
            console.error('Error fetching events:', err)
            setError(err instanceof Error ? err.message : 'Failed to load events')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchEvents()
    }, [fetchEvents])

    const handleEventClick = useCallback((eventId: number) => {
        navigate(`/schedules/event/${eventId}`)
    }, [navigate])

    const formatDate = useCallback((dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }, [])

    if (isLoading) {
        return (
            <section className={styles.events}>
                <div className={styles.container}>
                    <div className={styles.loading} role="status">
                        <span>Loading featured events...</span>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className={styles.events}>
                <div className={styles.container}>
                    <div className={styles.error} role="alert">
                        {error}
                    </div>
                </div>
            </section>
        )
    }

    if (events.length === 0) {
        return (
            <section className={styles.events}>
                <div className={styles.container}>
                    <div className={styles.empty} role="status">
                        <span>No upcoming events found</span>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className={styles.events}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Upcoming Events</h2>
                    <p className={styles.subtitle}>
                        Discover exciting sports events and secure your seats for the best matches
                    </p>
                </div>

                <div className={styles.eventsGrid}>
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className={styles.eventCard}
                            onClick={() => handleEventClick(event.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleEventClick(event.id)
                                }
                            }}
                        >
                            <div className={styles.eventContent}>
                                <h3 className={styles.eventTitle}>{event.name}</h3>
                                <div className={styles.eventDate}>
                                    {formatDate(event.date)}
                                </div>
                                {event.description && (
                                    <p className={styles.eventDescription}>
                                        {event.description.length > 100 
                                            ? `${event.description.substring(0, 100)}...` 
                                            : event.description}
                                    </p>
                                )}
                                <div className={styles.eventDetails}>
                                    {event.stadium && (
                                        <div className={styles.eventLocation}>
                                            <svg
                                                className={styles.locationIcon}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            {event.stadium.name}
                                        </div>
                                    )}
                                    <Button
                                        variant="primary"
                                        size="small"
                                        className={styles.bookButton}
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation()
                                            handleEventClick(event.id)
                                        }}
                                    >
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EventSection
