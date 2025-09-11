import { httpClient } from './httpClient'
import type {
  PriceList,
  CreatePriceListRequest,
  UpdatePriceListRequest,
  ApiResponse,
  PriceListQueryParams
} from '../types'

export class PriceListService {
  private readonly endpoint = '/price-lists'

  /**
   * Get all price lists with optional query parameters
   */
  async getAllPriceLists(params?: PriceListQueryParams): Promise<ApiResponse<PriceList[]>> {
    const queryParams: Record<string, string> = {}

    if (params?.page !== undefined) {
      queryParams.page = params.page.toString()
    }
    
    if (params?.limit !== undefined) {
      queryParams.limit = params.limit.toString()
    }

    if (params?.sort) {
      queryParams.sort_field = params.sort.field
      queryParams.sort_direction = params.sort.direction
    }

    if (params?.filter?.search) {
      queryParams.search = params.filter.search
    }

    if (params?.filter?.dateFrom) {
      queryParams.date_from = params.filter.dateFrom.toISOString()
    }

    if (params?.filter?.dateTo) {
      queryParams.date_to = params.filter.dateTo.toISOString()
    }

    const response = await httpClient.get<PriceList[]>(this.endpoint, queryParams)
    
    // Transform date strings to Date objects
    if (response.data) {
      response.data = response.data.map(this.transformPriceList)
    }

    return response
  }

  /**
   * Get a single price list by ID
   */
  async getPriceListById(id: number): Promise<ApiResponse<PriceList>> {
    const response = await httpClient.get<PriceList>(`${this.endpoint}/${id}`)
    
    if (response.data) {
      response.data = this.transformPriceList(response.data)
    }

    return response
  }

  /**
   * Create a new price list
   */
  async createPriceList(data: CreatePriceListRequest): Promise<ApiResponse<PriceList>> {
    const response = await httpClient.post<PriceList>(this.endpoint, data)
    
    if (response.data) {
      response.data = this.transformPriceList(response.data)
    }

    return response
  }

  /**
   * Update an existing price list
   */
  async updatePriceList(
    id: number, 
    data: UpdatePriceListRequest
  ): Promise<ApiResponse<PriceList>> {
    const response = await httpClient.put<PriceList>(`${this.endpoint}/${id}`, data)
    
    if (response.data) {
      response.data = this.transformPriceList(response.data)
    }

    return response
  }

  /**
   * Delete a price list
   */
  async deletePriceList(id: number): Promise<ApiResponse<void>> {
    return httpClient.delete(`${this.endpoint}/${id}`)
  }

  /**
   * Transform price list from API (convert date strings to Date objects)
   */
  private transformPriceList(priceList: any): PriceList {
    return {
      ...priceList,
      created_at: new Date(priceList.created_at),
      updated_at: new Date(priceList.updated_at)
    }
  }

  /**
   * Check if a price list name is available (not a duplicate)
   */
  async checkNameAvailability(name: string, excludeId?: number): Promise<ApiResponse<{ available: boolean }>> {
    const params: Record<string, string> = { name }
    if (excludeId !== undefined) {
      params.exclude_id = excludeId.toString()
    }

    return httpClient.get<{ available: boolean }>(`${this.endpoint}/check-name`, params)
  }
}

// Default instance
export const priceListService = new PriceListService()