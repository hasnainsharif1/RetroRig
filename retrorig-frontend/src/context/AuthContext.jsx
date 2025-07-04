// src/contexts/AuthContext.jsx
import React, { createContext, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, registerUser, logoutUser, clearError } from '../store/slices/authSlice'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { user, token, isAuthenticated, loading, error } = useSelector(state => state.auth)

  const login = async (credentials) => {
    return dispatch(loginUser(credentials))
  }

  const register = async (userData) => {
    return dispatch(registerUser(userData))
  }

  const logout = async () => {
    return dispatch(logoutUser())
  }

  const clearAuthError = () => {
    dispatch(clearError())
  }

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    clearError: clearAuthError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext