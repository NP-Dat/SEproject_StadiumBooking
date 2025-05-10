import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentAPI } from '../../../apis/services';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Payment.module.css';

interface BookingDetails {
  eventId: string;
  zoneName: string;
  quantity: number;
  price: number;
  total: string;
  cartId?: number;
}

function PaymentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [walletBalance, setWalletBalance] = useState(0);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addFundsAmount, setAddFundsAmount] = useState(0);
  const [showAddFunds, setShowAddFunds] = useState(false);
  
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        if (!user?.id) {
          throw new Error('User not authenticated');
        }
        
        const response = await paymentAPI.getBalance();
        if (response.success && response.data) {
          setWalletBalance(response.data.balance);
          setError(null);
        } else {
          throw new Error(response.error || 'Failed to fetch wallet balance');
        }
      } catch (err) {
        console.error('Error fetching wallet balance:', err);
        setError('Failed to fetch wallet balance');
        setWalletBalance(0);
      }
    };
    
    const getBookingDetails = () => {
      const bookingData = localStorage.getItem('currentBooking');
      if (bookingData) {
        setBookingDetails(JSON.parse(bookingData));
        setError(null);
      } else {
        setError('No booking details found');
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
      
      const response = await paymentAPI.addFunds(addFundsAmount);
      if (response.success) {
        const balanceResponse = await paymentAPI.getBalance();
        if (balanceResponse.success && balanceResponse.data) {
          setWalletBalance(balanceResponse.data.balance);
        }
        setShowAddFunds(false);
        setAddFundsAmount(0);
      } else {
        throw new Error(response.error || 'Failed to add funds');
      }
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
      
      const totalPrice = parseFloat(bookingDetails.total);
      
      if (walletBalance < totalPrice) {
        setError('Insufficient balance. Please add funds to your wallet.');
        setShowAddFunds(true);
        return;
      }
      
      localStorage.removeItem('currentBooking');
      navigate('/payment/success', { 
        state: { 
          paymentId: 'temp-payment-id',
          amount: totalPrice 
        } 
      });
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('Payment processing failed');
    }
  };
  
  return (
    <div className={styles.paymentContainer}>
      <h1>Complete Your Payment</h1>
      
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
      
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p>Loading payment details...</p>
        </div>
      ) : (
        <div className={styles.paymentDetails}>
          {bookingDetails && (
            <div className={styles.paymentSummary}>
              <h2>Booking Summary</h2>
              <div className={styles.bookingDetails}>
                <div className={styles.bookingItem}>
                  <span>Event:</span>
                  <span>{bookingDetails.eventId}</span>
                </div>
                <div className={styles.bookingItem}>
                  <span>Zone:</span>
                  <span>{bookingDetails.zoneName}</span>
                </div>
                <div className={styles.bookingItem}>
                  <span>Tickets:</span>
                  <span>{bookingDetails.quantity}</span>
                </div>
                <div className={styles.bookingItem}>
                  <span>Price per ticket:</span>
                  <span>${bookingDetails.price}</span>
                </div>
                <div className={`${styles.bookingItem} ${styles.totalAmount}`}>
                  <span>Total Amount:</span>
                  <span>${bookingDetails.total}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className={styles.walletSection}>
            <h2>Wallet</h2>
            <div className={styles.balanceInfo}>
              <span>Current Balance:</span>
              <span className={styles.balanceAmount}>${walletBalance.toFixed(2)}</span>
            </div>
            
            <button 
              className={styles.addFundsButton} 
              onClick={() => setShowAddFunds(!showAddFunds)}
            >
              {showAddFunds ? 'Hide' : 'Add Funds'}
            </button>
            
            {showAddFunds && (
              <div className={styles.addFundsForm}>
                <input
                  type="number"
                  min="1"
                  placeholder="Amount to add"
                  value={addFundsAmount || ''}
                  onChange={(e) => setAddFundsAmount(Number(e.target.value))}
                  className={styles.amountInput}
                />
                <button 
                  className={styles.confirmAddButton}
                  onClick={handleAddFunds}
                  disabled={addFundsAmount <= 0}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
          
          <div className={styles.paymentActions}>
            <button 
              className={styles.cancelButton}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button 
              className={styles.payButton}
              onClick={handlePayment}
              disabled={!bookingDetails || 
                       (bookingDetails && parseFloat(bookingDetails.total) > walletBalance)}
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;