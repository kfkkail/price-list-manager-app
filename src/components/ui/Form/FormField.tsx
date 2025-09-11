import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import { clsx } from 'clsx'

export interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helper?: string
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({
  label,
  error,
  helper,
  required,
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}, ref) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-4 py-3 text-lg'
  }

  return (
    <div className={clsx('space-y-2', className)}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={fieldId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          )}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={fieldId}
          className={clsx(
            'w-full rounded-md border border-gray-300 dark:border-gray-600',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-white',
            'placeholder-gray-500 dark:placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'disabled:bg-gray-50 dark:disabled:bg-gray-700',
            'disabled:text-gray-500 dark:disabled:text-gray-400',
            'disabled:cursor-not-allowed',
            sizeClasses[size],
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500'
          )}
          required={required}
          aria-describedby={
            clsx(
              error && `${fieldId}-error`,
              helper && `${fieldId}-helper`
            ) || undefined
          }
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {/* Helper Text */}
      {helper && !error && (
        <p 
          id={`${fieldId}-helper`}
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          {helper}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p 
          id={`${fieldId}-error`}
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
})

FormField.displayName = 'FormField'