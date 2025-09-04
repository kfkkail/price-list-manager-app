import React from 'react'
import { clsx } from 'clsx'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const variantStyles = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
  ghost: 'hover:bg-gray-100 text-gray-700'
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props 
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}