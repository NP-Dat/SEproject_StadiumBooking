import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { venueAPI } from '../../../apis/services'
import type { Venue } from '../../../types/venue'
import styles from './AdminVenues.module.css'

export function AdminVenues() {
    const navigate = useNavigate()
    const { isAdmin } = useAuth()
    const [venues, setVenues] = useState<Venue[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>('')
    const [isDeleting, setIsDeleting] = useState<string | null>(null)

    const fetchVenues = useCallback(async () => {
        try {
            setIsLoading(true)
            setError('')
            const response = await venueAPI.getAll()
            if (response.success && response.data) {
                setVenues(response.data)
            } else {
                setError('Failed to fetch venues')
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch venues')
        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleDelete = useCallback(async (venueId: string) => {
        if (!window.confirm('Are you sure you want to delete this venue?')) return

        try {
            setIsDeleting(venueId)
            const response = await venueAPI.delete(venueId)
            if (response.success) {
                setVenues(prevVenues => prevVenues.filter(venue => venue.id !== venueId))
            } else {
                setError('Failed to delete venue')
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to delete venue')
        } finally {
            setIsDeleting(null)
        }
    }, [])

    useEffect(() => {
        if (!isAdmin) {
            navigate('/')
            return
        }
        fetchVenues()
    }, [isAdmin, navigate, fetchVenues])

    if (!isAdmin) return null

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Venues Management</h1>
                <button 
                    className={styles.addButton} 
                    onClick={() => navigate('/admin/venues/add')}
                    aria-label="Add new venue"
                >
                    Add Venue
                </button>
            </div>

            {error && (
                <div className={styles.error} role="alert">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className={styles.loading} role="status">
                    <span>Loading venues...</span>
                </div>
            ) : venues.length === 0 ? (
                <div className={styles.empty} role="status">
                    <span>No venues found</span>
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Location</th>
                                <th scope="col">Capacity</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {venues.map((venue) => (
                                <tr key={venue.id}>
                                    <td>{venue.name}</td>
                                    <td>{venue.location}</td>
                                    <td>{venue.capacity.toLocaleString()}</td>
                                    <td>
                                        <span 
                                            className={`${styles.status} ${styles[venue.status.toLowerCase()]}`}
                                            role="status"
                                        >
                                            {venue.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                className={styles.actionButton}
                                                onClick={() => navigate(`/admin/venues/${venue.id}/edit`)}
                                                aria-label={`Edit ${venue.name}`}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                                onClick={() => handleDelete(venue.id)}
                                                disabled={isDeleting === venue.id}
                                                aria-label={`Delete ${venue.name}`}
                                            >
                                                {isDeleting === venue.id ? 'Deleting...' : 'Delete'}
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