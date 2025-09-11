import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { priceListService } from '../services'
import type {
  PriceList,
  CreatePriceListRequest,
  UpdatePriceListRequest,
  PriceListQueryParams,
  ApiResponse
} from '../types'

// Query keys
export const priceListKeys = {
  all: ['price-lists'] as const,
  lists: (params?: PriceListQueryParams) => [...priceListKeys.all, 'list', params] as const,
  list: (id: number) => [...priceListKeys.all, 'detail', id] as const,
  checkName: (name: string, excludeId?: number) => [...priceListKeys.all, 'check-name', name, excludeId] as const,
}

/**
 * Hook to fetch all price lists
 */
export const usePriceLists = (params?: PriceListQueryParams) => {
  return useQuery({
    queryKey: priceListKeys.lists(params),
    queryFn: () => priceListService.getAllPriceLists(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to fetch a single price list
 */
export const usePriceList = (id: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: priceListKeys.list(id),
    queryFn: () => priceListService.getPriceListById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    enabled: options?.enabled !== false && !!id,
  })
}

/**
 * Hook to check name availability
 */
export const usePriceListNameCheck = (name: string, excludeId?: number) => {
  return useQuery({
    queryKey: priceListKeys.checkName(name, excludeId),
    queryFn: () => priceListService.checkNameAvailability(name, excludeId),
    enabled: !!name && name.length > 0,
    staleTime: 30 * 1000, // 30 seconds
    cacheTime: 60 * 1000, // 1 minute
  })
}

/**
 * Hook to create a new price list
 */
export const useCreatePriceList = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePriceListRequest) => priceListService.createPriceList(data),
    onMutate: async (newPriceList) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: priceListKeys.all })

      // Snapshot the previous value
      const previousPriceLists = queryClient.getQueryData(priceListKeys.lists())

      // Optimistically update to the new value
      queryClient.setQueryData(priceListKeys.lists(), (old: ApiResponse<PriceList[]> | undefined) => {
        if (!old?.data) return old

        const optimisticPriceList: PriceList = {
          id: Date.now(), // Temporary ID
          name: newPriceList.name,
          created_at: new Date(),
          updated_at: new Date(),
        }

        return {
          ...old,
          data: [optimisticPriceList, ...old.data],
          count: (old.count || 0) + 1,
        }
      })

      return { previousPriceLists }
    },
    onError: (_error, _newPriceList, context) => {
      // Revert the optimistic update
      if (context?.previousPriceLists) {
        queryClient.setQueryData(priceListKeys.lists(), context.previousPriceLists)
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: priceListKeys.all })
    },
  })
}

/**
 * Hook to update a price list
 */
export const useUpdatePriceList = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePriceListRequest }) =>
      priceListService.updatePriceList(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: priceListKeys.list(id) })
      await queryClient.cancelQueries({ queryKey: priceListKeys.lists() })

      // Snapshot the previous values
      const previousPriceList = queryClient.getQueryData(priceListKeys.list(id))
      const previousPriceLists = queryClient.getQueryData(priceListKeys.lists())

      // Optimistically update single price list
      queryClient.setQueryData(priceListKeys.list(id), (old: ApiResponse<PriceList> | undefined) => {
        if (!old?.data) return old

        return {
          ...old,
          data: {
            ...old.data,
            ...data,
            updated_at: new Date(),
          },
        }
      })

      // Optimistically update price lists
      queryClient.setQueryData(priceListKeys.lists(), (old: ApiResponse<PriceList[]> | undefined) => {
        if (!old?.data) return old

        return {
          ...old,
          data: old.data.map((priceList) =>
            priceList.id === id
              ? { ...priceList, ...data, updated_at: new Date() }
              : priceList
          ),
        }
      })

      return { previousPriceList, previousPriceLists }
    },
    onError: (_error, { id }, context) => {
      // Revert the optimistic updates
      if (context?.previousPriceList) {
        queryClient.setQueryData(priceListKeys.list(id), context.previousPriceList)
      }
      if (context?.previousPriceLists) {
        queryClient.setQueryData(priceListKeys.lists(), context.previousPriceLists)
      }
    },
    onSettled: (_data, _error, { id }) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: priceListKeys.list(id) })
      queryClient.invalidateQueries({ queryKey: priceListKeys.lists() })
    },
  })
}

/**
 * Hook to delete a price list
 */
export const useDeletePriceList = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => priceListService.deletePriceList(id),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: priceListKeys.lists() })

      // Snapshot the previous value
      const previousPriceLists = queryClient.getQueryData(priceListKeys.lists())

      // Optimistically update to remove the price list
      queryClient.setQueryData(priceListKeys.lists(), (old: ApiResponse<PriceList[]> | undefined) => {
        if (!old?.data) return old

        return {
          ...old,
          data: old.data.filter((priceList) => priceList.id !== id),
          count: Math.max((old.count || 0) - 1, 0),
        }
      })

      // Remove individual price list from cache
      queryClient.removeQueries({ queryKey: priceListKeys.list(id) })

      return { previousPriceLists }
    },
    onError: (_error, _id, context) => {
      // Revert the optimistic update
      if (context?.previousPriceLists) {
        queryClient.setQueryData(priceListKeys.lists(), context.previousPriceLists)
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: priceListKeys.all })
    },
  })
}

/**
 * Hook to bulk delete price lists
 */
export const useBulkDeletePriceLists = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (ids: number[]) => {
      const results = await Promise.allSettled(
        ids.map(id => priceListService.deletePriceList(id))
      )
      
      const failures = results
        .map((result, index) => ({ result, id: ids[index] }))
        .filter(({ result }) => result.status === 'rejected')
        .map(({ id }) => id)

      if (failures.length > 0) {
        throw new Error(`Failed to delete price lists: ${failures.join(', ')}`)
      }

      return results
    },
    onMutate: async (ids) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: priceListKeys.lists() })

      // Snapshot the previous value
      const previousPriceLists = queryClient.getQueryData(priceListKeys.lists())

      // Optimistically update to remove the price lists
      queryClient.setQueryData(priceListKeys.lists(), (old: ApiResponse<PriceList[]> | undefined) => {
        if (!old?.data) return old

        return {
          ...old,
          data: old.data.filter((priceList) => !ids.includes(priceList.id)),
          count: Math.max((old.count || 0) - ids.length, 0),
        }
      })

      // Remove individual price lists from cache
      ids.forEach(id => {
        queryClient.removeQueries({ queryKey: priceListKeys.list(id) })
      })

      return { previousPriceLists }
    },
    onError: (_error, _ids, context) => {
      // Revert the optimistic update
      if (context?.previousPriceLists) {
        queryClient.setQueryData(priceListKeys.lists(), context.previousPriceLists)
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: priceListKeys.all })
    },
  })
}