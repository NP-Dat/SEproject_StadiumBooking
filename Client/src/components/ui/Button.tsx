import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  className = '',
  type = 'button'
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ].join(' ')
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
