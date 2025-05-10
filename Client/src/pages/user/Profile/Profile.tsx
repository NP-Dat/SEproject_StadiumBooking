import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { userAPI, bookingAPI } from '../../../apis/services';
import type { User } from '../../../types/auth';
import type { UserBooking } from '../../../types/booking';
import styles from './Profile.module.css';

const Profile = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'bookings'
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [bookings, setBookings] = useState<UserBooking[]>([]);
    const [bookingsLoading, setBookingsLoading] = useState(false);
    const [bookingsError, setBookingsError] = useState('');
    
    // Profile data from backend
    const [profileData, setProfileData] = useState<User>({
        id: 0,
        userName: '',
        email: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        birth: '',
        passWord: '',
        role: 'user',
        createdAt: '',
        updatedAt: ''
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
            
            const response = await userAPI.getProfile();
            if (response.success && response.data) {
                const userData = response.data;
                setProfileData(userData);
                setEditedData({
                    fullname: userData.fullName || '',
                    phonenumber: userData.phoneNumber || '',
                    address: userData.address || '',
                    email: userData.email || ''
                });
            } else {
                setError(response.error || 'Failed to load profile data');
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };
    
    const fetchUserBookings = async () => {
        try {
            setBookingsLoading(true);
            setBookingsError('');
            
            const response = await bookingAPI.getUserBookings();
            if (response.success && response.data) {
                // Convert Booking[] to UserBooking[]
                const userBookings = Array.isArray(response.data) ? response.data : [response.data];
                setBookings(userBookings as unknown as UserBooking[]);
            } else {
                setBookingsError(response.error || 'Failed to load booking history');
            }
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setBookingsError(err instanceof Error ? err.message : 'Failed to load booking history');
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (name === 'phonenumber') {
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
            
            const updateData: User = {
                ...profileData,
                fullName: editedData.fullname,
                phoneNumber: editedData.phonenumber,
                address: editedData.address,
                email: editedData.email
            };
            
            const response = await userAPI.updateProfile(updateData);
            if (response.success && response.data) {
                setProfileData(response.data);
                setIsEditing(false);
            } else {
                setError(response.error || 'Update failed');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err instanceof Error ? err.message : 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
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
            setError('');
            
            const response = await userAPI.deleteProfile();
            if (response.success) {
                logout();
                navigate('/');
            } else {
                setError(response.error || 'Failed to delete account');
            }
        } catch (err) {
            console.error('Error deleting account:', err);
            setError(err instanceof Error ? err.message : 'Failed to delete account');
        } finally {
            setLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    const handleCancelBooking = async (bookingId: number) => {
        try {
            setBookingsLoading(true);
            setBookingsError('');
            
            const response = await bookingAPI.cancel(bookingId);
            if (response.success) {
                // Refresh bookings after cancellation
                fetchUserBookings();
            } else {
                setBookingsError(response.error || 'Failed to cancel booking');
            }
        } catch (err) {
            console.error('Error cancelling booking:', err);
            setBookingsError(err instanceof Error ? err.message : 'Failed to cancel booking');
        } finally {
            setBookingsLoading(false);
        }
    };

    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleDateString();
    };

    if (loading) return <div className={styles.loading}>Loading profile...</div>;

    return (
        <div className={styles.profileContainer}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'bookings' ? styles.active : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    My Bookings
                </button>
            </div>

            {activeTab === 'profile' ? (
                <div className={styles.profileSection}>
                    <h1 className={styles.title}>My Profile</h1>
                    {error && <div className={styles.error}>{error}</div>}
                    
                    {isEditing ? (
                        <div className={styles.editForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="fullname">Full Name</label>
                                <input
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    value={editedData.fullname}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phonenumber">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phonenumber"
                                    name="phonenumber"
                                    value={editedData.phonenumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={editedData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={editedData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.formActions}>
                                <button className={styles.saveButton} onClick={handleSave}>
                                    Save Changes
                                </button>
                                <button className={styles.cancelButton} onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.profileInfo}>
                            <div className={styles.infoGroup}>
                                <label>Username</label>
                                <p>{profileData.userName}</p>
                            </div>
                            <div className={styles.infoGroup}>
                                <label>Full Name</label>
                                <p>{profileData.fullName}</p>
                            </div>
                            <div className={styles.infoGroup}>
                                <label>Email</label>
                                <p>{profileData.email}</p>
                            </div>
                            <div className={styles.infoGroup}>
                                <label>Phone Number</label>
                                <p>{profileData.phoneNumber}</p>
                            </div>
                            <div className={styles.infoGroup}>
                                <label>Address</label>
                                <p>{profileData.address}</p>
                            </div>
                            <div className={styles.profileActions}>
                                <button className={styles.editButton} onClick={handleEdit}>
                                    Edit Profile
                                </button>
                                <button className={styles.logoutButton} onClick={handleLogout}>
                                    Logout
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => setShowDeleteConfirm(true)}
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.bookingsSection}>
                    <h1 className={styles.title}>My Bookings</h1>
                    {bookingsError && <div className={styles.error}>{bookingsError}</div>}
                    
                    {bookingsLoading ? (
                        <div className={styles.loading}>Loading bookings...</div>
                    ) : bookings.length > 0 ? (
                        <div className={styles.bookingsList}>
                            {bookings.map(booking => (
                                <div key={booking.cartId} className={styles.bookingCard}>
                                    <h3>{booking.eventTitle}</h3>
                                    <div className={styles.bookingDetails}>
                                        <p>Date: {formatDate(booking.date)}</p>
                                        <p>Time: {booking.timeStart} - {booking.timeEnd}</p>
                                        <p>Venue: {booking.stadiumName}</p>
                                        <p>Tickets: {booking.numberOfTicket}</p>
                                        <p>Total: ${booking.totalPrice}</p>
                                        <p className={`${styles.status} ${styles[booking.status.toLowerCase()]}`}>
                                            Status: {booking.status}
                                        </p>
                                    </div>
                                    <div className={styles.bookingActions}>
                                        <Link
                                            to={`/tickets/${booking.cartId}`}
                                            className={styles.viewTicketButton}
                                        >
                                            View Ticket
                                        </Link>
                                        {booking.status === 'unPaid' && (
                                            <button
                                                className={styles.cancelButton}
                                                onClick={() => handleCancelBooking(booking.cartId)}
                                            >
                                                Cancel Booking
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noBookings}>
                            <p>You haven't made any bookings yet.</p>
                            <Link to="/events" className={styles.browseEventsButton}>
                                Browse Events
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {showDeleteConfirm && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Delete Account</h2>
                        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                        <div className={styles.modalActions}>
                            <button
                                className={styles.confirmDeleteButton}
                                onClick={handleDeleteAccount}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className={styles.cancelDeleteButton}
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;