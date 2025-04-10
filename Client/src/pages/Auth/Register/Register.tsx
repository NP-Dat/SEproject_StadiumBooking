import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { RegisterData } from '../../../types/auth'
import { useAuth } from '../../../hooks/useAuth'
import styles from '../Auth.module.css'

// Register component that handles user registration
const Register = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  
  const { register, error, isLoading } = useAuth()

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }))
    
    // Clear password error when typing
    if (id === 'password' || id === 'confirmPassword') {
      setPasswordError('')
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }
    
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }
    
    await register(formData)
    setIsModalOpen(true)
  }

  // Close the success modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>Create Account</h1>
          <p className={styles.authSubtitle}>Sign up to get started</p>
        </div>
        
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            id="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={passwordError}
            required
          />
          
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={passwordError}
            required
          />
          
          <div className={styles.formActions}>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
        
        <div className={styles.switchAuth}>
          Already have an account?{' '}
          <Link to="/login" className={styles.switchAuthLink}>
            Sign in
          </Link>
        </div>
      </div>
      
      {/* Success Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.modalClose} onClick={closeModal}>
              ×
            </button>
            <div className={styles.modalBody}>
              <h2 className={styles.authTitle}>Account Created!</h2>
              <p className={styles.authSubtitle}>
                Your account has been created successfully. You can now sign in with your credentials.
              </p>
              
              <div className={styles.formActions}>
                <Link to="/login">
                  <Button>
                    Go to Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register 