import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/ui/Modal/Modal';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login form submitted:', formData);
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <div className={styles.authHeader}>
                    <h1 className={styles.authTitle}>Welcome Back</h1>
                    <p className={styles.authSubtitle}>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        id="login-email"
                        type="email"
                        label="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Input
                        id="login-password"
                        type="password"
                        label="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />

                    <div className={styles.formActions}>
                        <Button type="submit" variant="primary" fullWidth>
                            Sign In
                        </Button>
                        <button 
                            type="button" 
                            className={styles.forgotPassword}
                            onClick={() => {/* Handle forgot password */}}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <div className={styles.divider}>or</div>

                    <div className={styles.switchAuth}>
                        Don't have an account?{' '}
                        <button 
                            type="button" 
                            onClick={() => navigate('/register')} 
                            className={styles.switchAuthLink}
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login; 