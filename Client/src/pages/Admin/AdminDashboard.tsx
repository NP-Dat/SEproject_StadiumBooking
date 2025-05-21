import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
import axios from 'axios';

// Types based on your backend models
interface Stadium {
  id?: number;
  name: string;
  location?: string;
  capacity?: number;
  events?: EventSchedule[];
}

interface Event {
  id?: number;
  name: string;
  date: string;
  owner: string;
}

interface EventSchedule {
  id?: number;
  stadiumID: number;
  eventID: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  stadiumName?: string;
  eventName?: string;
}

interface Zone {
  id?: number;
  eventScheduleID: number;
  name: string;
  startSeatID: number;
  endSeatID: number;
  price: number;
  status: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Data states
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [schedules, setSchedules] = useState<EventSchedule[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  
  // Form states
  const [newStadium, setNewStadium] = useState<Stadium>({ name: '', capacity: 0, location: '' });
  const [newEvent, setNewEvent] = useState<Event>({ name: '', date: '', owner: '' });
  const [newSchedule, setNewSchedule] = useState<EventSchedule>({ 
    stadiumID: 0, 
    eventID: 0, 
    date: '', 
    timeStart: '', 
    timeEnd: '' 
  });
  const [newZone, setNewZone] = useState<Zone>({
    eventScheduleID: 0,
    name: '',
    startSeatID: 1,
    endSeatID: 100,
    price: 0,
    status: 'active'
  });

  // Selected item for edit/delete operations
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<EventSchedule | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  // Error and success messages
  const [message, setMessage] = useState({ text: '', isError: false });
  
  // API base URL
  const STADIUM_SERVICE_URL = 'http://localhost:8011';
  const EVENT_SERVICE_URL = 'http://localhost:8003'; // Changed from 8002 to 8003
  const TICKET_SERVICE_URL = 'http://localhost:8005'; // Changed from 8003 to 8005

  // Service status states
  const [serviceStatus, setServiceStatus] = useState({
    stadium: false,
    event: false,
    ticket: false
  });

  // Add state for API debugging
  const [apiDebugEndpoint, setApiDebugEndpoint] = useState('/api/stadiums');
  const [apiDebugResult, setApiDebugResult] = useState<any>(null);
  const [activeService, setActiveService] = useState<'stadium' | 'event' | 'ticket'>('stadium');

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const hasAdminToken = localStorage.getItem('token') === 'admin-token';
    
    if (isAdmin && hasAdminToken) {
      setIsAdminAuthenticated(true);
      
      // Hide header and footer when admin dashboard loads
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      
      if (header) header.style.display = 'none';
      if (footer) footer.style.display = 'none';
      
      // Remove any padding/margin that might be added to account for header/footer
      document.body.style.paddingTop = '0';
      document.body.style.paddingBottom = '0';
      document.body.style.marginTop = '0';
      document.body.style.marginBottom = '0';
      
      // Load initial data
      fetchStadiums();
      fetchEvents();
      fetchSchedules();
    } else {
      // Redirect non-admins
      navigate('/', { replace: true });
    }
    
    setIsLoading(false);
    
    // Restore header and footer when component unmounts
    return () => {
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
      
      document.body.style.paddingTop = '';
      document.body.style.paddingBottom = '';
      document.body.style.marginTop = '';
      document.body.style.marginBottom = '';
    };
  }, [navigate]);

  // Check if microservices are running
  useEffect(() => {
    const checkServices = async () => {
      try {
        const status = {
          stadium: false,
          event: false,
          ticket: false
        };
        
        // Stadium service check - try multiple endpoints
        try {
          // Try any endpoint that should exist on the stadium service
          try {
            await axios.get(`${STADIUM_SERVICE_URL}/stadiums`);
            status.stadium = true;
          } catch (err1) {
            try {
              await axios.get(`${STADIUM_SERVICE_URL}/api/stadiums`);
              status.stadium = true;
            } catch (err2) {
              try {
                // Even a 404 on the root means the service is up
                await axios.get(`${STADIUM_SERVICE_URL}/`);
                status.stadium = true;
              } catch (err3) {
                console.error('Stadium service not responding to any endpoints');
              }
            }
          }
        } catch (err) {
          console.error('Stadium service completely down');
        }
        
        // Event service check - try multiple endpoints
        try {
          try {
            await axios.get(`${EVENT_SERVICE_URL}/health`);
            status.event = true;
          } catch (err) {
            try {
              await axios.get(`${EVENT_SERVICE_URL}/api/events`);
              status.event = true;
            } catch (err2) {
              console.error('Event service not responding');
            }
          }
        } catch (err) {
          console.error('Event service completely down');
        }
        
        // Ticket service check - try multiple endpoints
        try {
          try {
            await axios.get(`${TICKET_SERVICE_URL}/health`);
            status.ticket = true;
          } catch (err) {
            try {
              await axios.get(`${TICKET_SERVICE_URL}/api/ticket-types`);
              status.ticket = true;
            } catch (err2) {
              console.error('Ticket service not responding');
            }
          }
        } catch (err) {
          console.error('Ticket service completely down');
        }
        
        setServiceStatus(status);
        
        console.log('Microservice status:', status);
        
        if (!status.stadium || !status.event || !status.ticket) {
          setMessage({ 
            text: 'Some microservices are not responding. Dashboard may not function correctly.', 
            isError: true 
          });
        }
      } catch (error) {
        console.error('Error checking services:', error);
      }
    };
    
    checkServices();
  }, [navigate]);

  // API calls for data fetching
  // Stadium service functions
  const fetchStadiums = async () => {
    try {
      // Try multiple potential API patterns with more detailed logging
      const potentialEndpoints = [
        // Standard REST patterns
        '/stadiums',
        '/stadium',
        '/api/stadiums',
        '/api/stadium',
        
        // Version prefixed
        '/v1/stadiums',
        '/v1/stadium',
        '/api/v1/stadiums',
        '/api/v1/stadium',
        
        // Service prefixed
        '/stadium-service/stadiums',
        '/stadium-service/api/stadiums',
        
        // Alternative names
        '/venues',
        '/venue',
        '/api/venues',
        
        // With trailing slashes
        '/stadiums/',
        '/api/stadiums/'
      ];
      
      let response = null;
      let workingEndpoint = '';
      
      for (const endpoint of potentialEndpoints) {
        try {
          console.log(`Trying ${STADIUM_SERVICE_URL}${endpoint}`);
          // Don't use auth headers for initial testing as they might be causing issues
          response = await axios.get(`${STADIUM_SERVICE_URL}${endpoint}`);
          workingEndpoint = endpoint;
          console.log(`SUCCESS: Stadium endpoint ${endpoint} works!`);
          // Save the working endpoint for all future requests
          localStorage.setItem('workingStadiumEndpoint', endpoint);
          break; // Exit loop once successful
        } catch (err) {
          if (err.response && err.response.status !== 404) {
            console.log(`Endpoint ${endpoint} responded with status ${err.response.status}`);
            // If we get any non-404 response, the service is at least running
            setServiceStatus(prev => ({...prev, stadium: true}));
          } else {
            console.log(`Endpoint ${endpoint} not found (404)`);
          }
        }
      }
      
      if (!response) {
        // Even if all endpoints failed, check the server directly to see if it's running
        try {
          const baseCheck = await axios.get(STADIUM_SERVICE_URL);
          setServiceStatus(prev => ({...prev, stadium: true}));
          console.log("Stadium service is running but no endpoints matched");
        } catch (err) {
          if (err.response) {
            // If we get ANY response, the service is running
            setServiceStatus(prev => ({...prev, stadium: true}));
            console.log("Stadium service is running but returned an error");
          } else {
            console.log("Stadium service appears to be completely down");
            setServiceStatus(prev => ({...prev, stadium: false}));
          }
        }
        throw new Error('All stadium endpoints failed');
      }
      
      console.log(`Success! Working stadium endpoint: ${workingEndpoint}`);
      console.log('Stadium data:', response.data);
      
      // Parse response data - be more forgiving about data structure
      let stadiumData = response.data;
      if (response.data && response.data.data) {
        stadiumData = response.data.data;
      }
      
      if (Array.isArray(stadiumData)) {
        setStadiums(stadiumData);
      } else if (stadiumData && typeof stadiumData === 'object') {
        // If it's a single stadium object, put it in an array
        setStadiums([stadiumData]);
      } else {
        console.warn('Unexpected stadium data format:', stadiumData);
        setStadiums([]); // Set empty array as fallback
      }
    } catch (error) {
      console.error('Error fetching stadiums:', error);
      setMessage({ text: 'Failed to load stadiums. See console for details.', isError: true });
    }
  };

  // Event service functions
  const fetchEvents = async () => {
    try {
      console.log('Fetching events from event service');
      const response = await axios.get(`${EVENT_SERVICE_URL}/api/events`, getAuthHeaders());
      console.log('Event response:', response);
      setEvents(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setMessage({ text: 'Failed to load events', isError: true });
    }
  };

  const fetchSchedules = async () => {
    try {
      console.log('Fetching schedules from event service');
      // Try different potential endpoints
      let response;
      try {
        response = await axios.get(`${EVENT_SERVICE_URL}/api/schedules`, getAuthHeaders());
      } catch (firstErr) {
        console.log('First endpoint failed, trying alternative');
        try {
          response = await axios.get(`${EVENT_SERVICE_URL}/api/event-schedules`, getAuthHeaders());
        } catch (secondErr) {
          response = await axios.get(`${EVENT_SERVICE_URL}/api/eventSchedules`, getAuthHeaders());
        }
      }
      console.log('Schedule response:', response);
      setSchedules(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setMessage({ text: 'Failed to load schedules', isError: true });
    }
  };

  // Ticket service functions
  const fetchZonesBySchedule = async (scheduleId: number) => {
    try {
      console.log('Fetching zones from ticket service');
      const response = await axios.get(`${TICKET_SERVICE_URL}/api/ticket-types/${scheduleId}`, getAuthHeaders());
      console.log('Zones response:', response);
      setZones(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching zones:', error);
      setMessage({ text: 'Failed to load zones', isError: true });
      return [];
    }
  };

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // Add this helper function
  const getStadiumEndpoint = () => {
    const savedEndpoint = localStorage.getItem('workingStadiumEndpoint') || '/api/stadiums';
    return `${STADIUM_SERVICE_URL}${savedEndpoint}`;
  };

  // Stadium CRUD operations
  const handleAddStadium = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(getStadiumEndpoint(), newStadium, getAuthHeaders());
      setStadiums([...stadiums, response.data.data || response.data]);
      setNewStadium({ name: '', capacity: 0, location: '' });
      setMessage({ text: 'Stadium added successfully', isError: false });
      fetchStadiums();
    } catch (error) {
      console.error('Error adding stadium:', error);
      setMessage({ text: 'Failed to add stadium', isError: true });
    }
  };

  const handleUpdateStadium = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStadium?.id) return;
    
    try {
      await axios.put(`${STADIUM_SERVICE_URL}/stadiums/${selectedStadium.id}`, selectedStadium, getAuthHeaders());
      setMessage({ text: 'Stadium updated successfully', isError: false });
      fetchStadiums();
      setSelectedStadium(null);
    } catch (error) {
      console.error('Error updating stadium:', error);
      setMessage({ text: 'Failed to update stadium', isError: true });
    }
  };

  const handleDeleteStadium = async (id: number) => {
    try {
      await axios.delete(`${STADIUM_SERVICE_URL}/stadiums/${id}`, getAuthHeaders());
      setStadiums(stadiums.filter(stadium => stadium.id !== id));
      setMessage({ text: 'Stadium deleted successfully', isError: false });
    } catch (error) {
      console.error('Error deleting stadium:', error);
      setMessage({ text: 'Failed to delete stadium', isError: true });
    }
  };

  // Event CRUD operations
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${EVENT_SERVICE_URL}/events`, newEvent);
      setEvents([...events, response.data.data || response.data]);
      setNewEvent({ name: '', date: '', owner: '' });
      setMessage({ text: 'Event added successfully', isError: false });
      fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error);
      setMessage({ text: 'Failed to add event', isError: true });
    }
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent?.id) return;
    
    try {
      await axios.put(`${EVENT_SERVICE_URL}/events/${selectedEvent.id}`, selectedEvent);
      setMessage({ text: 'Event updated successfully', isError: false });
      fetchEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
      setMessage({ text: 'Failed to update event', isError: true });
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await axios.delete(`${EVENT_SERVICE_URL}/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
      setMessage({ text: 'Event deleted successfully', isError: false });
    } catch (error) {
      console.error('Error deleting event:', error);
      setMessage({ text: 'Failed to delete event', isError: true });
    }
  };

  // Schedule CRUD operations
  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${EVENT_SERVICE_URL}/schedules`, newSchedule);
      setSchedules([...schedules, response.data.data || response.data]);
      setNewSchedule({ 
        stadiumID: 0, 
        eventID: 0, 
        date: '', 
        timeStart: '', 
        timeEnd: '' 
      });
      setMessage({ text: 'Schedule added successfully', isError: false });
      fetchSchedules();
    } catch (error) {
      console.error('Error adding schedule:', error);
      setMessage({ text: 'Failed to add schedule', isError: true });
    }
  };

  const handleUpdateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSchedule?.id) return;
    
    try {
      await axios.put(`${EVENT_SERVICE_URL}/schedules/${selectedSchedule.id}`, selectedSchedule);
      setMessage({ text: 'Schedule updated successfully', isError: false });
      fetchSchedules();
      setSelectedSchedule(null);
    } catch (error) {
      console.error('Error updating schedule:', error);
      setMessage({ text: 'Failed to update schedule', isError: true });
    }
  };

  const handleDeleteSchedule = async (id: number) => {
    try {
      await axios.delete(`${EVENT_SERVICE_URL}/schedules/${id}`);
      setSchedules(schedules.filter(schedule => schedule.id !== id));
      setMessage({ text: 'Schedule deleted successfully', isError: false });
    } catch (error) {
      console.error('Error deleting schedule:', error);
      setMessage({ text: 'Failed to delete schedule', isError: true });
    }
  };

  // Zone CRUD operations
  const handleAddZone = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${TICKET_SERVICE_URL}/ticket-types`, newZone);
      setZones([...zones, response.data.data || response.data]);
      setNewZone({
        eventScheduleID: newZone.eventScheduleID,
        name: '',
        startSeatID: 1,
        endSeatID: 100,
        price: 0,
        status: 'active'
      });
      setMessage({ text: 'Zone added successfully', isError: false });
      if (newZone.eventScheduleID) {
        fetchZonesBySchedule(newZone.eventScheduleID);
      }
    } catch (error) {
      console.error('Error adding zone:', error);
      setMessage({ text: 'Failed to add zone', isError: true });
    }
  };

  const handleUpdateZone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedZone?.id) return;
    
    try {
      await axios.put(`${TICKET_SERVICE_URL}/ticket-types/${selectedZone.id}`, selectedZone);
      setMessage({ text: 'Zone updated successfully', isError: false });
      if (selectedZone.eventScheduleID) {
        fetchZonesBySchedule(selectedZone.eventScheduleID);
      }
      setSelectedZone(null);
    } catch (error) {
      console.error('Error updating zone:', error);
      setMessage({ text: 'Failed to update zone', isError: true });
    }
  };

  const handleDeleteZone = async (id: number, scheduleId: number) => {
    try {
      await axios.delete(`${TICKET_SERVICE_URL}/ticket-types/${id}`);
      setZones(zones.filter(zone => zone.id !== id));
      setMessage({ text: 'Zone deleted successfully', isError: false });
    } catch (error) {
      console.error('Error deleting zone:', error);
      setMessage({ text: 'Failed to delete zone', isError: true });
    }
  };

  const handleLogout = () => {
    // Clear admin authentication
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    
    // Restore header and footer before navigating
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (header) header.style.display = '';
    if (footer) footer.style.display = '';
    
    // Redirect to home page
    navigate('/', { replace: true });
  };

  // Service status check
  const checkServices = async () => {
    try {
      const status = {
        stadium: false,
        event: false,
        ticket: false
      };
      
      // Stadium service check - try multiple endpoints
      try {
        // Try any endpoint that should exist on the stadium service
        try {
          await axios.get(`${STADIUM_SERVICE_URL}/stadiums`);
          status.stadium = true;
        } catch (err1) {
          try {
            await axios.get(`${STADIUM_SERVICE_URL}/api/stadiums`);
            status.stadium = true;
          } catch (err2) {
            try {
              // Even a 404 on the root means the service is up
              await axios.get(`${STADIUM_SERVICE_URL}/`);
              status.stadium = true;
            } catch (err3) {
              console.error('Stadium service not responding to any endpoints');
            }
          }
        }
      } catch (err) {
        console.error('Stadium service completely down');
      }
      
      // Event service check - try multiple endpoints
      try {
        try {
          await axios.get(`${EVENT_SERVICE_URL}/health`);
          status.event = true;
        } catch (err) {
          try {
            await axios.get(`${EVENT_SERVICE_URL}/api/events`);
            status.event = true;
          } catch (err2) {
            console.error('Event service not responding');
          }
        }
      } catch (err) {
        console.error('Event service completely down');
      }
      
      // Ticket service check - try multiple endpoints
      try {
        try {
          await axios.get(`${TICKET_SERVICE_URL}/health`);
          status.ticket = true;
        } catch (err) {
          try {
            await axios.get(`${TICKET_SERVICE_URL}/api/ticket-types`);
            status.ticket = true;
          } catch (err2) {
            console.error('Ticket service not responding');
          }
        }
      } catch (err) {
        console.error('Ticket service completely down');
      }
      
      setServiceStatus(status);
      
      console.log('Microservice status:', status);
      
      if (!status.stadium || !status.event || !status.ticket) {
        setMessage({ 
          text: 'Some microservices are not responding. Dashboard may not function correctly.', 
          isError: true 
        });
      }
    } catch (error) {
      console.error('Error checking services:', error);
    }
  };

  // API testing function
  const testService = async (service: 'stadium' | 'event' | 'ticket') => {
    try {
      let url = '';
      let success = false;
      
      // Try multiple possible health check endpoints
      const possibleEndpoints = ['/', '/health', '/api', '/status', '/ping', '/api/status'];
      
      for (const endpoint of possibleEndpoints) {
        try {
          switch(service) {
            case 'stadium':
              url = `${STADIUM_SERVICE_URL}${endpoint}`;
              break;
            case 'event':
              url = `${EVENT_SERVICE_URL}${endpoint}`;
              break;
            case 'ticket':
              url = `${TICKET_SERVICE_URL}${endpoint}`;
              break;
          }
          
          console.log(`Testing ${service} service at ${url}`);
          await axios.get(url, { timeout: 2000 });
          success = true;
          console.log(`${service} service responding at ${url}`);
          break; // Exit the loop if successful
        } catch (endpointError: any) {
          if (endpointError.response) {
            // If we get any response (even 404), the service is running
            success = true;
            console.log(`${service} service is running but endpoint ${url} returned ${endpointError.response.status}`);
            break; // Exit the loop since we confirmed service is running
          }
          // If connection error, try next endpoint
          console.log(`Endpoint ${url} failed, trying next...`);
        }
      }
      
      // Update the service status
      setServiceStatus(prev => ({
        ...prev,
        [service]: success
      }));
      
      if (success) {
        console.log(`${service} service is UP`);
      } else {
        console.log(`${service} service is DOWN`);
        setMessage({
          text: `${service} service is not responding. Check if it's running.`,
          isError: true
        });
      }
      
      return success;
    } catch (error: any) {
      console.error(`Error testing ${service} service:`, error);
      return false;
    }
  };

  // Add this function
  const testEndpoint = async (service: 'stadium' | 'event' | 'ticket', endpoint: string) => {
    setApiDebugResult('Loading...');
    try {
      let baseUrl;
      switch (service) {
        case 'stadium': 
          baseUrl = STADIUM_SERVICE_URL;
          break;
        case 'event':
          baseUrl = EVENT_SERVICE_URL;
          break;
        case 'ticket':
          baseUrl = TICKET_SERVICE_URL;
          break;
      }
      
      const response = await axios.get(`${baseUrl}${endpoint}`);
      console.log(`${service} response:`, response);
      setApiDebugResult(response.data);
      return true;
    } catch (error) {
      console.error(`Error testing ${service} endpoint:`, error);
      setApiDebugResult(error);
      return false;
    }
  };

  // View handling
  const renderDashboard = () => (
    <>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Stadiums</h3>
          <p className={styles.statValue}>{stadiums.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Events</h3>
          <p className={styles.statValue}>{events.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Scheduled Events</h3>
          <p className={styles.statValue}>{schedules.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Revenue</h3>
          <p className={styles.statValue}>$158,432</p>
        </div>
      </div>
      {renderServiceStatus()}
      {renderApiDebugger()}
    </>
  );

  const renderServiceStatus = () => (
    <div className={styles.serviceStatusPanel}>
      <h3>Service Status</h3>
      <div className={styles.serviceList}>
        <div className={`${styles.serviceItem} ${serviceStatus.stadium ? styles.serviceOnline : styles.serviceOffline}`}>
          Stadium Service: {serviceStatus.stadium ? 'Online' : 'Offline'}
          <button onClick={() => testService('stadium')}>Test</button>
        </div>
        <div className={`${styles.serviceItem} ${serviceStatus.event ? styles.serviceOnline : styles.serviceOffline}`}>
          Event Service: {serviceStatus.event ? 'Online' : 'Offline'}
          <button onClick={() => testService('event')}>Test</button>
        </div>
        <div className={`${styles.serviceItem} ${serviceStatus.ticket ? styles.serviceOnline : styles.serviceOffline}`}>
          Ticket Service: {serviceStatus.ticket ? 'Online' : 'Offline'}
          <button onClick={() => testService('ticket')}>Test</button>
        </div>
      </div>
      <button className={styles.refreshButton} onClick={checkServices}>
        Refresh Service Status
      </button>
    </div>
  );

  const renderApiDebugger = () => (
    <div className={styles.apiDebugger}>
      <h3>API Endpoint Tester</h3>
      <div className={styles.apiForm}>
        <select onChange={(e) => setActiveService(e.target.value)}>
          <option value="stadium">Stadium Service</option>
          <option value="event">Event Service</option>
          <option value="ticket">Ticket Service</option>
        </select>
        <input 
          type="text" 
          value={apiDebugEndpoint} 
          onChange={(e) => setApiDebugEndpoint(e.target.value)}
          placeholder="/api/endpoint"
        />
        <button onClick={() => testEndpoint(activeService as any, apiDebugEndpoint)}>
          Test Endpoint
        </button>
      </div>
      <div className={styles.debugButtons}>
        <p><strong>Stadium Service Endpoints:</strong></p>
        <button onClick={() => testEndpoint('stadium', '/stadiums')}>
          /stadiums
        </button>
        <button onClick={() => testEndpoint('stadium', '/api/v1/stadium')}>
          /api/v1/stadium
        </button>
        <button onClick={() => testEndpoint('stadium', '/stadium-service/stadiums')}>
          /stadium-service/stadiums
        </button>
        <button onClick={() => testEndpoint('stadium', '/v1/stadiums')}>
          /v1/stadiums
        </button>
        <button onClick={() => testEndpoint('stadium', '/stadium')}>
          /stadium (singular)
        </button>
      </div>
      {apiDebugResult && (
        <div className={styles.apiResult}>
          <h4>Result:</h4>
          <pre>{typeof apiDebugResult === 'object' ? JSON.stringify(apiDebugResult, null, 2) : apiDebugResult}</pre>
        </div>
      )}
    </div>
  );

  const renderStadiumsManager = () => (
    <div className={styles.managerSection}>
      <h2>Stadium Management</h2>
      
      {/* Add Stadium Form */}
      <div className={styles.formCard}>
        <h3>Add New Stadium</h3>
        <form onSubmit={handleAddStadium}>
          <div className={styles.formGroup}>
            <label>Stadium Name</label>
            <input 
              type="text" 
              value={newStadium.name} 
              onChange={(e) => setNewStadium({...newStadium, name: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Location</label>
            <input 
              type="text" 
              value={newStadium.location || ''} 
              onChange={(e) => setNewStadium({...newStadium, location: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Capacity</label>
            <input 
              type="number" 
              value={newStadium.capacity || 0} 
              onChange={(e) => setNewStadium({...newStadium, capacity: parseInt(e.target.value) || 0})}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Add Stadium</button>
        </form>
      </div>

      {/* Stadium List */}
      <div className={styles.listContainer}>
        <h3>Existing Stadiums</h3>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stadiums.map(stadium => (
              <tr key={stadium.id}>
                <td>{stadium.id}</td>
                <td>{stadium.name}</td>
                <td>{stadium.location || 'N/A'}</td>
                <td>{stadium.capacity || 'N/A'}</td>
                <td>
                  <button 
                    className={styles.editButton}
                    onClick={() => setSelectedStadium(stadium)}
                  >
                    Edit
                  </button>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete stadium "${stadium.name}"?`)) {
                        stadium.id && handleDeleteStadium(stadium.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Stadium Modal */}
      {selectedStadium && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Edit Stadium</h3>
            <form onSubmit={handleUpdateStadium}>
              <div className={styles.formGroup}>
                <label>Stadium Name</label>
                <input 
                  type="text" 
                  value={selectedStadium.name} 
                  onChange={(e) => setSelectedStadium({...selectedStadium, name: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input 
                  type="text" 
                  value={selectedStadium.location || ''} 
                  onChange={(e) => setSelectedStadium({...selectedStadium, location: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Capacity</label>
                <input 
                  type="number" 
                  value={selectedStadium.capacity || 0} 
                  onChange={(e) => setSelectedStadium({...selectedStadium, capacity: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.saveButton}>Save Changes</button>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => setSelectedStadium(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderEventsManager = () => (
    <div className={styles.managerSection}>
      <h2>Event Management</h2>
      
      {/* Add Event Form */}
      <div className={styles.formCard}>
        <h3>Add New Event</h3>
        <form onSubmit={handleAddEvent}>
          <div className={styles.formGroup}>
            <label>Event Name</label>
            <input 
              type="text" 
              value={newEvent.name} 
              onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Date</label>
            <input 
              type="date" 
              value={newEvent.date} 
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Owner/Organizer</label>
            <input 
              type="text" 
              value={newEvent.owner} 
              onChange={(e) => setNewEvent({...newEvent, owner: e.target.value})}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Add Event</button>
        </form>
      </div>

      {/* Event List */}
      <div className={styles.listContainer}>
        <h3>Existing Events</h3>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.owner}</td>
                <td>
                  <button 
                    className={styles.editButton}
                    onClick={() => setSelectedEvent(event)}
                  >
                    Edit
                  </button>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete event "${event.name}"?`)) {
                        event.id && handleDeleteEvent(event.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Event Modal */}
      {selectedEvent && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Edit Event</h3>
            <form onSubmit={handleUpdateEvent}>
              <div className={styles.formGroup}>
                <label>Event Name</label>
                <input 
                  type="text" 
                  value={selectedEvent.name} 
                  onChange={(e) => setSelectedEvent({...selectedEvent, name: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Date</label>
                <input 
                  type="date" 
                  value={selectedEvent.date ? selectedEvent.date.split('T')[0] : ''} 
                  onChange={(e) => setSelectedEvent({...selectedEvent, date: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Owner/Organizer</label>
                <input 
                  type="text" 
                  value={selectedEvent.owner} 
                  onChange={(e) => setSelectedEvent({...selectedEvent, owner: e.target.value})}
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.saveButton}>Save Changes</button>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => setSelectedEvent(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderSchedulesManager = () => (
    <div className={styles.managerSection}>
      <h2>Event Scheduling</h2>
      
      {/* Add Schedule Form */}
      <div className={styles.formCard}>
        <h3>Schedule New Event</h3>
        <form onSubmit={handleAddSchedule}>
          <div className={styles.formGroup}>
            <label>Event</label>
            <select
              value={newSchedule.eventID} 
              onChange={(e) => setNewSchedule({...newSchedule, eventID: parseInt(e.target.value)})}
              required
            >
              <option value="">Select an event</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>{event.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Stadium</label>
            <select
              value={newSchedule.stadiumID} 
              onChange={(e) => setNewSchedule({...newSchedule, stadiumID: parseInt(e.target.value)})}
              required
            >
              <option value="">Select a stadium</option>
              {stadiums.map(stadium => (
                <option key={stadium.id} value={stadium.id}>{stadium.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Date</label>
            <input 
              type="date" 
              value={newSchedule.date} 
              onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Start Time</label>
            <input 
              type="time" 
              value={newSchedule.timeStart} 
              onChange={(e) => setNewSchedule({...newSchedule, timeStart: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>End Time</label>
            <input 
              type="time" 
              value={newSchedule.timeEnd} 
              onChange={(e) => setNewSchedule({...newSchedule, timeEnd: e.target.value})}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Schedule Event</button>
        </form>
      </div>

      {/* Schedule List */}
      <div className={styles.listContainer}>
        <h3>Scheduled Events</h3>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Event</th>
              <th>Stadium</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.id}</td>
                <td>{schedule.eventName || `Event ${schedule.eventID}`}</td>
                <td>{schedule.stadiumName || `Stadium ${schedule.stadiumID}`}</td>
                <td>{new Date(schedule.date).toLocaleDateString()}</td>
                <td>{`${schedule.timeStart} - ${schedule.timeEnd}`}</td>
                <td>
                  <button 
                    className={styles.viewButton}
                    onClick={async () => {
                      if (schedule.id) {
                        const fetchedZones = await fetchZonesBySchedule(schedule.id);
                        setNewZone({...newZone, eventScheduleID: schedule.id});
                        setActiveTab('zones');
                      }
                    }}
                  >
                    Manage Zones
                  </button>
                  <button 
                    className={styles.editButton}
                    onClick={() => setSelectedSchedule(schedule)}
                  >
                    Edit
                  </button>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete this schedule?`)) {
                        schedule.id && handleDeleteSchedule(schedule.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Schedule Modal */}
      {selectedSchedule && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Edit Schedule</h3>
            <form onSubmit={handleUpdateSchedule}>
              <div className={styles.formGroup}>
                <label>Event</label>
                <select
                  value={selectedSchedule.eventID} 
                  onChange={(e) => setSelectedSchedule({...selectedSchedule, eventID: parseInt(e.target.value)})}
                  required
                >
                  <option value="">Select an event</option>
                  {events.map(event => (
                    <option key={event.id} value={event.id}>{event.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Stadium</label>
                <select
                  value={selectedSchedule.stadiumID} 
                  onChange={(e) => setSelectedSchedule({...selectedSchedule, stadiumID: parseInt(e.target.value)})}
                  required
                >
                  <option value="">Select a stadium</option>
                  {stadiums.map(stadium => (
                    <option key={stadium.id} value={stadium.id}>{stadium.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Date</label>
                <input 
                  type="date" 
                  value={selectedSchedule.date ? selectedSchedule.date.split('T')[0] : ''} 
                  onChange={(e) => setSelectedSchedule({...selectedSchedule, date: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Start Time</label>
                <input 
                  type="time" 
                  value={selectedSchedule.timeStart} 
                  onChange={(e) => setSelectedSchedule({...selectedSchedule, timeStart: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>End Time</label>
                <input 
                  type="time" 
                  value={selectedSchedule.timeEnd} 
                  onChange={(e) => setSelectedSchedule({...selectedSchedule, timeEnd: e.target.value})}
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.saveButton}>Save Changes</button>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={() => setSelectedSchedule(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderZonesManager = () => {
    // Find the schedule for context
    const currentSchedule = schedules.find(s => s.id === newZone.eventScheduleID);
    
    return (
      <div className={styles.managerSection}>
        <h2>Zone Management</h2>
        {currentSchedule && (
          <div className={styles.contextInfo}>
            <p>Managing zones for: <strong>{currentSchedule.eventName || `Event ${currentSchedule.eventID}`}</strong> at <strong>{currentSchedule.stadiumName || `Stadium ${currentSchedule.stadiumID}`}</strong> on <strong>{new Date(currentSchedule.date).toLocaleDateString()}</strong></p>
          </div>
        )}
        
        {/* Add Zone Form */}
        {newZone.eventScheduleID ? (
          <div className={styles.formCard}>
            <h3>Add New Zone</h3>
            <form onSubmit={handleAddZone}>
              <div className={styles.formGroup}>
                <label>Zone Name</label>
                <input 
                  type="text" 
                  value={newZone.name} 
                  onChange={(e) => setNewZone({...newZone, name: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Start Seat ID</label>
                  <input 
                    type="number" 
                    value={newZone.startSeatID} 
                    onChange={(e) => setNewZone({...newZone, startSeatID: parseInt(e.target.value) || 1})}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>End Seat ID</label>
                  <input 
                    type="number" 
                    value={newZone.endSeatID} 
                    onChange={(e) => setNewZone({...newZone, endSeatID: parseInt(e.target.value) || 100})}
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Price ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={newZone.price} 
                  onChange={(e) => setNewZone({...newZone, price: parseFloat(e.target.value) || 0})}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  value={newZone.status} 
                  onChange={(e) => setNewZone({...newZone, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="sold_out">Sold Out</option>
                </select>
              </div>
              <button type="submit" className={styles.submitButton}>Add Zone</button>
            </form>
          </div>
        ) : (
          <div className={styles.noScheduleSelected}>
            <p>Please select a schedule from the "Event Scheduling" tab first to manage zones.</p>
            <button 
              className={styles.actionButton}
              onClick={() => setActiveTab('schedules')}
            >
              Go to Schedules
            </button>
          </div>
        )}

        {/* Zones List */}
        {newZone.eventScheduleID && zones.length > 0 && (
          <div className={styles.listContainer}>
            <h3>Existing Zones</h3>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Seats Range</th>
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
                    <td>{`${zone.startSeatID} - ${zone.endSeatID}`}</td>
                    <td>${zone.price}</td>
                    <td>{zone.status}</td>
                    <td>
                      <button 
                        className={styles.editButton}
                        onClick={() => setSelectedZone(zone)}
                      >
                        Edit
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete zone "${zone.name}"?`)) {
                            zone.id && handleDeleteZone(zone.id, zone.eventScheduleID);
                          }
                        }}
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

        {/* Edit Zone Modal */}
        {selectedZone && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h3>Edit Zone</h3>
              <form onSubmit={handleUpdateZone}>
                <div className={styles.formGroup}>
                  <label>Zone Name</label>
                  <input 
                    type="text" 
                    value={selectedZone.name} 
                    onChange={(e) => setSelectedZone({...selectedZone, name: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Start Seat ID</label>
                    <input 
                      type="number" 
                      value={selectedZone.startSeatID} 
                      onChange={(e) => setSelectedZone({...selectedZone, startSeatID: parseInt(e.target.value) || 1})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>End Seat ID</label>
                    <input 
                      type="number" 
                      value={selectedZone.endSeatID} 
                      onChange={(e) => setSelectedZone({...selectedZone, endSeatID: parseInt(e.target.value) || 100})}
                      required
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={selectedZone.price} 
                    onChange={(e) => setSelectedZone({...selectedZone, price: parseFloat(e.target.value) || 0})}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Status</label>
                  <select
                    value={selectedZone.status} 
                    onChange={(e) => setSelectedZone({...selectedZone, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="sold_out">Sold Out</option>
                  </select>
                </div>
                <div className={styles.modalActions}>
                  <button type="submit" className={styles.saveButton}>Save Changes</button>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setSelectedZone(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Admin dashboard rendering
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className={styles.adminContainer}>
      <button 
        className={styles.logoutButton}
        onClick={handleLogout}
      >
        Logout
      </button>
      
      <div className={styles.adminContent}>
        <h1>Admin Dashboard</h1>
        
        {/* Notification area */}
        {message.text && (
          <div className={message.isError ? styles.errorMessage : styles.successMessage}>
            {message.text}
            <button onClick={() => setMessage({ text: '', isError: false })}>×</button>
          </div>
        )}
        
        {/* Navigation Tabs */}
        <div className={styles.tabNavigation}>
          <button 
            className={activeTab === 'dashboard' ? styles.activeTab : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'stadiums' ? styles.activeTab : ''}
            onClick={() => setActiveTab('stadiums')}
          >
            Stadiums
          </button>
          <button 
            className={activeTab === 'events' ? styles.activeTab : ''}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button 
            className={activeTab === 'schedules' ? styles.activeTab : ''}
            onClick={() => setActiveTab('schedules')}
          >
            Scheduling
          </button>
          <button 
            className={activeTab === 'zones' ? styles.activeTab : ''}
            onClick={() => setActiveTab('zones')}
          >
            Zones
          </button>
        </div>
        
        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'stadiums' && renderStadiumsManager()}
          {activeTab === 'events' && renderEventsManager()}
          {activeTab === 'schedules' && renderSchedulesManager()}
          {activeTab === 'zones' && renderZonesManager()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;