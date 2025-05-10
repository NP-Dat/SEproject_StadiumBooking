import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Payment.module.css';

interface LocationState {
  paymentId: string;
  amount: number;
}

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  useEffect(() => {
    // Redirect to home if accessed directly without payment data
    if (!state?.paymentId) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [state, navigate]);
  
  if (!state?.paymentId) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <p>No payment information found. Redirecting...</p>
      </div>
    );
  }
  
  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentCard}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>✓</div>
          <h2>Payment Successful!</h2>
          <p className={styles.value}>
            Your payment of ${state.amount.toFixed(2)} has been processed successfully.
          </p>
          <div className={styles.detailRow}>
            <span className={styles.label}>Payment ID:</span>
            <span className={styles.value}>{state.paymentId}</span>
          </div>
          <p className={styles.label} style={{ marginTop: '1rem' }}>
            You will receive a confirmation email shortly with your ticket details.
          </p>
          <div className={styles.buttonGroup} style={{ marginTop: '2rem' }}>
            <button
              className={styles.outlineButton}
              onClick={() => navigate('/')}
            >
              Return to Home
            </button>
            <button
              className={styles.primaryButton}
              onClick={() => navigate('/tickets')}
            >
              View My Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;