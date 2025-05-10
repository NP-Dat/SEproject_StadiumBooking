import { useState, useEffect } from 'react'
import { ticketAPI } from '../../../apis/services'
import type { Ticket } from '../../../types/ticket'
import styles from './TicketManagement.module.css'

export function TicketManagement() {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchTickets()
    }, [])

    const fetchTickets = async () => {
        try {
            setIsLoading(true)
            setError(null)

            const response = await ticketAPI.getAll()
            if (response.success && response.data) {
                setTickets(Array.isArray(response.data) ? response.data : [response.data])
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tickets')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteTicket = async (id: number) => {
        try {
            const response = await ticketAPI.delete(id)
            if (response.success) {
                setTickets(prev => prev.filter(ticket => ticket.id !== id))
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete ticket')
        }
    }

    if (isLoading) return <div className={styles.loading}>Loading tickets...</div>
    if (error) return <div className={styles.error}>Error: {error}</div>

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Ticket Management</h1>
            </div>

            <div className={styles.content}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Seat ID</th>
                                <th>Schedule ID</th>
                                <th>Zone ID</th>
                                <th>Cart ID</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => (
                                <tr key={ticket.id}>
                                    <td>{ticket.id}</td>
                                    <td>{ticket.userId}</td>
                                    <td>{ticket.seatId}</td>
                                    <td>{ticket.scheduleId}</td>
                                    <td>{ticket.zoneId}</td>
                                    <td>{ticket.cartId}</td>
                                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button 
                                            className={styles.deleteButton}
                                            onClick={() => handleDeleteTicket(ticket.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 