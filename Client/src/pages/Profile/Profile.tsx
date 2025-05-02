import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import axios from 'axios';
import styles from './Profile.module.css';

const API_URL = 'http://localhost:8002/api/users';

const Profile = () => {
    const navigate = useNavigate();
    const { logout } = AuthService.useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Profile data from backend
    const [profileData, setProfileData] = useState({
        id: '',
        userName: '',
        email: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        birth: ''
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

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prev => ({
            ...prev,
            [name]: value
        }));
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

    if (loading && !profileData.userName) {
        return (
            <div className={styles.profileContainer}>
                <div className={styles.profileCard}>
                    <div className={styles.loadingIndicator}>Loading profile...</div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
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
                                type="text"
                                name="phonenumber"
                                value={editedData.phonenumber}
                                onChange={handleInputChange}
                                className={styles.input}
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
                    <button
                        onClick={handleLogout}
                        className={styles.logoutButton}
                    >
                        Logout
                    </button>
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
        </div>
    );
};

export default Profile;