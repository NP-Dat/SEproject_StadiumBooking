import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../contexts/AuthContext'
import styles from './Register.module.css'
import Button from '../../../../components/ui/Button/Button'
import Input from '../../../../components/ui/Input/Input'
import { SuccessMessage } from './SuccessMessage'
import type { RegisterCredentials } from '../../../../types/auth'

interface RegisterProps {
    onClose?: () => void
    onSwitchToLogin?: () => void
    onRegister?: () => void
}

export function Register({ onClose, onSwitchToLogin, onRegister }: RegisterProps) {
    const { register } = useAuth()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        userName: '',
        email: '',
        passWord: '',
        fullName: '',
        birth: '',
        phoneNumber: '',
        address: ''
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (!credentials.userName || !credentials.email || !credentials.passWord || 
            !confirmPassword || !credentials.fullName || !credentials.birth || 
            !credentials.phoneNumber || !credentials.address) {
            setError('Please fill in all fields')
            setLoading(false)
            return
        }

        if (credentials.passWord !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        try {
            const result = await register(credentials)
            if (result.success && result.data?.user) {
                setSuccess(true)
                if (onRegister) onRegister()
                if (onClose) onClose()
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else {
                setError(result.error || 'Registration failed')
            }
        } catch (err) {
            console.error('Registration error:', err)
            setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'confirmPassword') {
            setConfirmPassword(value)
        } else {
            setCredentials(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    if (success) {
        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <SuccessMessage>
                        <h2>Registration Successful!</h2>
                        <p>Redirecting to login page...</p>
                    </SuccessMessage>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.title}>Create Account</h2>
                    <p className={styles.subtitle}>Sign up to get started</p>
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
                            placeholder="Choose a username"
                            required
                        />
                        <Input
                            id="fullName"
                            name="fullName"
                            label="Full Name"
                            type="text"
                            value={credentials.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                        />
                        <Input
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={credentials.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                        />
                        <Input
                            id="birth"
                            name="birth"
                            label="Date of Birth"
                            type="date"
                            value={credentials.birth}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            type="tel"
                            value={credentials.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            required
                        />
                        <Input
                            id="address"
                            name="address"
                            label="Address"
                            type="text"
                            value={credentials.address}
                            onChange={handleInputChange}
                            placeholder="Enter your address"
                            required
                        />
                        <Input
                            id="passWord"
                            name="passWord"
                            label="Password"
                            type="password"
                            value={credentials.passWord}
                            onChange={handleInputChange}
                            placeholder="Create a password"
                            required
                        />
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                    <div className={styles.divider}>
                        <span>or</span>
                    </div>
                    <Button
                        variant="outline"
                        onClick={onSwitchToLogin ? onSwitchToLogin : () => navigate('/login')}
                        className={styles.switchButton}
                    >
                        Sign In Instead
                    </Button>
                </form>
                {onClose && (
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close">×</button>
                )}
            </div>
        </div>
    )
}