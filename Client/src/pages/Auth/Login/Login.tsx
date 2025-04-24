import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';

interface LoginProps {
    onClose: () => void;
    onSwitchToRegister: () => void;
    onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSwitchToRegister, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        onLogin(email, password);
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