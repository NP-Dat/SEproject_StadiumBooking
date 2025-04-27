import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Profile.module.css';

const Profile = () => {
    const navigate = useNavigate();
    const { user, logout, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState(user?.username || '');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (user) {
            login(editedUsername, ''); // Replace with appropriate logic if needed
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUsername(user?.username || '');
        setIsEditing(false);
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Profile</h1>
                    {!isEditing && (
                        <button
                            onClick={handleEdit}
                            className={styles.editButton}
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
                <div className={styles.userInfo}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Username:</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedUsername}
                                onChange={(e) => setEditedUsername(e.target.value)}
                                className={styles.input}
                            />
                        ) : (
                            <span className={styles.value}>{user?.username}</span>
                        )}
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Role:</span>
                        <span className={styles.value}>{user?.role}</span>
                    </div>
                </div>
                {isEditing ? (
                    <div className={styles.buttonGroup}>
                        <button
                            onClick={handleSave}
                            className={styles.saveButton}
                        >
                            Save Changes
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
            </div>
        </div>
    );
};

export default Profile;