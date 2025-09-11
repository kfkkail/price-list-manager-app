import React, { InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface FormRadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface FormRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  error?: string
  helper?: string
  options: FormRadioOption[]
  size?: 'sm' | 'md' | 'lg'
  direction?: 'horizontal' | 'vertical'
  className?: string
}

export const FormRadio: React.FC<FormRadioProps> = ({
  label,
  error,
  helper,
  options,
  size = 'md',
  direction = 'vertical',
  className,
  name,
  ...props
}) => {
  const groupId = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`
  
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const containerClasses = {
    horizontal: 'flex flex-wrap items-center gap-6',
    vertical: 'space-y-3'
  }

  return (
    <div className={clsx('space-y-2', className)}>
      {/* Group Label */}
      {label && (
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </legend>
        </fieldset>
      )}

      {/* Radio Options */}
      <div 
        className={containerClasses[direction]}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={
          clsx(
            error && `${groupId}-error`,
            helper && `${groupId}-helper`
          ) || undefined
        }
      >
        {options.map((option, index) => {
          const optionId = `${groupId}-${index}`
          
          return (
            <div key={option.value} className="flex items-start space-x-3">
              {/* Radio Input */}
              <input
                type="radio"
                id={optionId}
                name={groupId}
                value={option.value}
                disabled={option.disabled}
                className={clsx(
                  'rounded-full border border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-800',
                  'text-blue-600 focus:ring-2 focus:ring-blue-500',
                  'disabled:bg-gray-50 dark:disabled:bg-gray-700',
                  'disabled:cursor-not-allowed',
                  sizeClasses[size],
                  error && 'border-red-300 dark:border-red-600 focus:ring-red-500'
                )}
                aria-describedby={
                  clsx(
                    error && `${groupId}-error`,
                    helper && `${groupId}-helper`
                  ) || undefined
                }
                {...props}
              />

              {/* Option Label */}
              <label 
                htmlFor={optionId}
                className={clsx(
                  'font-medium cursor-pointer',
                  option.disabled 
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300',
                  labelSizeClasses[size]
                )}
              >
                {option.label}
              </label>
            </div>
          )
        })}
      </div>

      {/* Helper Text */}
      {helper && !error && (
        <p 
          id={`${groupId}-helper`}
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          {helper}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p 
          id={`${groupId}-error`}
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}