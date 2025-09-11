import { HttpClient, HttpError } from './httpClient'
import type { ApiResponse } from '../types'

// Mock fetch
global.fetch = jest.fn()
const mockFetch = fetch as jest.MockedFunction<typeof fetch>

// Mock setTimeout and clearTimeout
jest.useFakeTimers()

describe('HttpClient', () => {
  let httpClient: HttpClient

  beforeEach(() => {
    httpClient = new HttpClient()
    mockFetch.mockClear()
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.useFakeTimers()
  })

  describe('constructor', () => {
    it('should initialize with default config', () => {
      const client = new HttpClient()
      expect(client).toBeInstanceOf(HttpClient)
    })

    it('should initialize with custom config', () => {
      const config = {
        baseURL: 'https://api.example.com',
        timeout: 5000,
        headers: { 'Custom-Header': 'value' }
      }
      const client = new HttpClient(config)
      expect(client).toBeInstanceOf(HttpClient)
    })
  })

  describe('successful requests', () => {
    const mockResponse: ApiResponse<any> = {
      success: true,
      data: { id: 1, name: 'test' }
    }

    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse)
      } as any)
    })

    it('should make GET request successfully', async () => {
      const result = await httpClient.get('/test')

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: expect.any(AbortSignal)
      })
      expect(result).toEqual(mockResponse)
    })

    it('should make GET request with query parameters', async () => {
      const params = { page: '1', limit: '10' }
      await httpClient.get('/test', params)

      expect(mockFetch).toHaveBeenCalledWith('/api/test?page=1&limit=10', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: expect.any(AbortSignal)
      })
    })

    it('should make POST request successfully', async () => {
      const data = { name: 'test' }
      const result = await httpClient.post('/test', data)

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: expect.any(AbortSignal)
      })
      expect(result).toEqual(mockResponse)
    })

    it('should make POST request without data', async () => {
      await httpClient.post('/test')

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: undefined,
        signal: expect.any(AbortSignal)
      })
    })

    it('should make PUT request successfully', async () => {
      const data = { name: 'updated' }
      const result = await httpClient.put('/test', data)

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: expect.any(AbortSignal)
      })
      expect(result).toEqual(mockResponse)
    })

    it('should make DELETE request successfully', async () => {
      const result = await httpClient.delete('/test')

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: expect.any(AbortSignal)
      })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('error handling', () => {
    it('should handle HTTP error responses', async () => {
      const errorResponse = {
        message: 'Not found',
        error: 'Resource not found'
      }

      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: jest.fn().mockResolvedValue(errorResponse)
      } as any)

      await expect(httpClient.get('/test')).rejects.toThrow(HttpError)
      await expect(httpClient.get('/test')).rejects.toThrow('Not found')
    })

    it('should handle HTTP error with status message fallback', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({})
      } as any)

      await expect(httpClient.get('/test')).rejects.toThrow('HTTP 500')
    })

    it('should handle timeout errors', async () => {
      // Mock AbortController to simulate timeout
      const mockAbort = jest.fn()
      const originalAbortController = global.AbortController
      
      global.AbortController = jest.fn().mockImplementation(() => ({
        signal: { aborted: false },
        abort: mockAbort
      })) as any

      mockFetch.mockRejectedValue(new DOMException('Aborted', 'AbortError'))

      const promise = httpClient.get('/test')
      
      await expect(promise).rejects.toThrow('Request timeout')
      
      // Restore original
      global.AbortController = originalAbortController
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      await expect(httpClient.get('/test')).rejects.toThrow('Network error')
    })

    it('should handle abort errors', async () => {
      mockFetch.mockRejectedValue(new DOMException('Aborted', 'AbortError'))

      await expect(httpClient.get('/test')).rejects.toThrow('Request timeout')
    })
  })

  describe('authentication', () => {
    it('should set auth token', () => {
      httpClient.setAuthToken('test-token')
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({})
      } as any)

      httpClient.get('/test')

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        signal: expect.any(AbortSignal)
      })
    })

    it('should remove auth token', () => {
      httpClient.setAuthToken('test-token')
      httpClient.removeAuthToken()
      
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({})
      } as any)

      httpClient.get('/test')

      expect(mockFetch).toHaveBeenCalledWith('/api/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: expect.any(AbortSignal)
      })
    })
  })

  describe('HttpError', () => {
    it('should create HttpError with all properties', () => {
      const error = new HttpError(404, 'Not found', { details: 'test' })
      
      expect(error.name).toBe('HttpError')
      expect(error.status).toBe(404)
      expect(error.message).toBe('Not found')
      expect(error.response).toEqual({ details: 'test' })
      expect(error).toBeInstanceOf(Error)
    })

    it('should create HttpError without response', () => {
      const error = new HttpError(500, 'Server error')
      
      expect(error.name).toBe('HttpError')
      expect(error.status).toBe(500)
      expect(error.message).toBe('Server error')
      expect(error.response).toBeUndefined()
    })
  })
})