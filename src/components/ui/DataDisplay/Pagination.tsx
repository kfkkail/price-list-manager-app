import React from 'react'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Button } from '../Button/Button'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPageNumbers?: boolean
  maxPageNumbers?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  'data-testid'?: string
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxPageNumbers = 7,
  size = 'md',
  className,
  'data-testid': testId
}) => {
  const generatePageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | 'ellipsis')[] = []
    const halfMax = Math.floor(maxPageNumbers / 2)

    if (currentPage <= halfMax + 1) {
      // Show pages from start
      for (let i = 1; i <= maxPageNumbers - 2; i++) {
        pages.push(i)
      }
      pages.push('ellipsis')
      pages.push(totalPages)
    } else if (currentPage >= totalPages - halfMax) {
      // Show pages from end
      pages.push(1)
      pages.push('ellipsis')
      for (let i = totalPages - maxPageNumbers + 3; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages around current
      pages.push(1)
      pages.push('ellipsis')
      for (let i = currentPage - halfMax + 1; i <= currentPage + halfMax - 1; i++) {
        pages.push(i)
      }
      pages.push('ellipsis')
      pages.push(totalPages)
    }

    return pages
  }

  const buttonSizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
  } as const

  if (totalPages <= 1) {
    return null
  }

  const pageNumbers = showPageNumbers ? generatePageNumbers() : []

  return (
    <nav 
      className={clsx('flex items-center justify-center space-x-1', className)}
      role="navigation"
      aria-label="Pagination"
      data-testid={testId}
    >
      {/* Previous Button */}
      <Button
        variant="ghost"
        size={buttonSizes[size]}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="px-2"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <div 
                  key={`ellipsis-${index}`} 
                  className="flex items-center justify-center px-2 py-1"
                  aria-hidden="true"
                >
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </div>
              )
            }

            const isCurrentPage = page === currentPage

            return (
              <Button
                key={page}
                variant={isCurrentPage ? 'primary' : 'ghost'}
                size={buttonSizes[size]}
                onClick={() => onPageChange(page)}
                aria-label={`Go to page ${page}`}
                aria-current={isCurrentPage ? 'page' : undefined}
                className="min-w-[2.5rem]"
              >
                {page}
              </Button>
            )
          })}
        </div>
      )}

      {/* Next Button */}
      <Button
        variant="ghost"
        size={buttonSizes[size]}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="px-2"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}