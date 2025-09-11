import { toastService } from './toastService'

export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  status?: number
  code?: string
}

export class HttpError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.code = code
  }
}

class HttpClient {
  private baseURL: string
  private timeout: number
  private defaultHeaders: HeadersInit

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || '/api'
    this.timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 10000
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private getHeaders(): HeadersInit {
    const headers = { ...this.defaultHeaders }
    
    // Add authorization token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const controller = new AbortController()
    
    // Set timeout
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, this.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type')
      const isJson = contentType && contentType.includes('application/json')

      let responseData: any
      if (isJson) {
        responseData = await response.json()
      } else {
        responseData = await response.text()
      }

      if (!response.ok) {
        // Handle different error status codes
        let errorMessage = 'An error occurred'
        
        if (isJson && responseData?.message) {
          errorMessage = responseData.message
        } else if (typeof responseData === 'string') {
          errorMessage = responseData
        }

        // Handle specific status codes
        switch (response.status) {
          case 401:
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('auth_token')
            errorMessage = 'Your session has expired. Please log in again.'
            // Note: In a real app, you might want to redirect to login here
            break
          case 403:
            errorMessage = 'You do not have permission to perform this action.'
            break
          case 404:
            errorMessage = 'The requested resource was not found.'
            break
          case 429:
            errorMessage = 'Too many requests. Please try again later.'
            break
          case 500:
            errorMessage = 'A server error occurred. Please try again later.'
            break
          default:
            if (response.status >= 500) {
              errorMessage = 'A server error occurred. Please try again later.'
            } else if (response.status >= 400) {
              errorMessage = errorMessage || 'An error occurred with your request.'
            }
        }

        throw new HttpError(errorMessage, response.status, responseData?.code)
      }

      return responseData
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof HttpError) {
        throw error
      }
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new HttpError('Request timed out. Please try again.', 408)
        }
        
        // Network or other errors
        if (!navigator.onLine) {
          throw new HttpError('No internet connection. Please check your connection and try again.', 0)
        }
        
        throw new HttpError('Network error. Please check your connection and try again.', 0)
      }
      
      throw new HttpError('An unexpected error occurred.', 0)
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...options,
    })
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...options,
    })
  }

  // Utility method to handle requests with toast notifications
  async requestWithToast<T>(
    request: () => Promise<T>,
    options?: {
      loadingMessage?: string
      successMessage?: string | ((data: T) => string)
      errorMessage?: string | ((error: Error) => string)
      showSuccess?: boolean
    }
  ): Promise<T> {
    const {
      loadingMessage = 'Processing...',
      successMessage,
      errorMessage,
      showSuccess = true,
    } = options || {}

    return toastService.promise(
      request(),
      {
        loading: loadingMessage,
        success: (data) => {
          if (typeof successMessage === 'function') {
            return successMessage(data)
          }
          return successMessage || 'Operation completed successfully'
        },
        error: (error) => {
          if (typeof errorMessage === 'function') {
            return errorMessage(error)
          }
          if (error instanceof HttpError) {
            return errorMessage || error.message
          }
          return errorMessage || 'An error occurred'
        },
      }
    )
  }

  // Method to set auth token
  setAuthToken(token: string) {
    localStorage.setItem('auth_token', token)
  }

  // Method to clear auth token
  clearAuthToken() {
    localStorage.removeItem('auth_token')
  }

  // Method to get current auth token
  getAuthToken(): string | null {
    return localStorage.getItem('auth_token')
  }
}

// Export singleton instance
export const httpClient = new HttpClient()
export default httpClient