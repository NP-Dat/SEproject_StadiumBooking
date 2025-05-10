import { useState } from 'react'
import { ticketAPI } from '../../../apis/services'
import type { Ticket } from '../../../types/ticket'
import styles from './TicketForm.module.css'

interface TicketFormProps {
    onSuccess: () => void
}

export function TicketForm({ onSuccess }: TicketFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [ticketData, setTicketData] = useState<Partial<Ticket>>({
        userId: 0,
        seatId: 0,
        scheduleId: 0,
        zoneId: 0,
        cartId: 0
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            setError(null)

            const response = await ticketAPI.create({
                ...ticketData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            } as Omit<Ticket, 'id'>)
            
            if (response.success) {
                onSuccess()
                setTicketData({
                    userId: 0,
                    seatId: 0,
                    scheduleId: 0,
                    zoneId: 0,
                    cartId: 0
                })
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create ticket')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Add New Ticket</h3>
            {error && <div className={styles.error}>{error}</div>}
            
            <div className={styles.formGroup}>
                <label htmlFor="userId">User ID</label>
                <input
                    type="number"
                    id="userId"
                    value={ticketData.userId || ''}
                    onChange={(e) => setTicketData(prev => ({ ...prev, userId: parseInt(e.target.value) }))}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="seatId">Seat ID</label>
                <input
                    type="number"
                    id="seatId"
                    value={ticketData.seatId || ''}
                    onChange={(e) => setTicketData(prev => ({ ...prev, seatId: parseInt(e.target.value) }))}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="scheduleId">Schedule ID</label>
                <input
                    type="number"
                    id="scheduleId"
                    value={ticketData.scheduleId || ''}
                    onChange={(e) => setTicketData(prev => ({ ...prev, scheduleId: parseInt(e.target.value) }))}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="zoneId">Zone ID</label>
                <input
                    type="number"
                    id="zoneId"
                    value={ticketData.zoneId || ''}
                    onChange={(e) => setTicketData(prev => ({ ...prev, zoneId: parseInt(e.target.value) }))}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="cartId">Cart ID</label>
                <input
                    type="number"
                    id="cartId"
                    value={ticketData.cartId || ''}
                    onChange={(e) => setTicketData(prev => ({ ...prev, cartId: parseInt(e.target.value) }))}
                    required
                />
            </div>

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Ticket'}
            </button>
        </form>
    )
} 