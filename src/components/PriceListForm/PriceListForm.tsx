import React, { useEffect } from 'react'
import { clsx } from 'clsx'
import { Save, X, AlertCircle, Check } from 'lucide-react'
import {
  Button,
  FormField,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  LoadingSpinner
} from '../ui'
import { usePriceListForm } from '../../hooks'
import { formatRelativeTime } from '../../utils'
import type { PriceList, CreatePriceListRequest, UpdatePriceListRequest } from '../../types'

export interface PriceListFormProps {
  priceList?: PriceList
  mode: 'create' | 'edit'
  onSubmit: (data: CreatePriceListRequest | UpdatePriceListRequest) => void | Promise<void>
  onCancel: () => void
  loading?: boolean
  className?: string
  enableAutoSave?: boolean
  'data-testid'?: string
}

export const PriceListForm: React.FC<PriceListFormProps> = ({
  priceList,
  mode,
  onSubmit,
  onCancel,
  loading = false,
  className,
  enableAutoSave = false,
  'data-testid': testId
}) => {
  const {
    data,
    updateField,
    errors,
    getFieldError,
    isDirty,
    isValid,
    isSubmitting,
    handleSubmit,
    reset,
    isAutoSaving,
    lastAutoSaved
  } = usePriceListForm({
    initialData: priceList ? { name: priceList.name } : undefined,
    onSubmit,
    enableAutoSave: enableAutoSave && mode === 'edit',
    autoSaveDelay: 2000
  })

  // Reset form when priceList changes (switching between different price lists)
  useEffect(() => {
    if (mode === 'edit' && priceList) {
      updateField('name', priceList.name)
    }
  }, [priceList?.id, mode])

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSubmit()
  }

  // Handle cancel
  const handleCancel = () => {
    if (isDirty) {
      const confirmCancel = window.confirm(
        'You have unsaved changes. Are you sure you want to cancel?'
      )
      if (!confirmCancel) return
    }
    
    reset()
    onCancel()
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSubmit()
      }
      
      // Escape to cancel
      if (e.key === 'Escape') {
        e.preventDefault()
        handleCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleSubmit, handleCancel])

  const isFormLoading = loading || isSubmitting
  const nameError = getFieldError('name')

  return (
    <div className={clsx('max-w-2xl mx-auto', className)} data-testid={testId}>
      <form onSubmit={handleFormSubmit}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {mode === 'create' ? 'Create Price List' : 'Edit Price List'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {mode === 'create' 
                    ? 'Enter the details for your new price list'
                    : 'Update the price list information'
                  }
                </p>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center gap-2">
                {/* Auto-save Status */}
                {enableAutoSave && mode === 'edit' && (
                  <>
                    {isAutoSaving && (
                      <Badge variant="info" className="flex items-center gap-1">
                        <LoadingSpinner size="sm" />
                        Saving...
                      </Badge>
                    )}
                    
                    {!isAutoSaving && lastAutoSaved && !isDirty && (
                      <Badge variant="success" className="flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Saved {formatRelativeTime(lastAutoSaved)}
                      </Badge>
                    )}
                    
                    {isDirty && !isAutoSaving && (
                      <Badge variant="warning" className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Unsaved changes
                      </Badge>
                    )}
                  </>
                )}

                {/* Validation Status */}
                {!isValid && errors.length > 0 && (
                  <Badge variant="error" className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.length} error{errors.length !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardBody className="space-y-6">
            {/* Name Field */}
            <FormField
              label="Name"
              required
              placeholder="Enter price list name"
              value={data.name}
              onChange={(e) => updateField('name', e.target.value)}
              error={nameError}
              disabled={isFormLoading}
              helper="Choose a descriptive name for your price list"
              autoFocus={mode === 'create'}
              maxLength={255}
            />

            {/* Additional Information */}
            {mode === 'edit' && priceList && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Price List Information
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-gray-600 dark:text-gray-400">ID</dt>
                    <dd className="font-mono text-gray-900 dark:text-white">
                      {priceList.id}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-600 dark:text-gray-400">Created</dt>
                    <dd className="text-gray-900 dark:text-white">
                      {formatRelativeTime(priceList.created_at)}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-gray-600 dark:text-gray-400">Last Updated</dt>
                    <dd className="text-gray-900 dark:text-white">
                      {formatRelativeTime(priceList.updated_at)}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            {/* Form-level Errors */}
            {errors.length > 0 && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                      Please fix the following errors:
                    </h3>
                    <ul className="mt-2 text-sm text-red-700 dark:text-red-300 list-disc list-inside">
                      {errors.map((error, index) => (
                        <li key={index}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardBody>

          <CardFooter>
            <div className="flex items-center justify-between w-full">
              {/* Keyboard Shortcuts Help */}
              <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded">⌘S</kbd> to save,{' '}
                <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded">Esc</kbd> to cancel
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isFormLoading}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isFormLoading || !isValid || (!isDirty && mode === 'edit')}
                  className="min-w-[100px]"
                >
                  {isFormLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      {mode === 'create' ? 'Creating...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {mode === 'create' ? 'Create' : 'Save Changes'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}