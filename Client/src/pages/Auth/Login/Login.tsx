import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginModal from '../../../components/auth/LoginModal'
import RegisterModal from '../../../components/auth/RegisterModal'
import styles from '../Auth.module.css'

const Login = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const navigate = useNavigate()

  const openLoginModal = () => {
    setIsRegisterModalOpen(false)
    setIsLoginModalOpen(true)
  }

  const openRegisterModal = () => {
    setIsLoginModalOpen(false)
    setIsRegisterModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
    navigate('/')
  }

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false)
    navigate('/')
  }

  return (
    <>
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal} 
        onRegisterClick={openRegisterModal} 
      />

      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={closeRegisterModal} 
        onLoginClick={openLoginModal} 
      />
    </>
  )
}

export default Login 