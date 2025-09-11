import { authService } from './authService'
import { httpClient } from './httpClient'

// Mock the httpClient
jest.mock('./httpClient', () => ({
  httpClient: {
    post: jest.fn(),
    get: jest.fn(),
    setAuthToken: jest.fn(),
    clearAuthToken: jest.fn(),
    getAuthToken: jest.fn(),
  },
}))

const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('sendVerificationCode', () => {
    it('sends verification code to email', async () => {
      const mockResponse = { data: { message: 'Code sent' } }
      mockHttpClient.post.mockResolvedValue(mockResponse)

      const result = await authService.sendVerificationCode('test@example.com')

      expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('handles errors when sending verification code', async () => {
      mockHttpClient.post.mockRejectedValue(new Error('Network error'))

      await expect(authService.sendVerificationCode('test@example.com'))
        .rejects.toThrow('Network error')
    })
  })

  describe('verifyCode', () => {
    it('verifies code and sets auth token', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        isVerified: true,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      }
      const mockResponse = {
        data: {
          user: mockUser,
          token: 'auth-token',
          expiresAt: '2023-12-31',
        },
      }
      mockHttpClient.post.mockResolvedValue(mockResponse)

      const result = await authService.verifyCode('test@example.com', '123456')

      expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/verify', {
        email: 'test@example.com',
        code: '123456',
      })
      expect(mockHttpClient.setAuthToken).toHaveBeenCalledWith('auth-token')
      expect(result).toEqual(mockResponse.data)
    })

    it('handles invalid verification code', async () => {
      mockHttpClient.post.mockRejectedValue(new Error('Invalid code'))

      await expect(authService.verifyCode('test@example.com', '000000'))
        .rejects.toThrow('Invalid code')
    })
  })

  describe('getProfile', () => {
    it('gets user profile', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        isVerified: true,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      }
      const mockResponse = { data: mockUser }
      mockHttpClient.get.mockResolvedValue(mockResponse)

      const result = await authService.getProfile()

      expect(mockHttpClient.get).toHaveBeenCalledWith('/auth/profile')
      expect(result).toEqual(mockUser)
    })

    it('handles profile fetch error', async () => {
      mockHttpClient.get.mockRejectedValue(new Error('Unauthorized'))

      await expect(authService.getProfile()).rejects.toThrow('Unauthorized')
    })
  })

  describe('logout', () => {
    it('logs out successfully', async () => {
      mockHttpClient.post.mockResolvedValue({ data: {} })

      await authService.logout()

      expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/logout')
      expect(mockHttpClient.clearAuthToken).toHaveBeenCalled()
    })

    it('clears token even when logout request fails', async () => {
      mockHttpClient.post.mockRejectedValue(new Error('Server error'))
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      await authService.logout()

      expect(mockHttpClient.clearAuthToken).toHaveBeenCalled()
      expect(consoleSpy).toHaveBeenCalledWith('Logout request failed:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })
  })

  describe('checkAuthStatus', () => {
    it('returns authenticated status when token exists and profile loads', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        isVerified: true,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      }
      mockHttpClient.getAuthToken.mockReturnValue('valid-token')
      mockHttpClient.get.mockResolvedValue({ data: mockUser })

      const result = await authService.checkAuthStatus()

      expect(result).toEqual({
        isAuthenticated: true,
        user: mockUser,
      })
    })

    it('returns unauthenticated status when no token exists', async () => {
      mockHttpClient.getAuthToken.mockReturnValue(null)

      const result = await authService.checkAuthStatus()

      expect(result).toEqual({
        isAuthenticated: false,
      })
    })

    it('returns unauthenticated status when profile fetch fails', async () => {
      mockHttpClient.getAuthToken.mockReturnValue('invalid-token')
      mockHttpClient.get.mockRejectedValue(new Error('Unauthorized'))

      const result = await authService.checkAuthStatus()

      expect(result).toEqual({
        isAuthenticated: false,
      })
      expect(mockHttpClient.clearAuthToken).toHaveBeenCalled()
    })
  })

  describe('refreshToken', () => {
    it('refreshes auth token', async () => {
      const mockResponse = { data: { token: 'new-token' } }
      mockHttpClient.post.mockResolvedValue(mockResponse)

      const result = await authService.refreshToken()

      expect(mockHttpClient.post).toHaveBeenCalledWith('/auth/refresh')
      expect(mockHttpClient.setAuthToken).toHaveBeenCalledWith('new-token')
      expect(result).toBe('new-token')
    })
  })

  describe('utility methods', () => {
    it('clears auth', () => {
      authService.clearAuth()
      expect(mockHttpClient.clearAuthToken).toHaveBeenCalled()
    })

    it('gets token', () => {
      mockHttpClient.getAuthToken.mockReturnValue('test-token')
      const result = authService.getToken()
      expect(result).toBe('test-token')
    })

    it('checks if authenticated', () => {
      mockHttpClient.getAuthToken.mockReturnValue('test-token')
      const result = authService.isAuthenticated()
      expect(result).toBe(true)

      mockHttpClient.getAuthToken.mockReturnValue(null)
      const result2 = authService.isAuthenticated()
      expect(result2).toBe(false)
    })
  })
})