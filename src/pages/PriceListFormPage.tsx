import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import {
  Container,
  LoadingSpinner,
  EmptyState
} from '../components/ui'
import { PriceListForm } from '../components/PriceListForm'
import {
  usePriceList,
  useCreatePriceList,
  useUpdatePriceList
} from '../hooks'
import type { CreatePriceListRequest, UpdatePriceListRequest } from '../types'

export const PriceListFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const isEditing = id !== undefined && id !== 'new'
  const priceListId = isEditing ? parseInt(id, 10) : undefined
  
  // Data fetching (only for edit mode)
  const {
    data: priceListResponse,
    isLoading: isLoadingPriceList,
    error: priceListError
  } = usePriceList(priceListId!, { enabled: isEditing && !isNaN(priceListId!) })

  // Mutations
  const createMutation = useCreatePriceList()
  const updateMutation = useUpdatePriceList()

  const priceList = priceListResponse?.data

  // Handlers
  const handleBack = () => {
    if (isEditing && priceListId) {
      navigate(`/price-lists/${priceListId}`)
    } else {
      navigate('/price-lists')
    }
  }

  const handleSubmit = async (data: CreatePriceListRequest | UpdatePriceListRequest) => {
    try {
      if (isEditing && priceListId) {
        const result = await updateMutation.mutateAsync({
          id: priceListId,
          data: data as UpdatePriceListRequest
        })
        
        if (result.data) {
          navigate(`/price-lists/${result.data.id}`)
        }
      } else {
        const result = await createMutation.mutateAsync(data as CreatePriceListRequest)
        
        if (result.data) {
          navigate(`/price-lists/${result.data.id}`)
        }
      }
    } catch (error) {
      // Error handling would typically involve a toast notification
      console.error('Save failed:', error)
      throw error // Re-throw to let the form handle it
    }
  }

  const handleCancel = () => {
    handleBack()
  }

  // Invalid ID for edit mode
  if (isEditing && (isNaN(priceListId!) || priceListId! <= 0)) {
    return (
      <Container size="lg" className="py-8">
        <EmptyState
          variant="error"
          title="Invalid Price List ID"
          description="The price list ID in the URL is not valid"
          action={{
            label: 'Back to Price Lists',
            onClick: () => navigate('/price-lists')
          }}
        />
      </Container>
    )
  }

  // Loading state for edit mode
  if (isEditing && isLoadingPriceList) {
    return (
      <Container size="lg" className="py-8">
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </Container>
    )
  }

  // Error state for edit mode
  if (isEditing && (priceListError || !priceList)) {
    return (
      <Container size="lg" className="py-8">
        <EmptyState
          variant="error"
          title="Price List Not Found"
          description={priceListError instanceof Error ? priceListError.message : 'The requested price list could not be found'}
          action={{
            label: 'Back to Price Lists',
            onClick: () => navigate('/price-lists')
          }}
        />
      </Container>
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <Container size="lg" className="py-8 space-y-6">
      {/* Back Navigation */}
      <nav className="flex items-center gap-2 text-sm">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {isEditing ? 'Back to Price List' : 'Back to Price Lists'}
        </button>
      </nav>

      {/* Form */}
      <PriceListForm
        priceList={priceList}
        mode={isEditing ? 'edit' : 'create'}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={isLoading}
        enableAutoSave={isEditing}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <LoadingSpinner />
              <span className="text-gray-900 dark:text-white">
                {isEditing ? 'Updating price list...' : 'Creating price list...'}
              </span>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}