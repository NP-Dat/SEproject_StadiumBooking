import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { scheduleAPI } from '../../../apis/services'
import type { EventSchedule } from '../../../types/event'
import styles from './AdminScheduleEvent.module.css'

export function AdminScheduleEvent() {
    const navigate = useNavigate()
    const { isAdmin } = useAuth()
    const [schedules, setSchedules] = useState<EventSchedule[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if (!isAdmin) {
            navigate('/')
            return
        }

        const fetchSchedules = async () => {
            try {
                setIsLoading(true)
                setError('')
                const response = await scheduleAPI.getAll()
                if (response.success && response.data) {
                    setSchedules(response.data)
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch schedules')
            } finally {
                setIsLoading(false)
            }
        }

        fetchSchedules()
    }, [isAdmin, navigate])

    if (!isAdmin) {
        return null
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Event Schedule Management</h1>
                <button className={styles.addButton} onClick={() => navigate('/admin/schedules/add')}>
                    Add Schedule
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {isLoading ? (
                <div className={styles.loading}>Loading schedules...</div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Event ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((schedule) => (
                                <tr key={schedule.id}>
                                    <td>{schedule.eventId}</td>
                                    <td>{new Date(schedule.date).toLocaleDateString()}</td>
                                    <td>{`${schedule.timeStart} - ${schedule.timeEnd}`}</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[schedule.status]}`}>
                                            {schedule.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                className={styles.actionButton}
                                                onClick={() => navigate(`/admin/schedules/${schedule.id}/edit`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this schedule?')) {
                                                        // Handle delete
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
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