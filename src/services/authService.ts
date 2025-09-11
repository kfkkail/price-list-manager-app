import { httpClient, ApiResponse } from './httpClient'

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
}

export interface LoginResponse {
  message: string
  userId?: string
}

export interface VerifyCodeRequest {
  email: string
  code: string
}

export interface VerifyCodeResponse {
  user: User
  token: string
  expiresAt: string
}

export interface AuthStatus {
  isAuthenticated: boolean
  user?: User
}

/**
 * Authentication service that handles all auth-related API calls
 */
export class AuthService {
  private readonly endpoints = {
    login: '/auth/login',
    verify: '/auth/verify',
    profile: '/auth/profile',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  }

  /**
   * Send verification code to email
   */
  async sendVerificationCode(email: string): Promise<LoginResponse> {
    const response = await httpClient.post<ApiResponse<LoginResponse>>(
      this.endpoints.login,
      { email }
    )
    
    return response.data
  }

  /**
   * Verify the code sent to email and authenticate user
   */
  async verifyCode(email: string, code: string): Promise<VerifyCodeResponse> {
    const response = await httpClient.post<ApiResponse<VerifyCodeResponse>>(
      this.endpoints.verify,
      { email, code }
    )

    // Store the auth token
    if (response.data.token) {
      httpClient.setAuthToken(response.data.token)
    }

    return response.data
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    const response = await httpClient.get<ApiResponse<User>>(
      this.endpoints.profile
    )
    
    return response.data
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await httpClient.post<ApiResponse<void>>(this.endpoints.logout)
    } catch (error) {
      // Even if logout fails on server, we should clear local auth
      console.warn('Logout request failed:', error)
    } finally {
      // Always clear local auth token
      httpClient.clearAuthToken()
    }
  }

  /**
   * Check if user is currently authenticated
   */
  async checkAuthStatus(): Promise<AuthStatus> {
    const token = httpClient.getAuthToken()
    
    if (!token) {
      return { isAuthenticated: false }
    }

    try {
      const user = await this.getProfile()
      return {
        isAuthenticated: true,
        user,
      }
    } catch (error) {
      // Token is invalid or expired
      httpClient.clearAuthToken()
      return { isAuthenticated: false }
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<string> {
    const response = await httpClient.post<ApiResponse<{ token: string }>>(
      this.endpoints.refresh
    )
    
    const newToken = response.data.token
    httpClient.setAuthToken(newToken)
    
    return newToken
  }

  /**
   * Clear local authentication data
   */
  clearAuth(): void {
    httpClient.clearAuthToken()
  }

  /**
   * Get current auth token
   */
  getToken(): string | null {
    return httpClient.getAuthToken()
  }

  /**
   * Check if user is authenticated (based on local token only)
   */
  isAuthenticated(): boolean {
    return !!httpClient.getAuthToken()
  }
}

// Export singleton instance
export const authService = new AuthService()
export default authService