import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import eventService from '../../services/eventService';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h1`
  color: #111827;
  font-weight: 600;
  font-size: 1.75rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    background-color: #1d4ed8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const BackButton = styled(Button)`
  background-color: #6b7280;

  &:hover {
    background-color: #4b5563;
  }
`;

const Section = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-bottom: 2.5rem;
  border: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h2`
  color: #1f2937;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
`;

const EventList = styled.div`
  margin-bottom: 2rem;
  display: grid;
  gap: 1rem;
`;

const EventCard = styled.div`
  background-color: #f9fafb;
  border-radius: 6px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-left: 5px solid #2563eb;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  }
`;

const EventTitle = styled.h3`
  margin: 0 0 0.75rem 0;
  color: #1e3a8a;
  font-weight: 600;
  font-size: 1.1rem;
`;

const EventDetail = styled.p`
  margin: 0.3rem 0;
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.6rem;
  color: #374151;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.85rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  color: #111827;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled.select`
  padding: 0.85rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  color: #111827;
  background-color: white;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 0.65em auto;
  padding-right: 2.5rem;

  &:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

const TextArea = styled.textarea`
  padding: 0.85rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  color: #111827;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

   &::placeholder {
    color: #9ca3af;
  }
`;

const ErrorMessage = styled.div`
  color: #991b1b;
  padding: 1rem;
  background-color: #fee2e2;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  border-left: 5px solid #dc2626;
  font-size: 0.9rem;
  font-weight: 500;
`;

const SuccessMessage = styled.div`
  color: #065f46;
  padding: 1rem;
  background-color: #d1fae5;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  border-left: 5px solid #10b981;
  font-size: 0.9rem;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  color: #6b7280;
  font-size: 1rem;
`;

const NoEventsMessage = styled.p`
  text-align: center;
  color: #6b7280;
  font-style: normal;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 6px;
  border: 1px dashed #d1d5db;
`;

const CreateEvent = () => {
  const { stadiumId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  
  // State for schedule and events
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    owner: currentUser?.user?.id || '',
    stadiumID: stadiumId
  });
  
  const [creating, setCreating] = useState(false);

  // Fetch stadium schedule on component mount
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const data = await eventService.getStadiumSchedule(stadiumId);
        setSchedule(data);
        setError('');
      } catch (err) {
        console.error('Error fetching schedule:', err);
        setError('Failed to load stadium events and schedule.');
      } finally {
        setLoading(false);
      }
    };
    
    if (stadiumId) {
      fetchSchedule();
    }
  }, [stadiumId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? '' : parseFloat(value)) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    const { name, date, timeStart, timeEnd } = formData;
    
    if (!name || !date || !timeStart || !timeEnd) {
      setError('Please fill out all required fields.');
      setSuccess('');
      return;
    }
    

    setError('');
    setCreating(true);
    
    try {
      await eventService.createEvent(formData);
      setSuccess('Event created successfully!');
      
      // Reset form after successful creation
      setFormData({
        name: '',
        date: '',
        timeStart: '',
        timeEnd: '',
        owner: currentUser?.user?.id || '',
        stadiumID: stadiumId
      });
      
      // Refresh the schedule data
      const updatedSchedule = await eventService.getStadiumSchedule(stadiumId);
      setSchedule(updatedSchedule);
      
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event. Please try again.');
      setSuccess('');
    } finally {
      setCreating(false);
    }
  };

  const handleBackClick = () => {
    navigate('/stadiums');
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <Header>
        <Title>Create Event</Title>
        <BackButton onClick={handleBackClick}>Back to Stadiums</BackButton>
      </Header>

      {/* Events/Schedule Section */}
      <Section>
        <SectionTitle>Stadium Events Schedule</SectionTitle>
        
        {loading ? (
          <LoadingSpinner>Loading events...</LoadingSpinner>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : schedule.length > 0 ? (
          <EventList>
            {schedule.map((event) => (
              <EventCard key={event.id}>
                <EventTitle>{event.eventID ? `Event #${event.eventID}` : 'Reserved Time Slot'}</EventTitle>
                <EventDetail><strong>Date:</strong> {formatDate(event.date)}</EventDetail>
                <EventDetail><strong>Time:</strong> {event.timeStart} to {event.timeEnd}</EventDetail>
              </EventCard>
            ))}
          </EventList>
        ) : (
          <NoEventsMessage>No events scheduled for this stadium.</NoEventsMessage>
        )}
      </Section>

      {/* Create Event Form Section */}
      <Section>
        <SectionTitle>Create a New Event</SectionTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Event Name *</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Enter event name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="date">Event Date *</Label>
            <Input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <FormGroup style={{ flex: 1 }}>
              <Label htmlFor="timeStart">Start Time *</Label>
              <Input
                id="timeStart"
                type="time"
                name="timeStart"
                value={formData.timeStart}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup style={{ flex: 1 }}>
              <Label htmlFor="timeEnd">End Time *</Label>
              <Input
                id="timeEnd"
                type="time"
                name="timeEnd"
                value={formData.timeEnd}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </div>
          
          <Button type="submit" disabled={creating}>
            {creating ? 'Creating Event...' : 'Create Event'}
          </Button>
        </Form>
      </Section>
    </Container>
  );
};

export default CreateEvent;