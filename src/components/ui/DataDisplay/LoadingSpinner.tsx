import React from 'react'
import { clsx } from 'clsx'

export type LoadingSpinnerSize = 'sm' | 'md' | 'lg' | 'xl'

export interface LoadingSpinnerProps {
  size?: LoadingSpinnerSize
  label?: string
  className?: string
  'data-testid'?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  label = 'Loading...',
  className,
  'data-testid': testId
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }

  return (
    <div 
      className={clsx('flex items-center justify-center', className)}
      data-testid={testId}
    >
      <div
        className={clsx(
          'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
          sizeClasses[size]
        )}
        role="status"
        aria-label={label}
      >
        <span className="sr-only">{label}</span>
      </div>
    </div>
  )
}