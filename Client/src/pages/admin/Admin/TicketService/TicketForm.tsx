import { useState } from 'react'
import { ticketAPI } from '../../../../services/ticketService'
import type { Ticket, TicketZone } from '../../../../types/ticket'
import styles from './TicketForm.module.css'

interface TicketFormProps {
    onSuccess: () => void
    type: 'ticket' | 'zone'
}

export function TicketForm({ onSuccess, type }: TicketFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [ticketData, setTicketData] = useState<Partial<Ticket>>({
        userId: 0,
        seatId: 0,
        scheduleId: 0,
        zoneId: 0,
        cartId: 0
    })

    const [zoneData, setZoneData] = useState<Partial<TicketZone>>({
        name: '',
        size: 0,
        price: 0,
        status: 'available' as const
    })

    const handleTicketSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            setError(null)

            const response = await ticketAPI.createTicket(ticketData as Ticket)
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

    const handleZoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            setError(null)

            const response = await ticketAPI.createTicketZone(zoneData as TicketZone)
            if (response.success) {
                onSuccess()
                setZoneData({
                    name: '',
                    size: 0,
                    price: 0,
                    status: 'available' as const
                })
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create zone')
        } finally {
            setIsLoading(false)
        }
    }

    if (type === 'ticket') {
        return (
            <form onSubmit={handleTicketSubmit} className={styles.form}>
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

    return (
        <form onSubmit={handleZoneSubmit} className={styles.form}>
            <h3>Add New Zone</h3>
            {error && <div className={styles.error}>{error}</div>}
            
            <div className={styles.formGroup}>
                <label htmlFor="name">Zone Name</label>
                <input
                    type="text"
                    id="name"
                    value={zoneData.name}
                    onChange={(e) => setZoneData(prev => ({ ...prev, name: e.target.value }))}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="size">Size</label>
                <input
                    type="number"
                    id="size"
                    value={zoneData.size || ''}
                    onChange={(e) => setZoneData(prev => ({ ...prev, size: parseInt(e.target.value) }))}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    value={zoneData.price || ''}
                    onChange={(e) => setZoneData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    required
                    step="0.01"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    value={zoneData.status}
                    onChange={(e) => setZoneData(prev => ({ ...prev, status: e.target.value as TicketZone['status'] }))}
                    required
                >
                    <option value="available">Available</option>
                    <option value="sold_out">Sold Out</option>
                    <option value="reserved">Reserved</option>
                </select>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Zone'}
            </button>
        </form>
    )
} 