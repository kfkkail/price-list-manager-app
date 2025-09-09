import React from 'react'
import { clsx } from 'clsx'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingProps {
  level?: HeadingLevel
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

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  className = ''
}) => {
  const baseStyles = headingStyles[level]
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag className={clsx(baseStyles, className)}>
      {children}
    </Tag>
  )
}
