import { PriceListService } from './priceListService'
import type { PriceList, CreatePriceListRequest, ApiResponse } from '../types'

// Mock the httpClient
jest.mock('./httpClient', () => ({
  httpClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    setAuthToken: jest.fn(),
    removeAuthToken: jest.fn(),
  }
}))

import { httpClient } from './httpClient'
const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>

describe('PriceListService', () => {
  let service: PriceListService

  beforeEach(() => {
    // Create a fresh instance for each test
    service = new PriceListService()
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllPriceLists', () => {
    it('should fetch all price lists successfully', async () => {
      const mockResponse: ApiResponse<PriceList[]> = {
        success: true,
        data: [
          {
            id: 1,
            name: 'Test Price List',
            created_at: '2024-01-15T10:30:00Z' as any,
            updated_at: '2024-01-20T14:45:00Z' as any,
          }
        ],
        count: 1,
      }

      mockHttpClient.get.mockResolvedValue(mockResponse)

      const result = await service.getAllPriceLists()

      expect(mockHttpClient.get).toHaveBeenCalledWith('/price-lists', {})
      expect(result.success).toBe(true)
      expect(result.data).toHaveLength(1)
      expect(result.data![0].name).toBe('Test Price List')
      // Check that dates are transformed to Date objects
      expect(result.data![0].created_at).toBeInstanceOf(Date)
      expect(result.data![0].updated_at).toBeInstanceOf(Date)
    })

    it('should handle query parameters correctly', async () => {
      const mockResponse: ApiResponse<PriceList[]> = {
        success: true,
        data: [],
        count: 0,
      }

      mockHttpClient.get.mockResolvedValue(mockResponse)

      const params = {
        page: 1,
        limit: 10,
        sort: { field: 'name' as const, direction: 'asc' as const },
        filter: { search: 'test' },
      }

      await service.getAllPriceLists(params)

      expect(mockHttpClient.get).toHaveBeenCalledWith('/price-lists', {
        page: '1',
        limit: '10',
        sort_field: 'name',
        sort_direction: 'asc',
        search: 'test',
      })
    })

    it('should handle date filter parameters', async () => {
      const mockResponse: ApiResponse<PriceList[]> = {
        success: true,
        data: [],
        count: 0,
      }

      mockHttpClient.get.mockResolvedValue(mockResponse)

      const dateFrom = new Date('2024-01-01')
      const dateTo = new Date('2024-01-31')

      const params = {
        filter: { dateFrom, dateTo },
      }

      await service.getAllPriceLists(params)

      expect(mockHttpClient.get).toHaveBeenCalledWith('/price-lists', {
        date_from: dateFrom.toISOString(),
        date_to: dateTo.toISOString(),
      })
    })
  })

  describe('getPriceListById', () => {
    it('should fetch a single price list successfully', async () => {
      const mockResponse: ApiResponse<PriceList> = {
        success: true,
        data: {
          id: 1,
          name: 'Test Price List',
          created_at: '2024-01-15T10:30:00Z' as any,
          updated_at: '2024-01-20T14:45:00Z' as any,
        },
      }

      mockHttpClient.get.mockResolvedValue(mockResponse)

      const result = await service.getPriceListById(1)

      expect(mockHttpClient.get).toHaveBeenCalledWith('/price-lists/1')
      expect(result.success).toBe(true)
      expect(result.data!.id).toBe(1)
      expect(result.data!.name).toBe('Test Price List')
      // Check that dates are transformed to Date objects
      expect(result.data!.created_at).toBeInstanceOf(Date)
      expect(result.data!.updated_at).toBeInstanceOf(Date)
    })
  })

  describe('createPriceList', () => {
    it('should create a price list successfully', async () => {
      const createRequest: CreatePriceListRequest = {
        name: 'New Price List',
      }

      const mockResponse: ApiResponse<PriceList> = {
        success: true,
        data: {
          id: 2,
          name: 'New Price List',
          created_at: '2024-01-25T10:30:00Z' as any,
          updated_at: '2024-01-25T10:30:00Z' as any,
        },
      }

      mockHttpClient.post.mockResolvedValue(mockResponse)

      const result = await service.createPriceList(createRequest)

      expect(mockHttpClient.post).toHaveBeenCalledWith('/price-lists', createRequest)
      expect(result.success).toBe(true)
      expect(result.data!.id).toBe(2)
      expect(result.data!.name).toBe('New Price List')
      // Check that dates are transformed to Date objects
      expect(result.data!.created_at).toBeInstanceOf(Date)
      expect(result.data!.updated_at).toBeInstanceOf(Date)
    })
  })

  describe('updatePriceList', () => {
    it('should update a price list successfully', async () => {
      const updateRequest = {
        name: 'Updated Price List',
      }

      const mockResponse: ApiResponse<PriceList> = {
        success: true,
        data: {
          id: 1,
          name: 'Updated Price List',
          created_at: '2024-01-15T10:30:00Z' as any,
          updated_at: '2024-01-25T11:30:00Z' as any,
        },
      }

      mockHttpClient.put.mockResolvedValue(mockResponse)

      const result = await service.updatePriceList(1, updateRequest)

      expect(mockHttpClient.put).toHaveBeenCalledWith('/price-lists/1', updateRequest)
      expect(result.success).toBe(true)
      expect(result.data!.name).toBe('Updated Price List')
      // Check that dates are transformed to Date objects
      expect(result.data!.created_at).toBeInstanceOf(Date)
      expect(result.data!.updated_at).toBeInstanceOf(Date)
    })
  })

  describe('deletePriceList', () => {
    it('should delete a price list successfully', async () => {
      const mockResponse: ApiResponse<void> = {
        success: true,
        message: 'Price list deleted successfully',
      }

      mockHttpClient.delete.mockResolvedValue(mockResponse)

      const result = await service.deletePriceList(1)

      expect(mockHttpClient.delete).toHaveBeenCalledWith('/price-lists/1')
      expect(result.success).toBe(true)
      expect(result.message).toBe('Price list deleted successfully')
    })
  })

  describe('checkNameAvailability', () => {
    it('should check name availability successfully', async () => {
      const mockResponse: ApiResponse<{ available: boolean }> = {
        success: true,
        data: { available: true },
      }

      mockHttpClient.get.mockResolvedValue(mockResponse)

      const result = await service.checkNameAvailability('Test Name')

      expect(mockHttpClient.get).toHaveBeenCalledWith('/price-lists/check-name', {
        name: 'Test Name',
      })
      expect(result.success).toBe(true)
      expect(result.data!.available).toBe(true)
    })

    it('should check name availability with exclude ID', async () => {
      const mockResponse: ApiResponse<{ available: boolean }> = {
        success: true,
        data: { available: false },
      }

      mockHttpClient.get.mockResolvedValue(mockResponse)

      const result = await service.checkNameAvailability('Existing Name', 5)

      expect(mockHttpClient.get).toHaveBeenCalledWith('/price-lists/check-name', {
        name: 'Existing Name',
        exclude_id: '5',
      })
      expect(result.success).toBe(true)
      expect(result.data!.available).toBe(false)
    })
  })

  describe('transformPriceList', () => {
    it('should transform date strings to Date objects', () => {
      const rawData = {
        id: 1,
        name: 'Test',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-20T14:45:00Z',
      }

      const transformed = (service as any).transformPriceList(rawData)

      expect(transformed.created_at).toBeInstanceOf(Date)
      expect(transformed.updated_at).toBeInstanceOf(Date)
      expect(transformed.created_at.getTime()).toBe(new Date('2024-01-15T10:30:00Z').getTime())
      expect(transformed.updated_at.getTime()).toBe(new Date('2024-01-20T14:45:00Z').getTime())
    })
  })

  describe('error handling', () => {
    it('should propagate errors from httpClient', async () => {
      const error = new Error('Network error')
      mockHttpClient.get.mockRejectedValue(error)

      await expect(service.getAllPriceLists()).rejects.toThrow('Network error')
    })
  })
})