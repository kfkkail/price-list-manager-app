import React from 'react'
import { clsx } from 'clsx'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ContainerProps {
  children: React.ReactNode
  size?: ContainerSize
  className?: string
  padding?: boolean
}

const containerSizes: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
  full: 'max-w-full'
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className = '',
  padding = true
}) => {
  const sizeClasses = containerSizes[size]
  const paddingClasses = padding ? 'px-4 sm:px-6 lg:px-8' : ''

  return (
    <div className={clsx('mx-auto', sizeClasses, paddingClasses, className)}>
      {children}
    </div>
  )
}
