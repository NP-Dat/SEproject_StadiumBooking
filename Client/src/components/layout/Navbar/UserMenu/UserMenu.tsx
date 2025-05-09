import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../../../services/AuthService';
import styles from './UserMenu.module.css';

interface UserMenuProps {
    showProfileMenu: boolean;
    setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu: React.FC<UserMenuProps> = ({ showProfileMenu, setShowProfileMenu }) => {
    const { user, logout } = AuthService.useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setShowProfileMenu(false);
    };

    return (
        <div className={styles.userActions}>
            <div className={styles.profileDropdown}>
                <button 
                    className={styles.profileButton}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                    <span className={styles.userName}>
                        {user?.username || 'User'}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </button>
                {showProfileMenu && (
                    <div className={styles.profileMenu}>
                        <button onClick={() => {
                            navigate('/wallet');
                            setShowProfileMenu(false);
                        }} className={styles.menuItem}>
                            My Wallet
                        </button>
                        <button onClick={() => {
                            navigate('/profile');
                            setShowProfileMenu(false);
                        }} className={styles.menuItem}>
                            Profile
                        </button>
                        <button onClick={handleLogout} className={styles.menuItem}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserMenu;