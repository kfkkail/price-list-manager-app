import React from 'react'
import { clsx } from 'clsx'
import { Edit, Trash2, Eye, MoreHorizontal, Calendar, Clock } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Tooltip,
  Badge
} from '../ui'
import { formatDate, formatRelativeTime } from '../../utils'
import type { PriceList } from '../../types'

export interface PriceListCardProps {
  priceList: PriceList
  variant?: 'default' | 'compact'
  selected?: boolean
  onSelect?: (selected: boolean) => void
  onEdit?: (priceList: PriceList) => void
  onDelete?: (priceList: PriceList) => void
  onView?: (priceList: PriceList) => void
  enableSelection?: boolean
  enableActions?: boolean
  showTimestamps?: boolean
  className?: string
  'data-testid'?: string
}

export const PriceListCard: React.FC<PriceListCardProps> = ({
  priceList,
  variant = 'default',
  selected = false,
  onSelect,
  onEdit,
  onDelete,
  onView,
  enableSelection = false,
  enableActions = true,
  showTimestamps = true,
  className,
  'data-testid': testId
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger selection when clicking on action buttons
    if (e.target instanceof HTMLElement && e.target.closest('button')) {
      return
    }

    if (enableSelection && onSelect) {
      onSelect(!selected)
    } else if (onView) {
      onView(priceList)
    }
  }

  const cardClasses = clsx(
    'transition-colors duration-200',
    enableSelection && 'cursor-pointer',
    selected && 'ring-2 ring-blue-500',
    !selected && 'hover:shadow-md'
  )

  const isNew = new Date().getTime() - new Date(priceList.created_at).getTime() < 24 * 60 * 60 * 1000
  const isRecentlyUpdated = new Date().getTime() - new Date(priceList.updated_at).getTime() < 24 * 60 * 60 * 1000

  if (variant === 'compact') {
    return (
      <Card 
        className={clsx(cardClasses, 'p-4', className)}
        onClick={handleCardClick}
        data-testid={testId}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Selection Checkbox */}
            {enableSelection && (
              <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onSelect?.(e.target.checked)}
                onClick={(e) => e.stopPropagation()}
                className="rounded border-gray-300 dark:border-gray-600"
                aria-label={`Select ${priceList.name}`}
              />
            )}

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {priceList.name}
                </h3>
                
                {/* Status Badges */}
                {isNew && (
                  <Badge variant="success" size="sm">New</Badge>
                )}
                {isRecentlyUpdated && !isNew && (
                  <Badge variant="info" size="sm">Updated</Badge>
                )}
              </div>

              {showTimestamps && (
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  Updated {formatRelativeTime(priceList.updated_at)}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          {enableActions && (
            <div className="flex items-center gap-1 ml-2">
              {onView && (
                <Tooltip content="View details">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onView(priceList)
                    }}
                    className="p-1 h-8 w-8"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </Tooltip>
              )}
              
              {onEdit && (
                <Tooltip content="Edit price list">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit(priceList)
                    }}
                    className="p-1 h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </Tooltip>
              )}
              
              {onDelete && (
                <Tooltip content="Delete price list">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(priceList)
                    }}
                    className="p-1 h-8 w-8 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </Card>
    )
  }

  // Default variant - full card
  return (
    <Card 
      className={clsx(cardClasses, className)}
      onClick={handleCardClick}
      data-testid={testId}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Selection Checkbox */}
            {enableSelection && (
              <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onSelect?.(e.target.checked)}
                onClick={(e) => e.stopPropagation()}
                className="rounded border-gray-300 dark:border-gray-600"
                aria-label={`Select ${priceList.name}`}
              />
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {priceList.name}
                </h3>
                
                {/* Status Badges */}
                {isNew && (
                  <Badge variant="success">New</Badge>
                )}
                {isRecentlyUpdated && !isNew && (
                  <Badge variant="info">Recently Updated</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Actions Dropdown */}
          {enableActions && (
            <div className="flex items-center gap-1">
              {onView && (
                <Tooltip content="View details">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onView(priceList)
                    }}
                    className="p-2"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </Tooltip>
              )}
              
              {onEdit && (
                <Tooltip content="Edit price list">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit(priceList)
                    }}
                    className="p-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </Tooltip>
              )}
              
              {onDelete && (
                <Tooltip content="Delete price list">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(priceList)
                    }}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardBody>
        <div className="space-y-3">
          {/* Price List ID */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">ID:</span>{' '}
            <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs">
              {priceList.id}
            </code>
          </div>

          {/* Placeholder for additional content */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Ready for products and pricing configuration
          </div>
        </div>
      </CardBody>

      {showTimestamps && (
        <CardFooter>
          <div className="flex items-center justify-between w-full text-sm text-gray-600 dark:text-gray-400">
            {/* Created Date */}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <Tooltip content={formatDate(priceList.created_at, { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}>
                <span>Created {formatRelativeTime(priceList.created_at)}</span>
              </Tooltip>
            </div>

            {/* Updated Date */}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <Tooltip content={formatDate(priceList.updated_at, { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}>
                <span>Updated {formatRelativeTime(priceList.updated_at)}</span>
              </Tooltip>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}