import type { ApiResponse } from '../types'

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public response?: any
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export interface HttpClientConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

export class HttpClient {
  private baseURL: string
  private timeout: number
  private defaultHeaders: Record<string, string>

  constructor(config: HttpClientConfig = {}) {
    this.baseURL = config.baseURL || '/api'
    this.timeout = config.timeout || 10000
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        throw new HttpError(
          response.status,
          data.message || data.error || `HTTP ${response.status}`,
          data
        )
      }

      return data
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof HttpError) {
        throw error
      }
      
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new HttpError(408, 'Request timeout')
      }
      
      throw new HttpError(0, 'Network error')
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint
    return this.request<T>(url, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  removeAuthToken() {
    delete this.defaultHeaders['Authorization']
  }
}

// Default instance
export const httpClient = new HttpClient()