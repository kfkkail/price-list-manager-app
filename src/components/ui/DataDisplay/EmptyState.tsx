import React, { ReactNode } from 'react'
import { clsx } from 'clsx'
import { FileX, Search, AlertCircle } from 'lucide-react'
import { Button } from '../Button/Button'

export type EmptyStateVariant = 'default' | 'search' | 'error'

export interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  variant?: EmptyStateVariant
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
  'data-testid'?: string
}

const defaultIcons = {
  default: FileX,
  search: Search,
  error: AlertCircle
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  variant = 'default',
  action,
  className,
  'data-testid': testId
}) => {
  const DefaultIcon = defaultIcons[variant]
  
  const variantClasses = {
    default: 'text-gray-400',
    search: 'text-blue-400',
    error: 'text-red-400'
  }

  return (
    <div 
      className={clsx(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
      data-testid={testId}
    >
      {/* Icon */}
      <div className={clsx('mb-4', variantClasses[variant])}>
        {icon || <DefaultIcon className="h-12 w-12" />}
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <Button
          onClick={action.onClick}
          variant="primary"
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}