import React from 'react'
import { clsx } from 'clsx'

export interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: boolean
  border?: boolean
  onClick?: (e: React.MouseEvent) => void
  'data-testid'?: string
}



export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = true,
  border = true,
  onClick,
  'data-testid': testId
}) => {
  const paddingClasses = padding ? 'p-6' : ''
  const borderClasses = border ? 'border border-gray-200 dark:border-gray-700' : ''

  return (
    <div 
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-lg shadow-md',
        paddingClasses,
        borderClasses,
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<{
  children: React.ReactNode
  className?: string
  border?: boolean
}> = ({
  children,
  className = '',
  border = true
}) => (
  <div className={clsx(
    'px-6 py-4',
    border && 'border-b border-gray-200 dark:border-gray-700',
    className
  )}>
    {children}
  </div>
)

export const CardBody: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({
  children,
  className = ''
}) => (
  <div className={clsx('px-6 py-4', className)}>
    {children}
  </div>
)

export const CardFooter: React.FC<{
  children: React.ReactNode
  className?: string
  border?: boolean
}> = ({
  children,
  className = '',
  border = true
}) => (
  <div className={clsx(
    'px-6 py-4',
    border && 'border-t border-gray-200 dark:border-gray-700',
    className
  )}>
    {children}
  </div>
)
