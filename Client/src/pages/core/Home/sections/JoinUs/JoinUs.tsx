import { type FC, useState } from 'react';
import styles from "./JoinUs.module.css";
import Button from "../../../../../components/ui/Button/Button";
import Input from "../../../../../components/ui/Input/Input";

interface FormData {
    fullName: string;
    email: string;
    password: string;
}

const benefits: string[] = [
    "Exclusive access to premium events",
    "Early bird ticket discounts",
    "Member-only promotions",
    "Priority customer support",
    "Special event notifications"
];

const JoinUs: FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        password: ''
    });

    const handleInputChange = (id: keyof FormData, value: string): void => {
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <section className={styles.joinUs}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Join Our Community</h2>
                    <p className={styles.description}>
                        Become part of our exclusive community and unlock a world of premium sports and entertainment experiences.
                    </p>
                    <div className={styles.benefitsList}>
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className={styles.benefitItem}
                            >
                                <span className={styles.benefitIcon}>✓</span>
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.formContainer}>
                    <h3 className={styles.formTitle}>Create Your Account</h3>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Input
                            id="fullName"
                            label="Full Name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            required
                        />
                        <Input
                            id="email"
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                        />
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            className={styles.submitButton}
                        >
                            Sign Up Now
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default JoinUs;
