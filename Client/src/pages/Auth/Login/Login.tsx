import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../../services/AuthService';
import styles from './Login.module.css';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';

interface LoginProps {
    onClose: () => void;
    onSwitchToRegister: () => void;
    onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSwitchToRegister, onLogin }) => {
    const { login: authLogin } = AuthService.useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');  // Clear previous errors
        setLoading(true);
        
        // Admin login bypass
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('userId', 'admin');
            localStorage.setItem('token', 'admin-token');
            localStorage.setItem('userName', 'Administrator');
            
            // Navigate to admin dashboard
            navigate('/admin/dashboard');
            return;
        }
        
        if (!username) {
            setError('Please enter your username');
            setLoading(false);
            return;
        }
        if (!password) {
            setError('Please enter your password');
            setLoading(false);
            return;
        }

        try {
            // Regular user login
            const result = await authLogin(username, password);
            
            if (result.success) {
                onLogin(username, password);
                onClose();
            } else {
                setError(result.message);
            }
        } catch (err: unknown) {
            console.error('Login error:', err);
            
            // Try to extract more specific error message
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose} tabIndex={0}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.modalHeader}>
                    <h2 className={styles.title}>Welcome Back</h2>
                    <p className={styles.subtitle}>Sign in to continue to your account</p>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <Input
                            id="username"
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        onClick={onSwitchToRegister}
                        className={styles.switchButton}
                    >
                        Create New Account
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;