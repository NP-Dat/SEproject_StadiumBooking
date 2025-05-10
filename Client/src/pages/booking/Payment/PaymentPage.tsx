import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Payment.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import PaymentService from '../../../services/PaymentService';

interface BookingDetails {
  eventId: string;
  zoneName: string;
  quantity: number;
  price: number;
  total: string;
  cartId?: number;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [addFundsAmount, setAddFundsAmount] = useState<number>(0);
  const [showAddFunds, setShowAddFunds] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        if (!user?.id) {
          throw new Error('User not authenticated');
        }
        
        const response = await PaymentService.getWalletBalance(user.id);
        setWalletBalance(response.balance);
      } catch (err) {
        console.error('Error fetching wallet balance:', err);
        setError('Failed to fetch wallet balance');
      }
    };
    
    const getBookingDetails = () => {
      // Get booking details from localStorage
      const bookingData = localStorage.getItem('currentBooking');
      if (bookingData) {
        setBookingDetails(JSON.parse(bookingData));
      } else {
        setError('No booking details found');
        setTimeout(() => {
          navigate('/events');
        }, 3000);
      }
    };
    
    const init = async () => {
      setLoading(true);
      getBookingDetails();
      if (user?.id) {
        await fetchWalletBalance();
      }
      setLoading(false);
    };
    
    init();
  }, [user, navigate]);
  
  const handleAddFunds = async () => {
    try {
      if (!user?.id || addFundsAmount <= 0) {
        return;
      }
      
      await PaymentService.addFundsToWallet(user.id, addFundsAmount);
      // Refresh balance
      const response = await PaymentService.getWalletBalance(user.id);
      setWalletBalance(response.balance);
      setShowAddFunds(false);
      setAddFundsAmount(0);
    } catch (err) {
      console.error('Error adding funds:', err);
      setError('Failed to add funds to wallet');
    }
  };
  
  const handlePayment = async () => {
    try {
      if (!user?.id || !bookingDetails) {
        return;
      }
      
      // Calculate total price
      const totalPrice = parseFloat(bookingDetails.total);
      
      // Check if user has enough balance
      if (walletBalance < totalPrice) {
        setError('Insufficient balance. Please add funds to your wallet.');
        setShowAddFunds(true);
        return;
      }
      
      // Process payment
      const paymentResult = await PaymentService.processPayment(
        user.id,
        bookingDetails.cartId || 0, // Fallback if cartId is not available
        totalPrice
      );
      
      if (paymentResult.success) {
        // Clear booking data from localStorage
        localStorage.removeItem('currentBooking');
        
        // Navigate to success page
        navigate('/payment/success', { 
          state: { 
            paymentId: paymentResult.paymentId,
            amount: totalPrice 
          } 
        });
      } else {
        setError('Payment failed');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('Payment processing failed');
    }
  };
  
  if (loading) {
    return <div className={styles.loading}>Loading payment details...</div>;
  }
  
  if (!user) {
    return (
      <div className={styles.error}>
        <p>You need to be logged in to make a payment.</p>
        <button className={styles.button} onClick={() => navigate('/login')}>Log in</button>
      </div>
    );
  }
  
  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentCard}>
        <h1 className={styles.title}>Complete Your Payment</h1>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        {bookingDetails && (
          <div className={styles.bookingDetails}>
            <h2>Booking Summary</h2>
            <div className={styles.detailRow}>
              <span className={styles.label}>Event:</span>
              <span className={styles.value}>{bookingDetails.eventId}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Zone:</span>
              <span className={styles.value}>{bookingDetails.zoneName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Tickets:</span>
              <span className={styles.value}>{bookingDetails.quantity}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Price per ticket:</span>
              <span className={styles.value}>${bookingDetails.price}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Total Amount:</span>
              <span className={styles.value}>${bookingDetails.total}</span>
            </div>
          </div>
        )}
        
        <div className={styles.walletSection}>
          <h2>Wallet</h2>
          <div className={styles.balanceRow}>
            <span className={styles.balanceLabel}>Current Balance:</span>
            <span className={styles.balanceValue}>${walletBalance.toFixed(2)}</span>
          </div>
          
          {bookingDetails && parseFloat(bookingDetails.total) > walletBalance && (
            <div className={styles.insufficientFunds}>
              <span>Insufficient funds for this purchase</span>
              <button 
                className={styles.addFundsButton}
                onClick={() => setShowAddFunds(true)}
              >
                Add Funds
              </button>
            </div>
          )}
        </div>
        
        {showAddFunds && (
          <div className={styles.addFundsSection}>
            <h2>Add Funds to Wallet</h2>
            <div className={styles.inputGroup}>
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="number"
                min="1"
                placeholder="Enter amount"
                value={addFundsAmount || ''}
                onChange={(e) => setAddFundsAmount(Number(e.target.value))}
                className={styles.amountInput}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button 
                className={styles.outlineButton}
                onClick={() => setShowAddFunds(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.secondaryButton}
                onClick={handleAddFunds}
                disabled={addFundsAmount <= 0}
              >
                Add Funds
              </button>
            </div>
          </div>
        )}
        
        <div className={styles.actionButtons}>
          <button 
            className={styles.outlineButton}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button 
            className={styles.primaryButton}
            onClick={handlePayment}
            disabled={
              !bookingDetails || 
              (bookingDetails && parseFloat(bookingDetails.total) > walletBalance)
            }
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;