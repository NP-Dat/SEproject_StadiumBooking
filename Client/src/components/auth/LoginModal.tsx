import React, { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { LoginCredentials } from '../../services/authService'
import apiService from '../../services/apiService'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onRegisterClick: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onRegisterClick }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await apiService.auth.login(credentials)
      onClose()
      // Redirect or update app state after successful login
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Log in to your account" 
      variant="auth"
    >
      <div className="auth-modal-content">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message" style={{
              color: '#e11d48',
              backgroundColor: '#fef2f2',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}
          
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label 
              htmlFor="email" 
              style={{ 
                display: 'block', 
                marginBottom: '0.375rem', 
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#4b5563'
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.625rem',
                borderRadius: '0.375rem',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <label 
                htmlFor="password" 
                style={{ 
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#4b5563'
                }}
              >
                Password
              </label>
              <a 
                href="#" 
                onClick={(e) => e.preventDefault()} 
                style={{ 
                  fontSize: '0.75rem', 
                  color: '#2563eb', 
                  textDecoration: 'none' 
                }}
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.625rem',
                borderRadius: '0.375rem',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
          
          <Button 
            type="submit" 
            variant="primary" 
            size="medium" 
            isLoading={loading}
            className="w-full mb-5"
            style={{ width: '100%', marginBottom: '1.25rem' }}
          >
            Log in
          </Button>
        </form>
        
        <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
          Don't have an account?{' '}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault()
              onClose()
              onRegisterClick()
            }}
            style={{ 
              color: '#2563eb', 
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Sign up
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default LoginModal 