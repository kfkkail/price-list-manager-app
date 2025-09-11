import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authService, User } from '../services/authService'
import { useToast } from '../hooks/useToast'

export interface AuthContextType {
  // State
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  
  // Actions
  login: (email: string) => Promise<void>
  verifyCode: (email: string, code: string) => Promise<void>
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
  checkAuthStatus: () => Promise<void>
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isInitialized: false,
  })

  const toast = useToast()

  const updateAuthState = useCallback((updates: Partial<AuthState>) => {
    setState((current) => ({ ...current, ...updates }))
  }, [])

  const checkAuthStatus = useCallback(async () => {
    try {
      updateAuthState({ isLoading: true })
      
      const authStatus = await authService.checkAuthStatus()
      
      updateAuthState({
        user: authStatus.user || null,
        isAuthenticated: authStatus.isAuthenticated,
        isInitialized: true,
        isLoading: false,
      })
    } catch (error) {
      console.error('Auth status check failed:', error)
      updateAuthState({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
        isLoading: false,
      })
    }
  }, [updateAuthState])

  const login = useCallback(async (email: string) => {
    try {
      updateAuthState({ isLoading: true })
      
      const response = await authService.sendVerificationCode(email)
      
      toast.success(
        response.message || 'Verification code sent! Check your email.',
        { duration: 6000 }
      )
    } catch (error) {
      let errorMessage = 'Failed to send verification code. Please try again.'
      
      if (error instanceof Error) {
        errorMessage = error.message
      }
      
      toast.error(errorMessage)
      throw error
    } finally {
      updateAuthState({ isLoading: false })
    }
  }, [updateAuthState, toast])

  const verifyCode = useCallback(async (email: string, code: string) => {
    try {
      updateAuthState({ isLoading: true })
      
      const response = await authService.verifyCode(email, code)
      
      updateAuthState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      })
      
      toast.success('Login successful! Welcome back.')
    } catch (error) {
      let errorMessage = 'Invalid verification code. Please try again.'
      
      if (error instanceof Error) {
        errorMessage = error.message
      }
      
      updateAuthState({ isLoading: false })
      toast.error(errorMessage)
      throw error
    }
  }, [updateAuthState, toast])

  const logout = useCallback(async () => {
    try {
      updateAuthState({ isLoading: true })
      
      await authService.logout()
      
      updateAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
      
      toast.info('You have been logged out successfully.')
    } catch (error) {
      // Even if logout fails, clear local state
      updateAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
      
      console.error('Logout failed:', error)
      toast.warning('Logout completed locally.')
    }
  }, [updateAuthState, toast])

  const refreshProfile = useCallback(async () => {
    if (!state.isAuthenticated) {
      return
    }

    try {
      const user = await authService.getProfile()
      updateAuthState({ user })
    } catch (error) {
      console.error('Failed to refresh profile:', error)
      
      // If profile refresh fails due to invalid token, logout
      if (error instanceof Error && error.message.includes('401')) {
        await logout()
      }
    }
  }, [state.isAuthenticated, updateAuthState, logout])

  // Initialize auth status on mount
  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  // Set up periodic token refresh (optional)
  useEffect(() => {
    if (!state.isAuthenticated) {
      return
    }

    // Refresh profile every 30 minutes to keep session active
    const interval = setInterval(() => {
      refreshProfile()
    }, 30 * 60 * 1000) // 30 minutes

    return () => clearInterval(interval)
  }, [state.isAuthenticated, refreshProfile])

  const value: AuthContextType = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    isInitialized: state.isInitialized,
    login,
    verifyCode,
    logout,
    refreshProfile,
    checkAuthStatus,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}