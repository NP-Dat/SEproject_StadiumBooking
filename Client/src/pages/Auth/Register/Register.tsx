import React, { useState } from 'react';
import styles from './Register.module.css';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import { AuthService } from '../../../services/AuthService';


interface RegisterProps {
    onClose: () => void;
    onSwitchToLogin: () => void;
    onRegister: (email: string, password: string, name: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onClose, onSwitchToLogin, onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!agreed) {
            setError('Please agree to the terms and conditions');
            return;
        }

        try {
            const authState = await AuthService.register({
                username: name,  // Map name to username
                email,
                password
            });

            if (authState.error) {
                setError(authState.error);
                return;
            }

            onRegister(email, password, name);  // Changed from name to username
            onClose();
        } catch {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.modalHeader}>
                    <h2 className={styles.title}>Create Account</h2>
                    <p className={styles.subtitle}>Join us to start booking your events</p>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <Input
                            id="name"
                            label="Full Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
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
                            placeholder="Create a password"
                            required
                        />
                        <Input
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <div className={styles.agreement}>
                        <label className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                required
                            />
                            <span className={styles.checkmark}></span>
                            <span className={styles.agreementText}>
                                I agree to the{' '}
                                <a href="/terms" className={styles.termsLink}>
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="/privacy" className={styles.termsLink}>
                                    Privacy Policy
                                </a>
                            </span>
                        </label>
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        className={styles.submitButton}
                    >
                        Create Account
                    </Button>
                    <div className={styles.divider}>
                        <span>or</span>
                    </div>
                    <Button
                        variant="outline"
                        onClick={onSwitchToLogin}
                        className={styles.switchButton}
                    >
                        Sign In to Existing Account
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Register; 