// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ScheduleService } from '../../services/ScheduleService';
// import { TicketTypeService } from '../../services/TicketTypeService';
// import { Schedule } from '../../types/schedule';
// import { TicketType } from '../../types/ticketType';
// import styles from './Schedule.module.css';

// const SchedulePage: React.FC = () => {
//   const { eventId } = useParams<{ eventId: string }>();
//   const [schedules, setSchedules] = useState<Schedule[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
//   const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
//   const [ticketLoading, setTicketLoading] = useState(false);
//   const [ticketError, setTicketError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSchedules = async () => {
//       try {
//         if (eventId) {
//           const response = await ScheduleService.getSchedulesByEventId(eventId);
//           setSchedules(response);
//         }
//       } catch (err) {
//         console.error('Error fetching schedules:', err);
//         setError('Failed to load schedules');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSchedules();
//   }, [eventId]);

//   const handleBookNow = async (scheduleId: number) => {
//     setSelectedScheduleId(scheduleId);
//     setTicketTypes([]);
//     setTicketLoading(true);
//     setTicketError(null);
//     try {
//       const data = await TicketTypeService.getTicketTypesByScheduleId(scheduleId);
//       setTicketTypes(data);
//     } catch (err) {
//       console.error('Error fetching ticket types:', err);
//       setTicketError('Failed to load ticket types.');
//     } finally {
//       setTicketLoading(false);
//     }
//   };

//   if (loading) return <div className={styles.loading}>Loading schedules...</div>;
//   if (error) return <div className={styles.error}>{error}</div>;

//   return (
//     <section className={styles.schedulePage}>
//       <div className={styles.container}>
//         <header className={styles.header}>
//           <h2 className={styles.title}>Available Schedules</h2>
//           <p className={styles.subtitle}>Choose a schedule that fits your availability</p>
//         </header>

//         {schedules.length === 0 ? (
//           <p className={styles.noSchedules}>No schedules available for this event.</p>
//         ) : (
//           <div className={styles.scheduleList}>
//             {schedules.map((schedule) => (
//               <div key={schedule.id} className={styles.scheduleCard}>
//                 <div className={styles.scheduleInfo}>
//                   <h3 className={styles.scheduleDate}>{new Date(schedule.date).toLocaleDateString()}</h3>
//                   <p className={styles.scheduleTime}>
//                     🕒 {schedule.timeStart} - {schedule.timeEnd}
//                   </p>
//                   <p className={styles.scheduleLocation}>🏟 {schedule.stadiumName}</p>
//                   <p className={styles.scheduleEvent}>🎉 {schedule.eventName}</p>
//                 </div>
//                 <button className={styles.bookButton} onClick={() => handleBookNow(schedule.id)}>
//                   Book Now
//                 </button>

//                 {/* Ticket Types Section */}
//                 {selectedScheduleId === schedule.id && (
//                   <div className={styles.ticketTypes}>
//                     {ticketLoading ? (
//                       <p>Loading ticket types...</p>
//                     ) : ticketError ? (
//                       <p className={styles.error}>{ticketError}</p>
//                     ) : ticketTypes.length === 0 ? (
//                       <p>No ticket types available.</p>
//                     ) : (
//                       <ul className={styles.ticketTypeList}>
//                         {ticketTypes.map((ticket) => (
//                           <li key={ticket.id} className={styles.ticketTypeItem}>
//                             <strong>{ticket.name}</strong> — ${ticket.price} ({ticket.availableSeats} seats left)
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default SchedulePage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScheduleService } from '../../services/ScheduleService';
import { TicketTypeService } from '../../services/TicketTypeService';
import { Schedule } from '../../types/schedule';
import { TicketType } from '../../types/ticketType';
import styles from './Schedule.module.css';

const SchedulePage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (eventId) {
          const response = await ScheduleService.getSchedulesByEventId(eventId);
          setSchedules(response);
        }
      } catch (err) {
        console.error('Error fetching schedules:', err);
        setError('Failed to load schedules');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [eventId]);

  const handleBookNow = async (scheduleId: number) => {
    try {
      const response = await TicketTypeService.getTicketTypesByScheduleId(scheduleId);
      setTicketTypes(response);
    } catch (err) {
      console.error('Error fetching ticket types:', err);
      setError('Failed to load ticket types');
    }
  };

  if (loading) return <div className={styles.loading}>Loading schedules...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.schedulePage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Available Event Schedules</h2>
          <p className={styles.subtitle}>Choose a schedule that fits your availability and book now!</p>
        </header>

        {schedules.length === 0 ? (
          <p className={styles.noSchedules}>No schedules available for this event.</p>
        ) : (
            <div className={styles.scheduleList}>
            {schedules.map((schedule) => (
              <div key={schedule.id} className={styles.scheduleCard}>
                <div className={styles.scheduleInfo}>
                  <h3 className={styles.scheduleDate}>{new Date(schedule.date).toLocaleDateString()}</h3>
                  <p className={styles.scheduleTime}>
                    🕒 {schedule.timeStart} - {schedule.timeEnd}
                  </p>
                  <p className={styles.scheduleLocation}>🏟 {schedule.stadiumName}</p>
                  <p className={styles.scheduleEvent}>🎉 {schedule.eventName}</p>
                </div>
                <button
                  className={styles.bookButton}
                  onClick={() => handleBookNow(schedule.id)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SchedulePage;
