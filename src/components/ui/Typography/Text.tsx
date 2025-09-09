import React from 'react'
import { clsx } from 'clsx'

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
export type TextVariant = 'default' | 'muted' | 'strong' | 'code'

export interface TextProps {
  size?: TextSize
  variant?: TextVariant
  children?: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  [key: string]: any // Allow additional props
}

const textSizes: Record<TextSize, string> = {
  xs: 'text-xs sm:text-sm',
  sm: 'text-sm sm:text-base',
  base: 'text-base sm:text-lg',
  lg: 'text-lg sm:text-xl',
  xl: 'text-xl sm:text-2xl'
}

const textVariants: Record<TextVariant, string> = {
  default: 'text-gray-700 dark:text-gray-300',
  muted: 'text-gray-500 dark:text-gray-400',
  strong: 'text-gray-900 dark:text-gray-100 font-medium',
  code: 'text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded font-mono text-sm'
}

export const Text: React.FC<TextProps> = ({
  size = 'base',
  variant = 'default',
  children,
  className = '',
  as: Component = 'p',
  ...props
}) => {
  const sizeStyles = textSizes[size]
  const variantStyles = textVariants[variant]

  return (
    <Component className={clsx(sizeStyles, variantStyles, className)} {...props}>
      {children}
    </Component>
  )
}
