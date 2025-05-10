import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { eventAPI, userAPI, bookingAPI } from '../../../apis/services'
import styles from './AdminDashboard.module.css'

export function AdminDashboard() {
    const navigate = useNavigate()
    const { isAdmin, user } = useAuth()
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeEvents: 0,
        totalBookings: 0
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if (!isAdmin) {
            navigate('/')
            return
        }

        const fetchStats = async () => {
            try {
                setIsLoading(true)
                setError('')

                // Fetch all required data in parallel
                const [usersResponse, eventsResponse, bookingsResponse] = await Promise.all([
                    userAPI.getAllUsers(),
                    eventAPI.getAll(),
                    bookingAPI.getUserBookings()
                ])

                if (usersResponse.success && eventsResponse.success && bookingsResponse.success) {
                    setStats({
                        totalUsers: usersResponse.data?.length || 0,
                        activeEvents: eventsResponse.data?.length || 0,
                        totalBookings: bookingsResponse.data?.length || 0
                    })
                } else {
                    setError('Failed to fetch dashboard statistics')
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch dashboard statistics')
            } finally {
                setIsLoading(false)
            }
        }

        fetchStats()
    }, [isAdmin, navigate])

    if (!isAdmin) {
        return null
    }

    const handleManageUsers = () => {
        navigate('/admin/users')
    }

    const handleManageEvents = () => {
        navigate('/admin/events')
    }

    const handleViewReports = () => {
        navigate('/admin/reports')
    }

    return (
        <div className={styles.adminContainer}>
            <div className={styles.adminCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Admin Dashboard</h1>
                    <p className={styles.welcome}>Welcome, {user?.fullName}</p>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                {isLoading ? (
                    <div className={styles.loading}>Loading dashboard statistics...</div>
                ) : (
                    <>
                        <div className={styles.statsContainer}>
                            <div className={styles.statCard}>
                                <h3>Total Users</h3>
                                <p className={styles.statValue}>{stats.totalUsers}</p>
                            </div>
                            <div className={styles.statCard}>
                                <h3>Active Events</h3>
                                <p className={styles.statValue}>{stats.activeEvents}</p>
                            </div>
                            <div className={styles.statCard}>
                                <h3>Total Bookings</h3>
                                <p className={styles.statValue}>{stats.totalBookings}</p>
                            </div>
                        </div>

                        <div className={styles.actionsContainer}>
                            <button 
                                className={styles.actionButton}
                                onClick={handleManageUsers}
                            >
                                Manage Users
                            </button>
                            <button 
                                className={styles.actionButton}
                                onClick={handleManageEvents}
                            >
                                Manage Events
                            </button>
                            <button 
                                className={styles.actionButton}
                                onClick={handleViewReports}
                            >
                                View Reports
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
} 