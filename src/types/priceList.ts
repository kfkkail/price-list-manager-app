export interface PriceList {
  id: number
  name: string
  created_at: Date
  updated_at: Date
}

export interface CreatePriceListRequest {
  name: string
}

export interface UpdatePriceListRequest {
  name: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  count?: number
  error?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface SortParams {
  field: 'name' | 'created_at' | 'updated_at'
  direction: 'asc' | 'desc'
}

export interface FilterParams {
  search?: string
  dateFrom?: Date
  dateTo?: Date
}

export interface PriceListQueryParams extends PaginationParams {
  sort?: SortParams
  filter?: FilterParams
}