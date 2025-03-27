import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import eventService from '../../services/eventService';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
`;

const Title = styled.h1`
  color: #333;
  font-weight: 500;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

const BackButton = styled(Button)`
  background-color: #4b5563;
  
  &:hover {
    background-color: #374151;
  }
`;

const Section = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
`;

const EventList = styled.div`
  margin-bottom: 2rem;
`;

const EventCard = styled.div`
  background-color: #f8fafc;
  border-radius: 6px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  border-left: 4px solid #2563eb;
`;

const EventTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #1e3a8a;
`;

const EventDetail = styled.p`
  margin: 0.25rem 0;
  color: #4b5563;
  font-size: 0.95rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #4b5563;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    border-color: #2563eb;
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

// const Select = styled.select`
//   padding: 0.75rem;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 1rem;
//   background-color: white;
  
//   &:focus {
//     border-color: #2563eb;
//     outline: none;
//     box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
//   }
// `;

// const TextArea = styled.textarea`
//   padding: 0.75rem;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 1rem;
//   min-height: 100px;
//   resize: vertical;
  
//   &:focus {
//     border-color: #2563eb;
//     outline: none;
//     box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
//   }
// `;

const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 0.75rem;
  background-color: #fff5f5;
  border-radius: 4px;
  margin-bottom: 1rem;
  border-left: 4px solid #e53e3e;
`;

const SuccessMessage = styled.div`
  color: #166534;
  padding: 0.75rem;
  background-color: #f0fdf4;
  border-radius: 4px;
  margin-bottom: 1rem;
  border-left: 4px solid #166534;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  color: #666;
`;

const NoEventsMessage = styled.p`
  text-align: center;
  color: #6b7280;
  font-style: italic;
  padding: 1.5rem;
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