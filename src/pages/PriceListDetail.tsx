import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  AlertTriangle,
  Calendar,
  Clock,
  Copy,
  ExternalLink,
  Plus
} from 'lucide-react'
import {
  Container,
  Button,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  LoadingSpinner,
  EmptyState,
  Badge,
  Tooltip
} from '../components/ui'
import {
  usePriceList,
  useDeletePriceList
} from '../hooks'
import { formatDate, formatRelativeTime } from '../utils'

export const PriceListDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const priceListId = parseInt(id || '', 10)
  
  // State
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
  const [editMode, setEditMode] = useState(false)

  // Data fetching
  const {
    data: priceListResponse,
    isLoading,
    error,
    refetch
  } = usePriceList(priceListId, { enabled: !isNaN(priceListId) })

  // Mutations
  const deletePostMutation = useDeletePriceList()

  const priceList = priceListResponse?.data

  // Handlers
  const handleBack = () => {
    navigate('/price-lists')
  }

  const handleEdit = () => {
    if (priceList) {
      navigate(`/price-lists/${priceList.id}/edit`)
    }
  }

  const handleDelete = () => {
    setDeleteConfirmModal(true)
  }

  const confirmDelete = async () => {
    if (!priceList) return

    try {
      await deletePostMutation.mutateAsync(priceList.id)
      navigate('/price-lists')
    } catch (error) {
      console.error('Delete failed:', error)
      setDeleteConfirmModal(false)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmModal(false)
  }

  const handleCopyId = () => {
    if (priceList) {
      navigator.clipboard.writeText(priceList.id.toString())
      // In a real app, you'd show a toast notification
      console.log('ID copied to clipboard')
    }
  }

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to go back
      if (e.key === 'Escape') {
        e.preventDefault()
        handleBack()
      }
      
      // E to edit
      if (e.key === 'e' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        handleEdit()
      }
      
      // Delete key to delete
      if (e.key === 'Delete') {
        e.preventDefault()
        handleDelete()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [priceList])

  // Invalid ID
  if (isNaN(priceListId)) {
    return (
      <Container size="lg" className="py-8">
        <EmptyState
          variant="error"
          title="Invalid Price List ID"
          description="The price list ID in the URL is not valid"
          action={{
            label: 'Back to Price Lists',
            onClick: handleBack
          }}
        />
      </Container>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <Container size="lg" className="py-8">
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </Container>
    )
  }

  // Error state
  if (error || !priceList) {
    return (
      <Container size="lg" className="py-8">
        <EmptyState
          variant="error"
          title="Price List Not Found"
          description={error instanceof Error ? error.message : 'The requested price list could not be found'}
          action={{
            label: 'Back to Price Lists',
            onClick: handleBack
          }}
        />
      </Container>
    )
  }

  const isDeleting = deletePostMutation.isLoading
  const isNew = new Date().getTime() - new Date(priceList.created_at).getTime() < 24 * 60 * 60 * 1000
  const isRecentlyUpdated = new Date().getTime() - new Date(priceList.updated_at).getTime() < 24 * 60 * 60 * 1000

  return (
    <Container size="lg" className="py-8 space-y-6">
      {/* Back Navigation */}
      <nav className="flex items-center gap-2 text-sm">
        <Link 
          to="/price-lists"
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Price Lists
        </Link>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Heading level={1} className="text-3xl font-bold">
              {priceList.name}
            </Heading>
            
            {/* Status Badges */}
            {isNew && (
              <Badge variant="success">New</Badge>
            )}
            {isRecentlyUpdated && !isNew && (
              <Badge variant="info">Recently Updated</Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <span>ID:</span>
              <Tooltip content="Click to copy">
                <button
                  onClick={handleCopyId}
                  className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {priceList.id}
                </button>
              </Tooltip>
              <Copy className="h-3 w-3 ml-1" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleEdit}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Overview</h3>
            </CardHeader>
            <CardBody>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Price List Name
                  </dt>
                  <dd className="mt-1 text-base text-gray-900 dark:text-white">
                    {priceList.name}
                  </dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Status
                  </dt>
                  <dd className="mt-1">
                    <Badge variant="success">Active</Badge>
                  </dd>
                </div>
              </dl>
            </CardBody>
          </Card>

          {/* Products Section (Placeholder) */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Products & Pricing</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <EmptyState
                title="No products configured"
                description="Start building your price list by adding products and their pricing information"
                action={{
                  label: 'Add Your First Product',
                  onClick: () => console.log('Add product')
                }}
              />
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Timestamps Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Information</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              {/* Created */}
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  <Calendar className="h-4 w-4" />
                  Created
                </div>
                <div className="text-sm text-gray-900 dark:text-white">
                  <Tooltip content={formatDate(priceList.created_at, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}>
                    <span>{formatRelativeTime(priceList.created_at)}</span>
                  </Tooltip>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {formatDate(priceList.created_at)}
                </div>
              </div>

              {/* Updated */}
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  <Clock className="h-4 w-4" />
                  Last Updated
                </div>
                <div className="text-sm text-gray-900 dark:text-white">
                  <Tooltip content={formatDate(priceList.updated_at, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}>
                    <span>{formatRelativeTime(priceList.updated_at)}</span>
                  </Tooltip>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {formatDate(priceList.updated_at)}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Quick Actions</h3>
            </CardHeader>
            <CardBody className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="w-full justify-start"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Price List
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => console.log('Duplicate price list')}
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate Price List
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => console.log('Export price list')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmModal}
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
              Are you sure you want to delete "{priceList.name}"?
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This action cannot be undone. All data associated with this price list will be permanently removed.
            </p>
          </div>
        </div>
      </Modal>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 right-4 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden lg:block">
        <div className="space-y-1">
          <div><kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded">E</kbd> Edit</div>
          <div><kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded">Del</kbd> Delete</div>
          <div><kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded">Esc</kbd> Back</div>
        </div>
      </div>
    </Container>
  )
}