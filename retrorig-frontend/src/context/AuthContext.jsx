import React, { createContext, useContext, useState, useEffect } from 'react'

// Create Auth Context for managing user authentication state
const AuthContext = createContext()

// Custom hook to use Auth Context - provides easy access to auth state
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Auth Provider Component - wraps app to provide auth state globally
export const AuthProvider = ({ children }) => {
  // State for current user and loading status
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('retrorig_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        localStorage.removeItem('retrorig_user')
      }
    }
    setLoading(false)
  }, [])

  // Login function - would integrate with API
  const login = async (email, password) => {
    try {
      // Mock login logic - replace with actual API call
      const userData = {
        id: 1,
        name: 'Test User',
        email: email,
        phone: '+92 300 1234567',
        userType: 'individual', // or 'shop'
        avatar: '/api/placeholder/100/100'
      }
      
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('retrorig_user', JSON.stringify(userData))
      
      return { success: true, user: userData }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      // Mock registration - replace with API call
      const newUser = {
        id: Date.now(),
        ...userData,
        userType: 'individual',
        avatar: '/api/placeholder/100/100'
      }
      
      setUser(newUser)
      setIsAuthenticated(true)
      localStorage.setItem('retrorig_user', JSON.stringify(newUser))
      
      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('retrorig_user')
  }

  // Update user profile
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('retrorig_user', JSON.stringify(updatedUser))
  }

  // Auth context value - all auth-related data and functions
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}