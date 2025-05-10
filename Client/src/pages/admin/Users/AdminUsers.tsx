import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { userAPI } from '../../../apis/services'
import type { User } from '../../../types/auth'
import styles from './AdminUsers.module.css'

export function AdminUsers() {
    const navigate = useNavigate()
    const { isAdmin } = useAuth()
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if (!isAdmin) {
            navigate('/')
            return
        }

        const fetchUsers = async () => {
            try {
                setIsLoading(true)
                setError('')
                const response = await userAPI.getAllUsers()
                if (response.success && response.data) {
                    setUsers(response.data)
                } else {
                    setError('Failed to fetch users')
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch users')
            } finally {
                setIsLoading(false)
            }
        }

        fetchUsers()
    }, [isAdmin, navigate])

    if (!isAdmin) {
        return null
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>User Management</h1>
                <button 
                    className={styles.addButton}
                    onClick={() => navigate('/admin/users/new')}
                >
                    Add New User
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {isLoading ? (
                <div className={styles.loading}>Loading users...</div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className={styles.actionButton}
                                            onClick={() => navigate(`/admin/users/${user.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={`${styles.actionButton} ${styles.deleteButton}`}
                                            onClick={() => {/* TODO: Implement delete */}}
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
        </div>
    )
} 