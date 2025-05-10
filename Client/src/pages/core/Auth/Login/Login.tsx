import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../contexts/AuthContext'
import styles from './Login.module.css'
import Button from '../../../../components/ui/Button/Button'
import Input from '../../../../components/ui/Input/Input'
import type { LoginCredentials } from '../../../../types/auth'

interface LoginProps {
    onClose?: () => void
    onSwitchToRegister?: () => void
    onLogin?: () => void
}

export function Login({ onClose, onSwitchToRegister, onLogin }: LoginProps) {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState<LoginCredentials>({
        userName: '',
        passWord: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        
        if (!credentials.userName) {
            setError('Please enter your username')
            setLoading(false)
            return
        }
        if (!credentials.passWord) {
            setError('Please enter your password')
            setLoading(false)
            return
        }

        try {
            const result = await login(credentials)
            if (result.success) {
                if (result.data?.user.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
                if (onLogin) onLogin()
                if (onClose) onClose()
            } else {
                setError(result.error || 'Login failed')
            }
        } catch (err) {
            console.error('Login error:', err)
            setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.title}>Welcome Back</h2>
                    <p className={styles.subtitle}>Sign in to continue to your account</p>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <Input
                            id="userName"
                            name="userName"
                            label="Username"
                            type="text"
                            value={credentials.userName}
                            onChange={handleInputChange}
                            placeholder="Enter your username"
                            required
                        />
                        <Input
                            id="passWord"
                            name="passWord"
                            label="Password"
                            type="password"
                            value={credentials.passWord}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className={styles.forgotPassword}>
                        <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                            Forgot Password?
                        </Link>
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                    <div className={styles.divider}>
                        <span>or</span>
                    </div>
                    <Button
                        variant="outline"
                        onClick={onSwitchToRegister ? onSwitchToRegister : () => navigate('/register')}
                        className={styles.switchButton}
                    >
                        Create New Account
                    </Button>
                </form>
                {onClose && (
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close">×</button>
                )}
            </div>
        </div>
    )
}