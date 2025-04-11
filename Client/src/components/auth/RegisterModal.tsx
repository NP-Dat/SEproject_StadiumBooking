import React, { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { RegisterData } from '../../services/authService'
import apiService from '../../services/apiService'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginClick: () => void
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onLoginClick }) => {
  const [userData, setUserData] = useState<RegisterData & { confirmPassword: string }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    
    // Validate password match
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    setLoading(true)

    try {
      // Send only required fields to the API
      const { confirmPassword, ...registerData } = userData
      await apiService.auth.register(registerData)
      onClose()
      // Optionally redirect to login or auto-login the user
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Create an account" 
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
              htmlFor="name" 
              style={{ 
                display: 'block', 
                marginBottom: '0.375rem', 
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#4b5563'
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
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
              value={userData.email}
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
          
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label 
              htmlFor="password" 
              style={{ 
                display: 'block', 
                marginBottom: '0.375rem', 
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#4b5563'
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              minLength={6}
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
            <label 
              htmlFor="confirmPassword" 
              style={{ 
                display: 'block', 
                marginBottom: '0.375rem', 
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#4b5563'
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
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
          >
            Sign up
          </Button>
        </form>
        
        <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
          Already have an account?{' '}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault()
              onClose()
              onLoginClick()
            }}
            style={{ 
              color: '#2563eb', 
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Log in
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default RegisterModal 