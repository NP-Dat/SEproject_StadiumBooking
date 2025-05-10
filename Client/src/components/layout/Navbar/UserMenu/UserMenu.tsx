import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../contexts/AuthContext'
import styles from './UserMenu.module.css'

interface UserMenuProps {
    showProfileMenu: boolean
    setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>
}

function UserMenu({ showProfileMenu, setShowProfileMenu }: UserMenuProps) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const menuRef = useRef<HTMLDivElement>(null)

    const handleLogout = useCallback(async () => {
        try {
            await logout()
            navigate('/')
            setShowProfileMenu(false)
        } catch (error) {
            console.error('Logout failed:', error)
            // You might want to show an error message to the user here
        }
    }, [logout, navigate, setShowProfileMenu])

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowProfileMenu(false)
        }
    }, [setShowProfileMenu])

    useEffect(() => {
        if (showProfileMenu) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showProfileMenu, handleClickOutside])

    const handleNavigation = useCallback((path: string) => {
        navigate(path)
        setShowProfileMenu(false)
    }, [navigate, setShowProfileMenu])

    if (!user) return null

    return (
        <div className={styles.userActions} ref={menuRef}>
            <div className={styles.profileDropdown}>
                <button 
                    className={styles.profileButton}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    aria-expanded={showProfileMenu}
                    aria-haspopup="true"
                >
                    <span className={styles.userName}>
                        {user.userName || 'User'}
                    </span>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </button>
                {showProfileMenu && (
                    <div 
                        className={styles.profileMenu}
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                    >
                        <button 
                            onClick={() => handleNavigation('/wallet')} 
                            className={styles.menuItem}
                            role="menuitem"
                        >
                            My Wallet
                        </button>
                        <button 
                            onClick={() => handleNavigation('/profile')} 
                            className={styles.menuItem}
                            role="menuitem"
                        >
                            Profile
                        </button>
                        <button 
                            onClick={() => handleNavigation('/admin/tickets')} 
                            className={styles.menuItem}
                            role="menuitem"
                        >
                            Ticket Management
                        </button>
                        <button 
                            onClick={handleLogout} 
                            className={styles.menuItem}
                            role="menuitem"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserMenu