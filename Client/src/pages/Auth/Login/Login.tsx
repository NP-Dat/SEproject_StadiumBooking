import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { LoginCredentials } from '../../../types/auth'
import { useAuth } from '../../../hooks/useAuth'
import styles from '../Auth.module.css'

// Login component that handles user authentication
const Login = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  
  const { login, error, isLoading } = useAuth()
  const navigate = useNavigate()

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(credentials)
  }

  // Open the forgot password modal
  const openForgotPasswordModal = () => {
    setIsModalOpen(true)
  }

  // Close the forgot password modal
  const closeForgotPasswordModal = () => {
    setIsModalOpen(false)
  }

  // Handle forgot password submission
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement password reset functionality here
    alert(`Password reset email sent to ${forgotEmail}`)
    closeForgotPasswordModal()
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>Welcome Back</h1>
          <p className={styles.authSubtitle}>Sign in to your account</p>
        </div>
        
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={credentials.email}
            onChange={handleChange}
            required
            name="email"
          />
          
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={credentials.password}
            onChange={handleChange}
            required
            name="password"
          />
          
          <div className={styles.forgotPassword} onClick={openForgotPasswordModal}>
            Forgot password?
          </div>
          
          <div className={styles.formActions}>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
        
        <div className={styles.switchAuth}>
          Don't have an account?{' '}
          <Link to="/register" className={styles.switchAuthLink}>
            Sign up
          </Link>
        </div>
      </div>
      
      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.modalClose} onClick={closeForgotPasswordModal}>
              ×
            </button>
            <div className={styles.modalBody}>
              <h2 className={styles.authTitle}>Reset Password</h2>
              <p className={styles.authSubtitle}>
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <form onSubmit={handleForgotPassword} className={styles.form}>
                <Input
                  id="forgotEmail"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
                
                <div className={styles.formActions}>
                  <Button type="submit">
                    Send Reset Link
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login 