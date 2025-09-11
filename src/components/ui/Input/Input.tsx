import React from 'react'
import { clsx } from 'clsx'

export type InputVariant = 'default' | 'error' | 'success'
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant
  size?: InputSize
  label?: string
  error?: string
  helpText?: string
  loading?: boolean
}

const inputVariants: Record<InputVariant, string> = {
  default: 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400',
  error: 'border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-red-500 dark:focus:border-red-400 dark:focus:ring-red-400',
  success: 'border-green-500 dark:border-green-400 focus:border-green-500 focus:ring-green-500 dark:focus:border-green-400 dark:focus:ring-green-400'
}

const inputSizes: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-3 py-2 text-base rounded-lg',
  lg: 'px-4 py-3 text-lg rounded-lg'
}

const labelSizes: Record<InputSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

export const Input: React.FC<InputProps> = ({
  variant = 'default',
  size = 'md',
  label,
  error,
  helpText,
  loading = false,
  disabled = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const errorId = error ? `${inputId}-error` : undefined
  const helpId = helpText ? `${inputId}-help` : undefined
  
  const actualVariant = error ? 'error' : variant
  
  const baseStyles = 'w-full border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
  const variantStyles = inputVariants[actualVariant]
  const sizeStyles = inputSizes[size]
  const stateStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={inputId}
          className={clsx(
            'block font-medium text-gray-700 dark:text-gray-300',
            labelSizes[size]
          )}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          className={clsx(baseStyles, variantStyles, sizeStyles, stateStyles, className)}
          disabled={disabled || loading}
          aria-describedby={clsx(errorId, helpId).trim() || undefined}
          aria-invalid={!!error}
          {...props}
        />
        
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg 
              className="animate-spin h-4 w-4 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4" 
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
              />
            </svg>
          </div>
        )}
      </div>
      
      {error && (
        <p id={errorId} className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p id={helpId} className="text-sm text-gray-500 dark:text-gray-400">
          {helpText}
        </p>
      )}
    </div>
  )
}