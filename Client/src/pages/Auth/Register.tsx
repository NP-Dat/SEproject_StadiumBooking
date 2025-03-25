import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Simple validation
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // For demo purposes, just set a token
        localStorage.setItem('token', 'demo-token');
        navigate('/dashboard');
    };

    return (
        <div className={styles.auth}>
            <div className={styles.container}>
                <h1 className={styles.title}>Register</h1>
                <p className={styles.subtitle}>Create your account</p>

                <div className={styles.formCard}>
                    {error && <div className={styles.error}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.label}>Full Name</label>
                            <input
                                type="text"
                                id="name"
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <input
                                type="password"
                                id="password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className={styles.input}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <div className={styles.formFooter}>
                            <button type="submit" className={styles.submitButton}>
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className={styles.linkContainer}>
                        <p>
                            Already have an account?{' '}
                            <span
                                className={styles.link}
                                onClick={() => navigate('/login')}
                            >
                                Log in
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register; 