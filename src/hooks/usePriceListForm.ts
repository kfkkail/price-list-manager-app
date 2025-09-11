import { useState, useCallback, useEffect } from 'react'
import { validatePriceListForm } from '../utils/validation'
import type { PriceList, CreatePriceListRequest, UpdatePriceListRequest, ValidationError } from '../types'

export interface PriceListFormData {
  name: string
}

export interface UsePriceListFormOptions {
  initialData?: Partial<PriceListFormData>
  onSubmit?: (data: PriceListFormData) => void | Promise<void>
  enableAutoSave?: boolean
  autoSaveDelay?: number
}

export interface UsePriceListFormReturn {
  // Form data
  data: PriceListFormData
  setData: (data: Partial<PriceListFormData>) => void
  updateField: (field: keyof PriceListFormData, value: string) => void
  
  // Validation
  errors: ValidationError[]
  getFieldError: (field: string) => string | undefined
  validate: () => boolean
  clearErrors: () => void
  clearFieldError: (field: string) => void
  
  // Form state
  isDirty: boolean
  isValid: boolean
  isSubmitting: boolean
  
  // Actions
  handleSubmit: () => Promise<void>
  reset: () => void
  
  // Auto-save
  isAutoSaving: boolean
  lastAutoSaved: Date | null
}

export const usePriceListForm = (options: UsePriceListFormOptions = {}): UsePriceListFormReturn => {
  const {
    initialData = {},
    onSubmit,
    enableAutoSave = false,
    autoSaveDelay = 2000
  } = options

  // Form data state
  const [data, setDataState] = useState<PriceListFormData>({
    name: '',
    ...initialData
  })

  // Form state
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isDirty, setIsDirty] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [lastAutoSaved, setLastAutoSaved] = useState<Date | null>(null)
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null)

  // Initial data reference for dirty checking
  const [initialFormData] = useState<PriceListFormData>({
    name: '',
    ...initialData
  })

  // Computed properties
  const isValid = errors.length === 0
  const hasChanges = JSON.stringify(data) !== JSON.stringify(initialFormData)

  // Update dirty state when data changes
  useEffect(() => {
    setIsDirty(hasChanges)
  }, [hasChanges])

  // Auto-save functionality
  useEffect(() => {
    if (!enableAutoSave || !onSubmit || !isDirty || !isValid) {
      return
    }

    // Clear existing timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }

    // Set new timeout
    const timeout = setTimeout(async () => {
      try {
        setIsAutoSaving(true)
        await onSubmit(data)
        setLastAutoSaved(new Date())
        setIsDirty(false)
      } catch (error) {
        // Auto-save failed, but don't throw
        console.warn('Auto-save failed:', error)
      } finally {
        setIsAutoSaving(false)
      }
    }, autoSaveDelay)

    setAutoSaveTimeout(timeout)

    // Cleanup timeout on unmount
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [data, isDirty, isValid, enableAutoSave, onSubmit, autoSaveDelay])

  // Set form data
  const setData = useCallback((newData: Partial<PriceListFormData>) => {
    setDataState(prev => ({ ...prev, ...newData }))
  }, [])

  // Update individual field
  const updateField = useCallback((field: keyof PriceListFormData, value: string) => {
    setDataState(prev => ({ ...prev, [field]: value }))
    
    // Clear field error when user starts typing
    clearFieldError(field)
  }, [])

  // Get error for specific field
  const getFieldError = useCallback((field: string): string | undefined => {
    return errors.find(error => error.field === field)?.message
  }, [errors])

  // Validate form
  const validate = useCallback((): boolean => {
    const validationErrors = validatePriceListForm(data)
    setErrors(validationErrors)
    return validationErrors.length === 0
  }, [data])

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors([])
  }, [])

  // Clear error for specific field
  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => prev.filter(error => error.field !== field))
  }, [])

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      // Validate before submit
      if (!validate()) {
        return
      }

      // Call onSubmit if provided
      if (onSubmit) {
        await onSubmit(data)
      }

      // Reset dirty state on successful submit
      setIsDirty(false)
    } finally {
      setIsSubmitting(false)
    }
  }, [data, isSubmitting, validate, onSubmit])

  // Reset form to initial state
  const reset = useCallback(() => {
    setDataState({ name: '', ...initialData })
    setErrors([])
    setIsDirty(false)
    setIsSubmitting(false)
    setIsAutoSaving(false)
    setLastAutoSaved(null)
    
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
      setAutoSaveTimeout(null)
    }
  }, [initialData, autoSaveTimeout])

  return {
    // Form data
    data,
    setData,
    updateField,
    
    // Validation
    errors,
    getFieldError,
    validate,
    clearErrors,
    clearFieldError,
    
    // Form state
    isDirty,
    isValid,
    isSubmitting,
    
    // Actions
    handleSubmit,
    reset,
    
    // Auto-save
    isAutoSaving,
    lastAutoSaved
  }
}

// Helper hooks for create and update modes
export const useCreatePriceListForm = (onSubmit?: (data: CreatePriceListRequest) => void | Promise<void>) => {
  return usePriceListForm({ onSubmit })
}

export const useUpdatePriceListForm = (
  priceList: PriceList,
  onSubmit?: (data: UpdatePriceListRequest) => void | Promise<void>
) => {
  return usePriceListForm({
    initialData: { name: priceList.name },
    onSubmit,
    enableAutoSave: true
  })
}