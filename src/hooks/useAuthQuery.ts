import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authService, User, AuthStatus } from '../services/authService'
import { useToast } from './useToast'

// Query keys for auth operations
export const authQueryKeys = {
  all: ['auth'] as const,
  status: () => [...authQueryKeys.all, 'status'] as const,
  profile: () => [...authQueryKeys.all, 'profile'] as const,
}

/**
 * Hook for checking authentication status
 */
export const useAuthStatusQuery = () => {
  return useQuery({
    queryKey: authQueryKeys.status(),
    queryFn: () => authService.checkAuthStatus(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}

/**
 * Hook for fetching user profile
 */
export const useUserProfileQuery = (enabled = true) => {
  return useQuery({
    queryKey: authQueryKeys.profile(),
    queryFn: () => authService.getProfile(),
    enabled: enabled && authService.isAuthenticated(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry if unauthorized
      if (error?.status === 401) return false
      return failureCount < 2
    },
  })
}

/**
 * Hook for login mutation (send verification code)
 */
export const useLoginMutation = () => {
  const toast = useToast()

  return useMutation({
    mutationFn: ({ email }: { email: string }) => 
      authService.sendVerificationCode(email),
    onSuccess: (data, variables) => {
      toast.success(
        data.message || 'Verification code sent! Check your email.',
        { duration: 6000 }
      )
    },
    onError: (error: any) => {
      const message = error?.message || 'Failed to send verification code. Please try again.'
      toast.error(message)
    },
  })
}

/**
 * Hook for verify code mutation
 */
export const useVerifyCodeMutation = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      authService.verifyCode(email, code),
    onSuccess: (data) => {
      // Update auth status cache
      queryClient.setQueryData(authQueryKeys.status(), {
        isAuthenticated: true,
        user: data.user,
      })
      
      // Set user profile cache
      queryClient.setQueryData(authQueryKeys.profile(), data.user)
      
      // Invalidate and refetch auth queries
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all })
      
      toast.success('Login successful! Welcome back.')
    },
    onError: (error: any) => {
      const message = error?.message || 'Invalid verification code. Please try again.'
      toast.error(message)
    },
  })
}

/**
 * Hook for logout mutation
 */
export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.setQueryData(authQueryKeys.status(), {
        isAuthenticated: false,
        user: null,
      })
      queryClient.removeQueries({ queryKey: authQueryKeys.profile() })
      
      // Clear all cached data for security
      queryClient.clear()
      
      toast.info('You have been logged out successfully.')
    },
    onError: (error: any) => {
      // Even if logout fails on server, clear local state
      queryClient.setQueryData(authQueryKeys.status(), {
        isAuthenticated: false,
        user: null,
      })
      queryClient.removeQueries({ queryKey: authQueryKeys.profile() })
      queryClient.clear()
      
      console.error('Logout failed:', error)
      toast.warning('Logout completed locally.')
    },
  })
}

/**
 * Hook for refresh token mutation
 */
export const useRefreshTokenMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.refreshToken(),
    onSuccess: () => {
      // Invalidate auth queries to refetch with new token
      queryClient.invalidateQueries({ queryKey: authQueryKeys.all })
    },
    onError: (error: any) => {
      // If refresh fails, logout user
      queryClient.setQueryData(authQueryKeys.status(), {
        isAuthenticated: false,
        user: null,
      })
      queryClient.clear()
    },
  })
}

/**
 * Combined hook that provides all auth query operations
 */
export const useAuthQueries = () => {
  const authStatusQuery = useAuthStatusQuery()
  const userProfileQuery = useUserProfileQuery(authStatusQuery.data?.isAuthenticated)
  const loginMutation = useLoginMutation()
  const verifyCodeMutation = useVerifyCodeMutation()
  const logoutMutation = useLogoutMutation()
  const refreshTokenMutation = useRefreshTokenMutation()

  return {
    // Queries
    authStatus: authStatusQuery,
    userProfile: userProfileQuery,
    
    // Mutations
    login: loginMutation,
    verifyCode: verifyCodeMutation,
    logout: logoutMutation,
    refreshToken: refreshTokenMutation,
    
    // Computed states
    isAuthenticated: authStatusQuery.data?.isAuthenticated ?? false,
    user: userProfileQuery.data ?? authStatusQuery.data?.user ?? null,
    isLoading: authStatusQuery.isLoading || userProfileQuery.isLoading,
    isInitialized: !authStatusQuery.isLoading,
  }
}