import React, { useState } from 'react';
import { Event, Schedule } from '../types/admin';
import {
  createEvent,
  updateEvent,
  deleteEvent,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '../services/adminService';

const AdminDashboard: React.FC = () => {
  // Event states
  const [event, setEvent] = useState<Event>({
    name: '',
    date: '',
    owner: '',
  });
  const [eventId, setEventId] = useState<number>(0);
  const [eventError, setEventError] = useState<string>('');

  // Schedule states
  const [schedule, setSchedule] = useState<Schedule>({
    eventID: 0,
    stadiumID: 1,
    date: '',
    timeStart: '',
    timeEnd: '',
  });
  const [scheduleId, setScheduleId] = useState<number>(0);
  const [scheduleError, setScheduleError] = useState<string>('');

  // Event handlers
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventError('');

    if (!event.name || !event.date || !event.owner) {
      setEventError('All fields are required');
      return;
    }

    try {
      await createEvent(event);
      alert('Event created successfully!');
      setEvent({ name: '', date: '', owner: '' });
    } catch (error) {
      setEventError(error instanceof Error ? error.message : 'Error creating event');
    }
  };

  const handleEventUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventError('');

    if (!eventId || !event.name || !event.date || !event.owner) {
      setEventError('All fields are required');
      return;
    }

    try {
      await updateEvent(eventId, event);
      alert('Event updated successfully!');
      setEvent({ name: '', date: '', owner: '' });
      setEventId(0);
    } catch (error) {
      setEventError(error instanceof Error ? error.message : 'Error updating event');
    }
  };

  const handleEventDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventError('');

    if (!eventId) {
      setEventError('Event ID is required');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await deleteEvent(eventId);
      alert('Event deleted successfully!');
      setEventId(0);
    } catch (error) {
      setEventError(error instanceof Error ? error.message : 'Error deleting event');
    }
  };

  // Schedule handlers
  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleError('');

    if (!schedule.eventID || !schedule.stadiumID || !schedule.date || !schedule.timeStart || !schedule.timeEnd) {
      setScheduleError('All fields are required');
      return;
    }

    try {
      await createSchedule(schedule);
      alert('Schedule created successfully!');
      setSchedule({
        eventID: 0,
        stadiumID: 1,
        date: '',
        timeStart: '',
        timeEnd: '',
      });
    } catch (error) {
      setScheduleError(error instanceof Error ? error.message : 'Error creating schedule');
    }
  };

  const handleScheduleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleError('');

    if (!scheduleId || !schedule.eventID || !schedule.stadiumID || !schedule.date || !schedule.timeStart || !schedule.timeEnd) {
      setScheduleError('All fields are required');
      return;
    }

    try {
      await updateSchedule(scheduleId, schedule);
      alert('Schedule updated successfully!');
      setSchedule({
        eventID: 0,
        stadiumID: 1,
        date: '',
        timeStart: '',
        timeEnd: '',
      });
      setScheduleId(0);
    } catch (error) {
      setScheduleError(error instanceof Error ? error.message : 'Error updating schedule');
    }
  };

  const handleScheduleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleError('');

    if (!scheduleId) {
      setScheduleError('Schedule ID is required');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this schedule?')) {
      return;
    }

    try {
      await deleteSchedule(scheduleId);
      alert('Schedule deleted successfully!');
      setScheduleId(0);
    } catch (error) {
      setScheduleError(error instanceof Error ? error.message : 'Error deleting schedule');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Event Management Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Event Management</h2>
        
        {/* Create Event Form */}
        <form onSubmit={handleEventSubmit} className="mb-6 p-4 border rounded">
          <h3 className="text-xl font-semibold mb-4">Create Event</h3>
          {eventError && <div className="text-red-500 mb-4">{eventError}</div>}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event Name"
              value={event.name}
              onChange={(e) => setEvent({ ...event, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="date"
              value={event.date}
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Owner"
              value={event.owner}
              onChange={(e) => setEvent({ ...event, owner: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Create Event
            </button>
          </div>
        </form>

        {/* Update Event Form */}
        <form onSubmit={handleEventUpdate} className="mb-6 p-4 border rounded">
          <h3 className="text-xl font-semibold mb-4">Update Event</h3>
          {eventError && <div className="text-red-500 mb-4">{eventError}</div>}
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Event ID"
              value={eventId || ''}
              onChange={(e) => setEventId(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Event Name"
              value={event.name}
              onChange={(e) => setEvent({ ...event, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="date"
              value={event.date}
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Owner"
              value={event.owner}
              onChange={(e) => setEvent({ ...event, owner: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Update Event
            </button>
          </div>
        </form>

        {/* Delete Event Form */}
        <form onSubmit={handleEventDelete} className="p-4 border rounded">
          <h3 className="text-xl font-semibold mb-4">Delete Event</h3>
          {eventError && <div className="text-red-500 mb-4">{eventError}</div>}
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Event ID"
              value={eventId || ''}
              onChange={(e) => setEventId(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Delete Event
            </button>
          </div>
        </form>
      </div>

      {/* Schedule Management Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Schedule Management</h2>
        
        {/* Create Schedule Form */}
        <form onSubmit={handleScheduleSubmit} className="mb-6 p-4 border rounded">
          <h3 className="text-xl font-semibold mb-4">Create Schedule</h3>
          {scheduleError && <div className="text-red-500 mb-4">{scheduleError}</div>}
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Event ID"
              value={schedule.eventID || ''}
              onChange={(e) => setSchedule({ ...schedule, eventID: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Stadium ID"
              value={schedule.stadiumID || ''}
              onChange={(e) => setSchedule({ ...schedule, stadiumID: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="date"
              value={schedule.date}
              onChange={(e) => setSchedule({ ...schedule, date: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="time"
              value={schedule.timeStart}
              onChange={(e) => setSchedule({ ...schedule, timeStart: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="time"
              value={schedule.timeEnd}
              onChange={(e) => setSchedule({ ...schedule, timeEnd: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Create Schedule
            </button>
          </div>
        </form>

        {/* Update Schedule Form */}
        <form onSubmit={handleScheduleUpdate} className="mb-6 p-4 border rounded">
          <h3 className="text-xl font-semibold mb-4">Update Schedule</h3>
          {scheduleError && <div className="text-red-500 mb-4">{scheduleError}</div>}
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Schedule ID"
              value={scheduleId || ''}
              onChange={(e) => setScheduleId(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Event ID"
              value={schedule.eventID || ''}
              onChange={(e) => setSchedule({ ...schedule, eventID: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Stadium ID"
              value={schedule.stadiumID || ''}
              onChange={(e) => setSchedule({ ...schedule, stadiumID: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="date"
              value={schedule.date}
              onChange={(e) => setSchedule({ ...schedule, date: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="time"
              value={schedule.timeStart}
              onChange={(e) => setSchedule({ ...schedule, timeStart: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="time"
              value={schedule.timeEnd}
              onChange={(e) => setSchedule({ ...schedule, timeEnd: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Update Schedule
            </button>
          </div>
        </form>

        {/* Delete Schedule Form */}
        <form onSubmit={handleScheduleDelete} className="p-4 border rounded">
          <h3 className="text-xl font-semibold mb-4">Delete Schedule</h3>
          {scheduleError && <div className="text-red-500 mb-4">{scheduleError}</div>}
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Schedule ID"
              value={scheduleId || ''}
              onChange={(e) => setScheduleId(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Delete Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard; 