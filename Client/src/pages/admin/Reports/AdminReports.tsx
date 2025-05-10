import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { bookingAPI, eventAPI } from '../../../apis/services'
import styles from './AdminReports.module.css'

interface ReportStats {
    totalBookings: number
    totalEvents: number
    bookingsByStatus: {
        confirmed: number
        pending: number
        cancelled: number
    }
}

export function AdminReports() {
    const navigate = useNavigate()
    const { isAdmin } = useAuth()
    const [stats, setStats] = useState<ReportStats>({
        totalBookings: 0,
        totalEvents: 0,
        bookingsByStatus: {
            confirmed: 0,
            pending: 0,
            cancelled: 0
        }
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if (!isAdmin) {
            navigate('/')
            return
        }

        const fetchData = async () => {
            try {
                setIsLoading(true)
                setError('')

                // Fetch bookings and events
                const [bookingsResponse, eventsResponse] = await Promise.all([
                    bookingAPI.getUserBookings(),
                    eventAPI.getAll()
                ])

                if (bookingsResponse.success && bookingsResponse.data) {
                    const bookings = bookingsResponse.data
                    const confirmed = bookings.filter(b => b.status === 'confirmed').length
                    const pending = bookings.filter(b => b.status === 'pending').length
                    const cancelled = bookings.filter(b => b.status === 'cancelled').length

                    setStats(prev => ({
                        ...prev,
                        totalBookings: bookings.length,
                        bookingsByStatus: {
                            confirmed,
                            pending,
                            cancelled
                        }
                    }))
                }

                if (eventsResponse.success && eventsResponse.data) {
                    setStats(prev => ({
                        ...prev,
                        totalEvents: eventsResponse.data.length
                    }))
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch data')
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [isAdmin, navigate])

    if (!isAdmin) {
        return null
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Reports & Analytics</h1>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {isLoading ? (
                <div className={styles.loading}>Loading reports...</div>
            ) : (
                <>
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <h3>Total Bookings</h3>
                            <p className={styles.statValue}>{stats.totalBookings}</p>
                        </div>
                        <div className={styles.statCard}>
                            <h3>Total Events</h3>
                            <p className={styles.statValue}>{stats.totalEvents}</p>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Booking Status Distribution</h2>
                        <div className={styles.statusGrid}>
                            <div className={styles.statusCard}>
                                <h3>Confirmed</h3>
                                <p className={styles.statusValue}>{stats.bookingsByStatus.confirmed}</p>
                            </div>
                            <div className={styles.statusCard}>
                                <h3>Pending</h3>
                                <p className={styles.statusValue}>{stats.bookingsByStatus.pending}</p>
                            </div>
                            <div className={styles.statusCard}>
                                <h3>Cancelled</h3>
                                <p className={styles.statusValue}>{stats.bookingsByStatus.cancelled}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
} 