import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Simple validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // For demo purposes, just set a token
        localStorage.setItem('token', 'demo-token');
        navigate('/dashboard');
    };

    return (
        <div className={styles.auth}>
            <div className={styles.container}>
                <h1 className={styles.title}>Log In</h1>
                <p className={styles.subtitle}>Sign in to your account</p>

                <div className={styles.formCard}>
                    {error && <div className={styles.error}>{error}</div>}

                    <form onSubmit={handleSubmit}>
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

                        <div className={styles.formFooter}>
                            <button type="submit" className={styles.submitButton}>
                                Log In
                            </button>
                        </div>
                    </form>

                    <div className={styles.linkContainer}>
                        <p>
                            Don't have an account?{' '}
                            <span
                                className={styles.link}
                                onClick={() => navigate('/register')}
                            >
                                Sign up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login; 