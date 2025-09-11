import React, { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

export interface FormCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: string
  error?: string
  helper?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(({
  label,
  error,
  helper,
  size = 'md',
  className,
  id,
  ...props
}, ref) => {
  const fieldId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
  
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div className={clsx('space-y-2', className)}>
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <input
          ref={ref}
          type="checkbox"
          id={fieldId}
          className={clsx(
            'rounded border border-gray-300 dark:border-gray-600',
            'bg-white dark:bg-gray-800',
            'text-blue-600 focus:ring-2 focus:ring-blue-500',
            'disabled:bg-gray-50 dark:disabled:bg-gray-700',
            'disabled:cursor-not-allowed',
            sizeClasses[size],
            error && 'border-red-300 dark:border-red-600 focus:ring-red-500'
          )}
          aria-describedby={
            clsx(
              error && `${fieldId}-error`,
              helper && `${fieldId}-helper`
            ) || undefined
          }
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />

        {/* Label */}
        <label 
          htmlFor={fieldId}
          className={clsx(
            'font-medium text-gray-700 dark:text-gray-300 cursor-pointer',
            labelSizeClasses[size]
          )}
        >
          {label}
        </label>
      </div>

      {/* Helper Text */}
      {helper && !error && (
        <p 
          id={`${fieldId}-helper`}
          className="text-sm text-gray-600 dark:text-gray-400 ml-7"
        >
          {helper}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p 
          id={`${fieldId}-error`}
          className="text-sm text-red-600 dark:text-red-400 ml-7"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
})

FormCheckbox.displayName = 'FormCheckbox'