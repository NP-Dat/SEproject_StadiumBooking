import styles from "./LoginPage.module.css"
import iconLinks from "../../assets/icons/iconLinks.json"


const LoginPage = () => {
    return(
        <div className={styles.login}>
            <div className={styles.container}>
                <div>
                    <h2 className={styles.title}>Webify.Co</h2>
                        <p className={styles.quote}>
                            Your perfect seat is just a click away! Secure your spot now and never miss a moment of the action.
                        </p>
                        <div className={styles.iconContainer}>
                            <img src={iconLinks.Cloud} alt="Cloud Icon 1" className={styles.cloudIcon1} />
                            <img src={iconLinks.Rocket} alt="Rocket Icon" className={styles.rocketIcon} />
                            <img src={iconLinks.Cloud} alt="Cloud Icon 2" className={styles.cloudIcon2} />
                        </div>
                </div>

                <div className={styles.formContainer}>
                    <div>
                        <h3 className={styles.formTitle}>Login Your Account</h3>
                            <form className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Username or Email</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="Enter your username or email"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Password</label>
                                    <input
                                        type="password"
                                        className={styles.input}
                                        placeholder="Create a password"
                                    />
                                </div>
                                <button type="submit" className={styles.submitButton}>
                                    Login Now
                                </button>
                            </form>
                            <div className={styles.extraOptions}>
                                <p className={styles.optionText}>Not yet a member? <a href="/signup" className={styles.link}>Sign up here</a></p>
                                <p className={styles.optionText}><a href="/forgot-password" className={styles.link}>Forgot your password?</a></p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage