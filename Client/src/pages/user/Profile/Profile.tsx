import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { BookingService } from '../../../services/BookingService';
import axios from 'axios';
import styles from './Profile.module.css';
import { UserService } from '../../../services/UserService';

const API_URL = 'http://localhost:8002/api/users';

const Profile = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'bookings'
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    // Define BookingType interface
    interface BookingType {
        cartId: number;
        eventTitle: string;
        eventImage?: string;
        date: string;
        timeStart: string;
        timeEnd: string;
        stadiumName: string;
        numberOfTicket: number;
        totalPrice: number;
        status: 'paid' | 'unPaid' | 'cancelled';
    }
    
    const [bookings, setBookings] = useState<BookingType[]>([]);
    const [bookingsLoading, setBookingsLoading] = useState(false);
    const [bookingsError, setBookingsError] = useState('');
    
    // Profile data from backend
    const [profileData, setProfileData] = useState({
        id: '',
        userName: '',
        email: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        birth: '',
    });
    
    // Editable fields
    const [editedData, setEditedData] = useState({
        fullname: '',
        phonenumber: '',
        address: '',
        email: ''
    });

    // Fetch user profile data when component mounts
    useEffect(() => {
        fetchProfileData();
    }, []);
    
    // Fetch bookings when tab changes to bookings
    useEffect(() => {
        if (activeTab === 'bookings') {
            fetchUserBookings();
        }
    }, [activeTab]);

    const fetchProfileData = async () => {
        try {
            setLoading(true);
            setError('');
            
            // Get userId from localStorage
            const userId = localStorage.getItem('userId');
            
            if (!userId) {
                console.error('No userId found in localStorage');
                navigate('/login');
                return;
            }
            
            console.log('Fetching profile data for userId:', userId);
            
            // Use userId in query parameter
            const response = await axios.get(`${API_URL}/me`, {
                params: { userId }
            });
            
            console.log('Profile data received:', response.data);
            
            if (response.data) {
                const userData = response.data;
                
                // Update profile data
                setProfileData({
                    id: userData.id || '',
                    userName: userData.userName || '',
                    email: userData.email || '',
                    fullName: userData.fullName || '',
                    phoneNumber: userData.phoneNumber || '',
                    address: userData.address || '',
                    birth: userData.birth || ''
                });
                
                // Initialize editable data
                setEditedData({
                    fullname: userData.fullName || '',
                    phonenumber: userData.phoneNumber || '',
                    address: userData.address || '',
                    email: userData.email || ''
                });
            } else {
                setError('Failed to load profile data');
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    // Authentication issue - redirect to login
                    navigate('/login');
                } else {
                    setError(`Error: ${err.response?.data?.message || 'Failed to load profile'}`);
                }
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };
    
    const fetchUserBookings = async () => {
        try {
            setBookingsLoading(true);
            setBookingsError('');
            
            const userId = localStorage.getItem('userId');
            
            if (!userId) {
                navigate('/login');
                return;
            }
            
            console.log('Fetching bookings for userId:', userId);
            
            // Call the updated getUserBookings method
            const bookingsData = await BookingService.getUserBookings(parseInt(userId));
            
            console.log('Bookings data received:', bookingsData);
            
            // Set the bookings data
            setBookings(bookingsData);
            
            if (bookingsData.length === 0) {
                console.log('No bookings found for this user');
            }
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setBookingsError('Failed to load your booking history. Please try again.');
        } finally {
            setBookingsLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    // Update the handleInputChange function to validate phone number input

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // For phone number field, only allow numeric input
        if (name === 'phonenumber') {
            // Replace any non-digit characters with empty string
            const numericValue = value.replace(/\D/g, '');
            setEditedData(prev => ({
                ...prev,
                [name]: numericValue
            }));
        } else {
            setEditedData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            setError('');
            
            const userId = localStorage.getItem('userId');
            
            if (!userId) {
                navigate('/login');
                return;
            }
            
            console.log('Updating profile with data:', editedData);
            
            const updateData = {
                userId,
                fullname: editedData.fullname,
                phonenumber: editedData.phonenumber,
                address: editedData.address,
                email: editedData.email
            };
            
            const response = await axios.put(`${API_URL}/me`, updateData);
            
            console.log('Update response:', response.data);
            
            if (response.data && response.data.user) {
                // Update local state with new data
                setProfileData(prev => ({
                    ...prev,
                    fullName: response.data.user.fullName,
                    phoneNumber: response.data.user.phoneNumber,
                    address: response.data.user.address,
                    email: response.data.user.email
                }));
                
                setIsEditing(false);
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(axios.isAxiosError(err) ? err.response?.data?.message || 'Update failed' : 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        // Reset form data to current profile values
        setEditedData({
            fullname: profileData.fullName,
            phonenumber: profileData.phoneNumber,
            address: profileData.address,
            email: profileData.email
        });
        setIsEditing(false);
    };
    
    const handleDeleteAccount = async () => {
        try {
          setLoading(true);
          const result = await UserService.deleteAccount();
          
          if (result.success) {
            // Account deleted successfully
            logout(); // Log the user out
            navigate('/'); // Redirect to home page
            // You might want to show a toast or notification here
          } else {
            setError(result.message || 'Failed to delete account');
          }
        } catch (err) {
          console.error('Error deleting account:', err);
          setError('An unexpected error occurred while deleting your account');
        } finally {
          setLoading(false);
          setShowDeleteConfirm(false);
        }
    };

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading && !profileData.userName) {
        return (
            <div className={styles.profileContainer}>
                <div className={styles.profileCard}>
                    <div className={styles.loadingContainer}>
                        <div className={styles.spinner}></div>
                        <div className={styles.loadingIndicator}>Loading profile...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <div className={styles.tabs}>
                    <button 
                        className={`${styles.tabButton} ${activeTab === 'profile' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        My Profile
                    </button>
                    <button 
                        className={`${styles.tabButton} ${activeTab === 'bookings' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        My Bookings
                    </button>
                </div>
                
                {activeTab === 'profile' ? (
                    <div className={styles.profileTab}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>My Profile</h1>
                            {!isEditing && (
                                <button
                                    onClick={handleEdit}
                                    className={styles.editButton}
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                        
                        {error && <div className={styles.errorMessage}>{error}</div>}
                        
                        <div className={styles.userInfo}>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Username:</span>
                                <span className={styles.value}>{profileData.userName}</span>
                            </div>
                            
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Email:</span>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={editedData.email}
                                        onChange={handleInputChange}
                                        className={styles.input}
                                    />
                                ) : (
                                    <span className={styles.value}>{profileData.email}</span>
                                )}
                            </div>
                            
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Full Name:</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={editedData.fullname}
                                        onChange={handleInputChange}
                                        className={styles.input}
                                    />
                                ) : (
                                    <span className={styles.value}>{profileData.fullName}</span>
                                )}
                            </div>
                            
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Phone Number:</span>
                                {isEditing ? (
                                    <input
                                        type="tel" // Changed to tel type
                                        name="phonenumber"
                                        value={editedData.phonenumber}
                                        onChange={handleInputChange}
                                        className={styles.input}
                                        pattern="[0-9]*" // Only allows numeric input
                                        inputMode="numeric" // Shows numeric keyboard on mobile
                                        placeholder="Enter numbers only"
                                        title="Please enter numbers only" // Tooltip message
                                    />
                                ) : (
                                    <span className={styles.value}>{profileData.phoneNumber}</span>
                                )}
                            </div>
                            
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Address:</span>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="address"
                                        value={editedData.address}
                                        onChange={handleInputChange}
                                        className={styles.input}
                                    />
                                ) : (
                                    <span className={styles.value}>{profileData.address}</span>
                                )}
                            </div>
                            
                            {profileData.birth && (
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Birth Date:</span>
                                    <span className={styles.value}>
                                        {new Date(profileData.birth).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>
                        
                        {isEditing ? (
                            <div className={styles.buttonGroup}>
                                <button
                                    onClick={handleSave}
                                    className={styles.saveButton}
                                    disabled={loading}
                                >
                                {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className={styles.cancelButton}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className={styles.logoutButton}
                                >
                                    Logout
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className={styles.deleteAccountButton}
                                >
                                    Delete Account
                                </button>
                                
                                {showDeleteConfirm && (
                                    <div className={styles.confirmationModal}>
                                        <div className={styles.confirmationContent}>
                                            <h3>Delete Your Account?</h3>
                                            <p>This action cannot be undone. All your tickets will be returned to available inventory.</p>
                                            <div className={styles.confirmationButtons}>
                                                <button 
                                                    onClick={handleDeleteAccount}
                                                    className={styles.confirmDeleteButton}
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Deleting...' : 'Yes, Delete My Account'}
                                                </button>
                                                <button
                                                    onClick={() => setShowDeleteConfirm(false)}
                                                    className={styles.cancelDeleteButton}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        
                        {error && !loading && (
                            <button 
                                onClick={fetchProfileData}
                                className={styles.retryButton}
                            >
                                Retry
                            </button>
                        )}
                    </div>
                ) : (
                    <div className={styles.bookingsTab}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>My Bookings</h1>
                            <button 
                                onClick={fetchUserBookings}
                                className={styles.refreshButton}
                            >
                                Refresh
                            </button>
                        </div>
                        
                        {bookingsError && (
                            <div className={styles.errorMessage}>
                                {bookingsError}
                                <button 
                                    onClick={fetchUserBookings} 
                                    className={styles.retryButton}
                                >
                                    Retry
                                </button>
                            </div>
                        )}
                        
                        {bookingsLoading ? (
                            <div className={styles.loadingContainer}>
                                <div className={styles.spinner}></div>
                                <div>Loading your bookings...</div>
                            </div>
                        ) : bookings.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>You don't have any bookings yet.</p>
                                <Link to="/events" className={styles.browseEventsButton}>
                                    Browse Events
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.bookingsList}>
                                {bookings.map((booking, index) => (
                                    <div key={booking.cartId || `booking-${index}`} className={styles.bookingCard}>
                                        {booking.eventImage && (
                                            <div className={styles.bookingImageContainer}>
                                                <img 
                                                    src={booking.eventImage} 
                                                    alt={booking.eventTitle || 'Event'} 
                                                    className={styles.bookingImage} 
                                                />
                                            </div>
                                        )}
                                        
                                        <div className={styles.bookingDetails}>
                                            <h3 className={styles.bookingTitle}>{booking.eventTitle || 'Unnamed Event'}</h3>
                                            
                                            <div className={styles.bookingInfo}>
                                                <p className={styles.bookingDate}>
                                                    <span className={styles.infoIcon}>📅</span> 
                                                    {booking.date ? formatDate(booking.date) : 'Date not available'}
                                                </p>
                                                <p className={styles.bookingTime}>
                                                    <span className={styles.infoIcon}>⏰</span> 
                                                    {booking.timeStart} - {booking.timeEnd}
                                                </p>
                                                <p className={styles.bookingVenue}>
                                                    <span className={styles.infoIcon}>🏟️</span> 
                                                    {booking.stadiumName}
                                                </p>
                                                <p className={styles.bookingZone}>
                                                    <span className={styles.infoIcon}>🎫</span> 
                                                    {booking.zoneName || 'Standard Zone'}
                                                </p>
                                            </div>
                                            
                                            <div className={styles.bookingMeta}>
                                                <div className={styles.bookingTickets}>
                                                    <span className={styles.ticketCount}>
                                                        {booking.numberOfTicket} {booking.numberOfTicket === 1 ? 'ticket' : 'tickets'}
                                                    </span>
                                                    <span className={styles.bookingPrice}>
                                                        ${booking.totalPrice.toFixed(2)}
                                                    </span>
                                                </div>
                                                
                                                <div className={styles.bookingActions}>
                                                    <span className={`${styles.bookingStatus} ${
                                                        booking.status === 'paid' ? styles.statusPaid :
                                                        booking.status === 'unPaid' ? styles.statusUnpaid :
                                                        styles.statusCancelled
                                                    }`}>
                                                        {booking.status === 'unPaid' ? 'Unpaid' : 
                                                         booking.status === 'paid' ? 'Paid' : 'Cancelled'}
                                                    </span>
                                                    
                                                    {/* Remove the View Details button */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;