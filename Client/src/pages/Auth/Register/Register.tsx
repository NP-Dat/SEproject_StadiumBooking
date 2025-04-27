import React, { useState } from 'react';
import styles from './Register.module.css';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import { AuthService } from '../../../services/AuthService';

interface RegisterProps {
    onClose: () => void;
    onSwitchToLogin: () => void;
    onRegister: (email: string, password: string, username: string, fullname: string, birth: string, phonenumber: string, address: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onClose, onSwitchToLogin, onRegister }) => {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birth, setBirth] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate all required fields
        if (!username || !fullname || !email || !password || !confirmPassword || !birth || !phonenumber || !address) {
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
                username,
                password,
                fullname,
                birth,
                phonenumber,
                email,
                address
            });

            if (authState.error) {
                setError(authState.error);
                return;
            }

            onRegister(username, email, password, fullname, birth, phonenumber, address);
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
                            id="username"
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                            required
                        />
                        <Input
                            id="fullname"
                            label="Full Name"
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
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
                            id="birth"
                            label="Date of Birth"
                            type="date"
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                            required
                        />
                        <Input
                            id="phonenumber"
                            label="Phone Number"
                            type="tel"
                            value={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                            placeholder="Enter your phone number"
                            required
                        />
                        <Input
                            id="address"
                            label="Address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
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
                                id="terms-checkbox"
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