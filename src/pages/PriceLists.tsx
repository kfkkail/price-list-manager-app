import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, LayoutGrid, List, Trash2, AlertTriangle } from 'lucide-react'
import {
  Container,
  Button,
  Heading,
  Card,
  CardBody,
  Modal,
  LoadingSpinner,
  Badge,
  EmptyState
} from '../components/ui'
import { PriceListTable } from '../components/PriceListTable'
import { PriceListCard } from '../components/PriceListCard'
import {
  usePriceLists,
  useDeletePriceList,
  useBulkDeletePriceLists
} from '../hooks'
import type { PriceList } from '../types'

type ViewMode = 'table' | 'grid'

export const PriceLists: React.FC = () => {
  const navigate = useNavigate()
  
  // State
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    isOpen: boolean
    priceList?: PriceList
    isBulk?: boolean
  }>({ isOpen: false })

  // Data fetching
  const {
    data: priceListsResponse,
    isLoading,
    error,
    refetch
  } = usePriceLists()

  // Mutations
  const deletePostMutation = useDeletePriceList()
  const bulkDeleteMutation = useBulkDeletePriceLists()

  const priceLists = priceListsResponse?.data || []
  const totalCount = priceListsResponse?.count || 0

  // Handlers
  const handleCreate = () => {
    navigate('/price-lists/new')
  }

  const handleEdit = (priceList: PriceList) => {
    navigate(`/price-lists/${priceList.id}/edit`)
  }

  const handleView = (priceList: PriceList) => {
    navigate(`/price-lists/${priceList.id}`)
  }

  const handleDelete = (priceList: PriceList) => {
    setDeleteConfirmModal({
      isOpen: true,
      priceList,
      isBulk: false
    })
  }

  const handleBulkDelete = () => {
    setDeleteConfirmModal({
      isOpen: true,
      isBulk: true
    })
  }

  const confirmDelete = async () => {
    try {
      if (deleteConfirmModal.isBulk) {
        await bulkDeleteMutation.mutateAsync(selectedIds)
        setSelectedIds([])
      } else if (deleteConfirmModal.priceList) {
        await deletePostMutation.mutateAsync(deleteConfirmModal.priceList.id)
      }
      
      setDeleteConfirmModal({ isOpen: false })
      refetch()
    } catch (error) {
      // Error handling would typically involve a toast notification
      console.error('Delete failed:', error)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmModal({ isOpen: false })
  }

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + N to create new
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        handleCreate()
      }
      
      // Delete key for bulk delete
      if (e.key === 'Delete' && selectedIds.length > 0) {
        e.preventDefault()
        handleBulkDelete()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedIds])

  // Loading state
  if (isLoading && priceLists.length === 0) {
    return (
      <Container size="xl" className="py-8">
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </Container>
    )
  }

  // Error state
  if (error && priceLists.length === 0) {
    return (
      <Container size="xl" className="py-8">
        <EmptyState
          variant="error"
          title="Failed to load price lists"
          description={error instanceof Error ? error.message : 'An unexpected error occurred'}
          action={{
            label: 'Try Again',
            onClick: () => refetch()
          }}
        />
      </Container>
    )
  }

  const selectedCount = selectedIds.length
  const isDeleting = deletePostMutation.isLoading || bulkDeleteMutation.isLoading

  return (
    <Container size="xl" className="py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Heading level={1} className="text-3xl font-bold">
            Price Lists
          </Heading>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your product pricing configurations
            {totalCount > 0 && (
              <>
                {' '} · {totalCount} list{totalCount !== 1 ? 's' : ''}
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          {priceLists.length > 0 && (
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 p-1">
              <Button
                variant={viewMode === 'table' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="px-3"
                aria-label="Table view"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Create Button */}
          <Button
            variant="primary"
            onClick={handleCreate}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Price List
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedCount > 0 && (
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <CardBody className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                {selectedCount} selected
              </Badge>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedCount} price list{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedIds([])}
              >
                Clear Selection
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkDelete}
                className="text-red-600 hover:text-red-700"
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete Selected
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Content */}
      {priceLists.length > 0 ? (
        <div className="space-y-4">
          {viewMode === 'table' ? (
            <PriceListTable
              priceLists={priceLists}
              loading={isLoading}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              onBulkDelete={handleBulkDelete}
              enableSelection
              enableActions
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {priceLists.map((priceList) => (
                <PriceListCard
                  key={priceList.id}
                  priceList={priceList}
                  selected={selectedIds.includes(priceList.id)}
                  onSelect={(selected) => {
                    if (selected) {
                      setSelectedIds([...selectedIds, priceList.id])
                    } else {
                      setSelectedIds(selectedIds.filter(id => id !== priceList.id))
                    }
                  }}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                  enableSelection
                  enableActions
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          title="No price lists yet"
          description="Get started by creating your first price list to manage product pricing"
          action={{
            label: 'Create Price List',
            onClick: handleCreate
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmModal.isOpen}
        onClose={cancelDelete}
        title="Confirm Deletion"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={cancelDelete}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </div>
        }
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-gray-900 dark:text-white font-medium mb-2">
              {deleteConfirmModal.isBulk
                ? `Are you sure you want to delete ${selectedCount} price list${selectedCount !== 1 ? 's' : ''}?`
                : `Are you sure you want to delete "${deleteConfirmModal.priceList?.name}"?`
              }
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This action cannot be undone. All data associated with 
              {deleteConfirmModal.isBulk ? ' these price lists' : ' this price list'} will be permanently removed.
            </p>
          </div>
        </div>
      </Modal>
    </Container>
  )
}