import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Payment.module.css';
import { useAuth } from '../../../contexts/AuthContext';
import PaymentService from '../../../services/PaymentService';

interface Wallet {
  id: number;
  userID: number;
  balance: string;
  status: string | null;
}

interface Transaction {
  id: number;
  amount: number;
  date: string;
  type: 'add' | 'payment';
  description: string;
}

const WalletPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [addAmount, setAddAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        if (!user?.id) {
          throw new Error('User not authenticated');
        }
        
        setLoading(true);
        const response = await PaymentService.getWalletBalance(parseInt(user.id));
        
        if (response.success) {
          setWallet({
            id: parseInt(user.id),
            userID: parseInt(user.id),
            balance: response.balance.toString(),
            status: 'active'
          });
        } else {
          throw new Error(response.message || 'Failed to fetch wallet data');
        }
        
      } catch (err) {
        console.error('Error fetching wallet data:', err);
        setError('Failed to load wallet information');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWalletData();
  }, [user]);

  const handleAddFunds = async () => {
    try {
      if (!user?.id || addAmount <= 0) {
        setError('Please enter a valid amount');
        return;
      }
      
      setLoading(true);
      const response = await PaymentService.addFundsToWallet(parseInt(user.id), addAmount);
      
      if (response.success) {
        setWallet(prev => prev ? {
          ...prev,
          balance: response.balance.toString()
        } : null);
        
        setSuccess(`Successfully added $${addAmount.toFixed(2)} to your wallet`);
        setAddAmount(0);
        
        // Refresh wallet data
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } else {
        throw new Error(response.message || 'Failed to add funds');
      }
      
    } catch (err) {
      console.error('Error adding funds:', err);
      setError('Failed to add funds to wallet');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !wallet) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <p>Loading wallet information...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.paymentContainer}>
        <div className={styles.paymentCard}>
          <h1 className={styles.title}>Wallet Management</h1>
          <div className={styles.errorMessage}>
            <p>You need to be logged in to access your wallet.</p>
            <button 
              className={styles.primaryButton} 
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentCard}>
        <h1 className={styles.title}>Wallet Management</h1>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}
        
        <div className={styles.walletSection}>
          <h2>Your Wallet</h2>
          <div className={styles.balanceRow}>
            <span className={styles.balanceLabel}>Current Balance:</span>
            <span className={styles.balanceValue}>
              ${wallet ? parseFloat(wallet.balance).toFixed(2) : '0.00'}
            </span>
          </div>
        </div>
        
        <div className={styles.addFundsSection}>
          <h2>Add Funds to Wallet</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="amount">Amount to Add</label>
            <input
              id="amount"
              type="number"
              min="1"
              placeholder="Enter amount"
              value={addAmount || ''}
              onChange={(e) => setAddAmount(Number(e.target.value))}
              className={styles.amountInput}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button 
              className={styles.primaryButton}
              onClick={handleAddFunds}
              disabled={addAmount <= 0 || loading}
            >
              {loading ? 'Processing...' : 'Add Funds'}
            </button>
          </div>
        </div>
        
        {transactions.length > 0 && (
          <div className={styles.transactionSection}>
            <h2>Transaction History</h2>
            <div className={styles.transactionList}>
              {transactions.map((transaction) => (
                <div key={transaction.id} className={styles.transactionItem}>
                  <div className={styles.transactionInfo}>
                    <span className={styles.transactionType}>
                      {transaction.type === 'add' ? 'Added Funds' : 'Payment'}
                    </span>
                    <span className={styles.transactionDate}>
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.transactionAmount}>
                    <span className={transaction.type === 'add' ? styles.amountPositive : styles.amountNegative}>
                      {transaction.type === 'add' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className={styles.buttonGroup} style={{ marginTop: '2rem' }}>
          <button 
            className={styles.outlineButton}
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;