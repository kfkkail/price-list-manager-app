import React from 'react'
import { clsx } from 'clsx'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
export type HeadingSize = 'default' | 'large' | 'small'

export interface HeadingProps {
  level?: HeadingLevel
  size?: HeadingSize
  children?: React.ReactNode
  className?: string
}

const headingStyles: Record<HeadingLevel, string> = {
  1: 'text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100',
  2: 'text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200',
  3: 'text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-200',
  4: 'text-base sm:text-lg lg:text-xl font-medium text-gray-700 dark:text-gray-300',
  5: 'text-sm sm:text-base lg:text-lg font-medium text-gray-700 dark:text-gray-300',
  6: 'text-xs sm:text-sm lg:text-base font-medium text-gray-600 dark:text-gray-400'
}

const sizeOverrides: Record<HeadingSize, Partial<Record<HeadingLevel, string>>> = {
  large: {
    1: 'text-3xl sm:text-4xl lg:text-5xl',
    2: 'text-2xl sm:text-3xl lg:text-4xl',
    3: 'text-xl sm:text-2xl lg:text-3xl'
  },
  small: {
    1: 'text-xl sm:text-2xl lg:text-3xl',
    2: 'text-lg sm:text-xl lg:text-2xl',
    3: 'text-base sm:text-lg lg:text-xl'
  },
  default: {}
}

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  size = 'default',
  children,
  className = ''
}) => {
  const baseStyles = headingStyles[level]
  const sizeOverride = sizeOverrides[size][level]
  const finalStyles = sizeOverride ? baseStyles.replace(headingStyles[level].split(' ')[0], sizeOverride) : baseStyles
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag className={clsx(finalStyles, className)}>
      {children}
    </Tag>
  )
}
