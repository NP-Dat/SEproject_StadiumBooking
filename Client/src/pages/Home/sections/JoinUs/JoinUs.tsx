import styles from "./JoinUs.module.css";
import Button from "../../../../components/ui/Button/Button";
import Input from "../../../../components/ui/Input/Input";

const benefits = [
    "Exclusive access to premium events",
    "Early bird ticket discounts",
    "Member-only promotions",
    "Priority customer support",
    "Special event notifications"
];

const JoinUs = () => {
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
                    <form className={styles.form}>
                        <Input
                            id="fullName"
                            label="Full Name"
                            type="text"
                            placeholder="Enter your full name"
                            value=""
                            onChange={() => {}}
                            required
                        />
                        <Input
                            id="email"
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            value=""
                            onChange={() => {}}
                            required
                        />
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                            value=""
                            onChange={() => {}}
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
