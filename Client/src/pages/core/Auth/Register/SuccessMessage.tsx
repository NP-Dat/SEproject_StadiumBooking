import React from 'react'
import styles from './Register.module.css'

export function SuccessMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.successMessage}>
      {children}
    </div>
  )
} 