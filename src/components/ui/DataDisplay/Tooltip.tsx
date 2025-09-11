import React, { ReactNode, useState, useRef } from 'react'
import { clsx } from 'clsx'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  children: ReactNode
  content: string
  placement?: TooltipPlacement
  delay?: number
  className?: string
  'data-testid'?: string
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  delay = 200,
  className,
  'data-testid': testId
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const showTooltip = () => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }

  const placementClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-700',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-700',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-700'
  }

  return (
    <div 
      className={clsx('relative inline-block', className)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      data-testid={testId}
    >
      {children}
      
      {isVisible && (
        <div
          className={clsx(
            'absolute z-50 px-3 py-2 text-sm font-medium text-white',
            'bg-gray-900 dark:bg-gray-700 rounded-md shadow-lg',
            'whitespace-nowrap pointer-events-none',
            placementClasses[placement]
          )}
          role="tooltip"
          aria-hidden="true"
        >
          {content}
          
          {/* Arrow */}
          <div
            className={clsx(
              'absolute w-0 h-0 border-4 border-transparent',
              arrowClasses[placement]
            )}
          />
        </div>
      )}
    </div>
  )
}