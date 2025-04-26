import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import { AuthService } from '../../../services/AuthService';
import axios from 'axios';

interface LoginProps {
    onClose: () => void;
    onSwitchToRegister: () => void;
    onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSwitchToRegister, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');  // Clear previous errors
        
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        if (!password) {
            setError('Please enter your password');
            return;
        }

        try {
            const response = await AuthService.login({email, password});
            
            // The server is down or there's no internet connection
            if (!response) {
                setError('Unable to connect to the server. Please try again later.');
                return;
            }

            // The server responded successfully (HTTP 200)
            // But the response object doesn't contain a token property
            // This is unusual because normally the server should:
            //      Either send a successful response WITH a token
            //      Or throw an error that would be caught in the catch block
            // 
            if (!response.token) {
                setError('Authentication failed. Please try again.');
                return;
            }
            
            AuthService.setToken(response.token);
            onLogin(email, password);
            onClose();
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message;
                switch(errorMessage) {
                    case 'Invalid credentials':
                        setError('Incorrect email or password. Please try again.');
                        break;
                    case 'Email and password are required':
                        setError('Please fill in both email and password.');
                        break;
                    case 'User not found':
                        setError('No account found with this email. Please check your email or register.');
                        break;
                    default:
                        setError(errorMessage || 'Unable to sign in. Please try again.');
                }
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
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
                            id="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
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
                    >
                        Sign In
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