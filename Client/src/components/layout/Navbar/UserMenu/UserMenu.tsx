import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../../../services/AuthService';
import styles from './UserMenu.module.css';


// a user account dropdown menu with profile and logout options


interface UserMenuProps {
    showProfileMenu: boolean;
    setShowProfileMenu: (show: boolean) => void;
}

const UserMenu = ({ showProfileMenu, setShowProfileMenu }: UserMenuProps) => {
    const navigate = useNavigate();
    const { user, logout } = AuthService.useAuth();
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
        navigate('/');
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    return (
        <div className={styles.userActions}>
            <div className={styles.profileDropdown} ref={menuRef}>
                <button onClick={toggleProfileMenu} className={styles.profileButton}>
                    <span className={styles.userName}>{user?.username}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </button>
                {showProfileMenu && (
                    <div className={styles.profileMenu}>
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
            <button onClick={() => navigate('/cart')} className={styles.cartButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            </button>
        </div>
    );
};

export default UserMenu;