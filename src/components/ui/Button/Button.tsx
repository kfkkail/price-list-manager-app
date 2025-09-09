import React from 'react'
import { clsx } from 'clsx'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white shadow-sm dark:bg-blue-500 dark:hover:bg-blue-600',
  secondary: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-gray-500 dark:focus:ring-gray-400 text-gray-700 dark:text-gray-200 shadow-sm',
  danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white shadow-sm dark:bg-red-500 dark:hover:bg-red-600',
  ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-500 dark:focus:ring-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm font-medium rounded-md',
  md: 'px-4 py-2 text-base font-medium rounded-lg',
  lg: 'px-6 py-3 text-lg font-medium rounded-lg'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
  const variantStyles = buttonVariants[variant]
  const sizeStyles = buttonSizes[size]
  const stateStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <button
      className={clsx(baseStyles, variantStyles, sizeStyles, stateStyles, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}
