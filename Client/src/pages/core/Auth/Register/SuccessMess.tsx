import React from 'react';
import styles from './Register.module.css';

export const SuccessMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.successMessage}>
      {children}
    </div>
  );
};
