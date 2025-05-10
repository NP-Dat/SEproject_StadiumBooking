import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ticketAPI } from '../../../apis/services'
import type { BookingTicket } from '../../../types/booking'
import styles from './Ticket.module.css'

function Ticket() {
    const { ticketId } = useParams<{ ticketId: string }>()
    const navigate = useNavigate()
    const [ticket, setTicket] = useState<BookingTicket | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchTicketDetails()
    }, [ticketId])

    const fetchTicketDetails = async () => {
        if (!ticketId) {
            setError('No ticket ID provided')
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError('')
            
            const response = await ticketAPI.getById(parseInt(ticketId))
            if (response.success && response.data) {
                setTicket(response.data as unknown as BookingTicket)
            } else {
                setError(response.error || 'Failed to load ticket details')
            }
        } catch (err) {
            console.error('Error fetching ticket:', err)
            setError(err instanceof Error ? err.message : 'Failed to load ticket details')
        } finally {
            setLoading(false)
        }
    }

    const handleDownload = () => {
        // TODO: Implement ticket download functionality
        console.log('Download ticket')
    }

    const handleBack = () => {
        navigate('/profile')
    }

    if (loading) return <div className={styles.loading}>Loading ticket details...</div>
    if (error) return <div className={styles.error}>{error}</div>
    if (!ticket) return <div className={styles.error}>Ticket not found</div>

    return (
        <div className={styles.ticketContainer}>
            <div className={styles.ticket}>
                <div className={styles.ticketHeader}>
                    <h1>{ticket.eventTitle}</h1>
                    <p className={styles.ticketId}>Ticket #{ticket.ticketId}</p>
                </div>

                <div className={styles.ticketContent}>
                    <div className={styles.eventDetails}>
                        <h2>Event Details</h2>
                        <p><strong>Date:</strong> {new Date(ticket.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {ticket.timeStart} - {ticket.timeEnd}</p>
                        <p><strong>Venue:</strong> {ticket.stadiumName}</p>
                        <p><strong>Zone:</strong> {ticket.zoneName}</p>
                        <p><strong>Seat:</strong> #{ticket.seatID}</p>
                    </div>

                    <div className={styles.purchaseDetails}>
                        <h2>Purchase Details</h2>
                        <p><strong>Price:</strong> ${ticket.price}</p>
                        <p><strong>Purchase Date:</strong> {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className={styles.ticketActions}>
                        <button onClick={handleDownload} className={styles.downloadButton}>
                            Download Ticket
                        </button>
                        <button onClick={handleBack} className={styles.backButton}>
                            Back to Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ticket