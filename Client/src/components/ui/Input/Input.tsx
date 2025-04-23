import React from 'react'
import styles from './Input.module.css'

interface InputProps {
  id: string
  label?: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
  name?: string
}

const Input = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  name
}: InputProps) => {
  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span>*</span>}
        </label>
      )}
      <input
        id={id}
        name={name || id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`${styles.input} ${error ? styles.error : ''} ${className}`}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  )
}

export default Input
