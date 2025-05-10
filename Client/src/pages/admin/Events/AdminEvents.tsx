import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { eventAPI } from '../../../apis/services'
import type { Event } from '../../../types/event'
import styles from './AdminEvents.module.css'

export function AdminEvents() {
    const navigate = useNavigate()
    const { isAdmin } = useAuth()
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if (!isAdmin) {
            navigate('/')
            return
        }

        const fetchEvents = async () => {
            try {
                setIsLoading(true)
                setError('')
                const response = await eventAPI.getAll()
                if (response.success && response.data) {
                    setEvents(response.data)
                } else {
                    setError('Failed to fetch events')
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch events')
            } finally {
                setIsLoading(false)
            }
        }

        fetchEvents()
    }, [isAdmin, navigate])

    const handleDelete = async (eventId: string) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return

        try {
            setError('')
            const response = await eventAPI.delete(eventId)
            if (response.success) {
                setEvents(events.filter(event => event.id.toString() !== eventId))
            } else {
                setError('Failed to delete event')
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to delete event')
        }
    }

    if (!isAdmin) {
        return null
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Event Management</h1>
                <button 
                    className={styles.addButton}
                    onClick={() => navigate('/admin/events/new')}
                >
                    Create New Event
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {isLoading ? (
                <div className={styles.loading}>Loading events...</div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Stadium</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map(event => (
                                <tr key={event.id}>
                                    <td>{event.id}</td>
                                    <td>{event.name}</td>
                                    <td>{new Date(event.date).toLocaleDateString()}</td>
                                    <td>{event.stadium.name}</td>
                                    <td>{event.status}</td>
                                    <td>
                                        <button
                                            className={styles.actionButton}
                                            onClick={() => navigate(`/admin/events/${event.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={`${styles.actionButton} ${styles.deleteButton}`}
                                            onClick={() => handleDelete(event.id.toString())}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
} 