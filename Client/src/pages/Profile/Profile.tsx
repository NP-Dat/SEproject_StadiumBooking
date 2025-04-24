import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Profile.module.css';

const Profile = () => {
    const navigate = useNavigate();
    const { user, logout, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(user?.name || '');
    const [editedEmail, setEditedEmail] = useState(user?.email || '');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (user) {
            login({
                ...user,
                name: editedName,
                email: editedEmail
            });
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedName(user?.name || '');
        setEditedEmail(user?.email || '');
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
                        <span className={styles.label}>Name:</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                className={styles.input}
                            />
                        ) : (
                            <span className={styles.value}>{user?.name}</span>
                        )}
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Email:</span>
                        {isEditing ? (
                            <input
                                type="email"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                                className={styles.input}
                            />
                        ) : (
                            <span className={styles.value}>{user?.email}</span>
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