import React, { CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  to?: string
  replace?: boolean
  external?: boolean
  isLoading?: boolean
  style?: CSSProperties
  fullWidth?: boolean
}

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  to,
  replace = false,
  external = false,
  isLoading = false,
  style
}: ButtonProps) => {
  const navigate = useNavigate()
  
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    isLoading ? styles.loading : '',
    className
  ].join(' ').trim()
  
  // Handle combined navigation and onClick
  const handleClick = (e: React.MouseEvent) => {
    if (disabled || isLoading) return
    
    if (onClick) {
      onClick()
    }
    
    if (to && !external) {
      e.preventDefault()
      navigate(to, { replace })
    }
  }
  
  // Loading indicator
  const loadingIndicator = isLoading && (
    <span className={styles.spinner} aria-hidden="true"></span>
  )
  
  // Regular button (no navigation)
  if (!to) {
    return (
      <button
        type={type}
        className={buttonClasses}
        onClick={handleClick}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        style={style}
      >
        {isLoading ? (
          <>
            {loadingIndicator}
            {children}
          </>
        ) : children}
      </button>
    )
  }
  
  // External link
  if (external) {
    return (
      <a
        href={to}
        className={buttonClasses}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled || isLoading}
        aria-busy={isLoading}
        style={style}
      >
        {isLoading ? (
          <>
            {loadingIndicator}
            {children}
          </>
        ) : children}
      </a>
    )
  }
  
  // Internal navigation with React Router
  return (
    <Link
      to={to}
      className={buttonClasses}
      onClick={handleClick}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      tabIndex={disabled || isLoading ? -1 : undefined}
      style={style}
    >
      {isLoading ? (
        <>
          {loadingIndicator}
          {children}
        </>
      ) : children}
    </Link>
  )
}

export default Button
