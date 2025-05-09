import { useState, useEffect } from 'react'
import { ticketAPI } from '../../../services/ticketService'
import type { Ticket, TicketZone, TicketSchedule, TicketEvent } from '../../../types/ticket'
import styles from './TicketManagement.module.css'

export function TicketManagement() {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [zones, setZones] = useState<TicketZone[]>([])
    const [schedules, setSchedules] = useState<TicketSchedule[]>([])
    const [events, setEvents] = useState<TicketEvent[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<'tickets' | 'zones' | 'schedules' | 'events'>('tickets')

    useEffect(() => {
        fetchData()
    }, [activeTab])

    const fetchData = async () => {
        try {
            setIsLoading(true)
            setError(null)

            switch (activeTab) {
                case 'tickets':
                    const ticketsResponse = await ticketAPI.getTickets()
                    if (ticketsResponse.success && ticketsResponse.data) {
                        setTickets(Array.isArray(ticketsResponse.data) ? ticketsResponse.data : [ticketsResponse.data])
                    }
                    break
                case 'zones':
                    const zonesResponse = await ticketAPI.getTicketZones()
                    if (zonesResponse.success && zonesResponse.data) {
                        setZones(Array.isArray(zonesResponse.data) ? zonesResponse.data : [zonesResponse.data])
                    }
                    break
                case 'schedules':
                    const schedulesResponse = await ticketAPI.getTicketSchedules()
                    if (schedulesResponse.success && schedulesResponse.data) {
                        setSchedules(Array.isArray(schedulesResponse.data) ? schedulesResponse.data : [schedulesResponse.data])
                    }
                    break
                case 'events':
                    const eventsResponse = await ticketAPI.getTicketEvents()
                    if (eventsResponse.success && eventsResponse.data) {
                        setEvents(Array.isArray(eventsResponse.data) ? eventsResponse.data : [eventsResponse.data])
                    }
                    break
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteTicket = async (id: number) => {
        try {
            const response = await ticketAPI.deleteTicket(id)
            if (response.success) {
                setTickets(prev => prev.filter(ticket => ticket.id !== id))
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete ticket')
        }
    }

    const handleDeleteZone = async (id: number) => {
        try {
            const response = await ticketAPI.deleteTicketZone(id)
            if (response.success) {
                setZones(prev => prev.filter(zone => zone.id !== id))
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete zone')
        }
    }

    if (isLoading) return <div className={styles.loading}>Loading...</div>
    if (error) return <div className={styles.error}>Error: {error}</div>

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === 'tickets' ? styles.active : ''}`}
                    onClick={() => setActiveTab('tickets')}
                >
                    Tickets
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'zones' ? styles.active : ''}`}
                    onClick={() => setActiveTab('zones')}
                >
                    Zones
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'schedules' ? styles.active : ''}`}
                    onClick={() => setActiveTab('schedules')}
                >
                    Schedules
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'events' ? styles.active : ''}`}
                    onClick={() => setActiveTab('events')}
                >
                    Events
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'tickets' && (
                    <div className={styles.tableContainer}>
                        <h2>Tickets</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User ID</th>
                                    <th>Seat ID</th>
                                    <th>Schedule ID</th>
                                    <th>Zone ID</th>
                                    <th>Cart ID</th>
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
                )}

                {activeTab === 'zones' && (
                    <div className={styles.tableContainer}>
                        <h2>Zones</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Size</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {zones.map(zone => (
                                    <tr key={zone.id}>
                                        <td>{zone.id}</td>
                                        <td>{zone.name}</td>
                                        <td>{zone.size}</td>
                                        <td>${zone.price}</td>
                                        <td>{zone.status}</td>
                                        <td>
                                            <button 
                                                className={styles.deleteButton}
                                                onClick={() => handleDeleteZone(zone.id)}
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

                {activeTab === 'schedules' && (
                    <div className={styles.tableContainer}>
                        <h2>Schedules</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Stadium ID</th>
                                    <th>Event ID</th>
                                    <th>Date</th>
                                    <th>Time Start</th>
                                    <th>Time End</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules.map(schedule => (
                                    <tr key={schedule.id}>
                                        <td>{schedule.id}</td>
                                        <td>{schedule.stadiumId}</td>
                                        <td>{schedule.eventId}</td>
                                        <td>{schedule.date}</td>
                                        <td>{schedule.timeStart}</td>
                                        <td>{schedule.timeEnd}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className={styles.tableContainer}>
                        <h2>Events</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Owner</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(event => (
                                    <tr key={event.id}>
                                        <td>{event.id}</td>
                                        <td>{event.name}</td>
                                        <td>{event.date}</td>
                                        <td>{event.owner}</td>
                                        <td>{event.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
} 