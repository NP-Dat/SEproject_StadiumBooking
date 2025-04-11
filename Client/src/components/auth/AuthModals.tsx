import React, { useState } from 'react';
import { LoginCredentials, RegisterData } from '../../types/auth';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../ui/Modal';
import styles from './AuthModals.module.css';

interface AuthModalsProps {
  loginOpen: boolean;
  registerOpen: boolean;
  onCloseLogin: () => void;
  onCloseRegister: () => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
}

const AuthModals: React.FC<AuthModalsProps> = ({
  loginOpen,
  registerOpen,
  onCloseLogin,
  onCloseRegister,
  onSwitchToRegister,
  onSwitchToLogin
}) => {
  // Login State
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  
  // Register State
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Forgot Password State
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  
  const { login, register, error, isLoading } = useAuth();

  // Handle login input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle register input changes
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
    if (!error) {
      onCloseLogin();
    }
  };

  // Handle register form submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      // Handle password mismatch error
      return;
    }
    await register(registerData);
    if (!error) {
      onCloseRegister();
    }
  };

  // Handle forgot password submission
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password reset functionality here
    alert(`Password reset email sent to ${forgotEmail}`);
    setForgotPasswordOpen(false);
  };

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login here
  };

  return (
    <>
      {/* Login Modal */}
      <Modal
        isOpen={loginOpen}
        onClose={onCloseLogin}
        title="Welcome Back"
      >
        <div className={styles.modalBody}>
          <p className={styles.subtitle}>Sign in to your account to access bookings, favorites, and personalized recommendations</p>
          
          {error && (
            <div className={styles.error}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}
          
          <form onSubmit={handleLoginSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                <span className={styles.labelIcon}>📧</span> Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={credentials.email}
                onChange={handleLoginChange}
                required
                name="email"
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                <span className={styles.labelIcon}>🔒</span> Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleLoginChange}
                required
                name="password"
                className={styles.input}
              />
              <span 
                className={styles.forgotPassword} 
                onClick={() => setForgotPasswordOpen(true)}
              >
                Forgot password?
              </span>
            </div>
            
            <div className={styles.formActions}>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className={styles.divider}>or continue with</div>
          
          <div className={styles.socialAuth}>
            <button 
              className={styles.socialButton}
              onClick={() => handleSocialLogin('google')}
              type="button"
              aria-label="Login with Google"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className={styles.socialIcon}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button 
              className={styles.socialButton}
              onClick={() => handleSocialLogin('facebook')}
              type="button"
              aria-label="Login with Facebook"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className={styles.socialIcon}>
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button 
              className={styles.socialButton}
              onClick={() => handleSocialLogin('apple')}
              type="button"
              aria-label="Login with Apple"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className={styles.socialIcon}>
                <path fill="#000000" d="M16.365 12.789c-.01-2.9 2.371-4.312 2.48-4.379-1.347-1.957-3.437-2.226-4.183-2.251-1.782-.137-3.474 1.047-4.372 1.047-.91 0-2.313-1.026-3.802-1-1.956.032-3.755 1.137-4.755 2.88-2.031 3.5-.518 8.672 1.454 11.505.958 1.397 2.116 2.958 3.624 2.899 1.445-.052 1.996-.942 3.749-.942 1.736 0 2.236.942 3.749.916 1.556-.026 2.54-1.412 3.487-2.818 1.102-1.607 1.551-3.165 1.578-3.245-.033-.01-3.028-1.166-3.059-4.612zm-2.869-8.464c.804-.973 1.346-2.325 1.195-3.675-1.153.05-2.549.772-3.364 1.74-.736.858-1.384 2.229-1.214 3.543 1.298.096 2.628-.663 3.383-1.608z"/>
              </svg>
            </button>
          </div>
          
          <div className={styles.switchAuth}>
            Don't have an account?{' '}
            <button 
              className={styles.switchAuthLink}
              onClick={onSwitchToRegister}
              type="button"
            >
              Sign up
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Register Modal */}
      <Modal
        isOpen={registerOpen}
        onClose={onCloseRegister}
        title="Create Account"
      >
        <div className={styles.modalBody}>
          <p className={styles.subtitle}>Join us to enjoy exclusive benefits, easy bookings, and special offers</p>
          
          {error && (
            <div className={styles.error}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}
          
          <form onSubmit={handleRegisterSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                <span className={styles.labelIcon}>👤</span> Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={registerData.name}
                onChange={handleRegisterChange}
                required
                name="name"
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="registerEmail" className={styles.label}>
                <span className={styles.labelIcon}>📧</span> Email Address
              </label>
              <input
                id="registerEmail"
                type="email"
                placeholder="you@example.com"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
                name="email"
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="registerPassword" className={styles.label}>
                <span className={styles.labelIcon}>🔒</span> Password
              </label>
              <input
                id="registerPassword"
                type="password"
                placeholder="••••••••"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
                name="password"
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                <span className={styles.labelIcon}>🔒</span> Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
                name="confirmPassword"
                className={styles.input}
              />
            </div>
            
            <div className={styles.formActions}>
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
          
          <div className={styles.divider}>or continue with</div>
          
          <div className={styles.socialAuth}>
            <button 
              className={styles.socialButton}
              onClick={() => handleSocialLogin('google')}
              type="button"
              aria-label="Sign up with Google"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className={styles.socialIcon}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button 
              className={styles.socialButton}
              onClick={() => handleSocialLogin('facebook')}
              type="button"
              aria-label="Sign up with Facebook"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className={styles.socialIcon}>
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button 
              className={styles.socialButton}
              onClick={() => handleSocialLogin('apple')}
              type="button"
              aria-label="Sign up with Apple"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" className={styles.socialIcon}>
                <path fill="#000000" d="M16.365 12.789c-.01-2.9 2.371-4.312 2.48-4.379-1.347-1.957-3.437-2.226-4.183-2.251-1.782-.137-3.474 1.047-4.372 1.047-.91 0-2.313-1.026-3.802-1-1.956.032-3.755 1.137-4.755 2.88-2.031 3.5-.518 8.672 1.454 11.505.958 1.397 2.116 2.958 3.624 2.899 1.445-.052 1.996-.942 3.749-.942 1.736 0 2.236.942 3.749.916 1.556-.026 2.54-1.412 3.487-2.818 1.102-1.607 1.551-3.165 1.578-3.245-.033-.01-3.028-1.166-3.059-4.612zm-2.869-8.464c.804-.973 1.346-2.325 1.195-3.675-1.153.05-2.549.772-3.364 1.74-.736.858-1.384 2.229-1.214 3.543 1.298.096 2.628-.663 3.383-1.608z"/>
              </svg>
            </button>
          </div>
          
          <div className={styles.switchAuth}>
            Already have an account?{' '}
            <button 
              className={styles.switchAuthLink}
              onClick={onSwitchToLogin}
              type="button"
            >
              Sign in
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        title="Reset Password"
      >
        <div className={styles.modalBody}>
          <p className={styles.subtitle}>
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          <form onSubmit={handleForgotPassword} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="forgotEmail" className={styles.label}>
                <span className={styles.labelIcon}>📧</span> Email Address
              </label>
              <input
                id="forgotEmail"
                type="email"
                placeholder="you@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.formActions}>
              <button type="submit">
                Send Reset Link
              </button>
            </div>
          </form>
          
          <div className={styles.switchAuth}>
            Remember your password?{' '}
            <button 
              className={styles.switchAuthLink}
              onClick={() => setForgotPasswordOpen(false)}
              type="button"
            >
              Back to sign in
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AuthModals; 