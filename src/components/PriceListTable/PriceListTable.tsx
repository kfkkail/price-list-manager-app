import React, { useState, useMemo } from 'react'
import { clsx } from 'clsx'
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal
} from 'lucide-react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  FormField,
  EmptyState,
  LoadingSpinner,
  Badge,
  Tooltip
} from '../ui'
import { formatDate, formatRelativeTime } from '../../utils'
import type { PriceList, SortParams, FilterParams } from '../../types'

export interface PriceListTableProps {
  priceLists: PriceList[]
  loading?: boolean
  error?: string | null
  selectedIds?: number[]
  onSelectionChange?: (ids: number[]) => void
  onEdit?: (priceList: PriceList) => void
  onDelete?: (priceList: PriceList) => void
  onView?: (priceList: PriceList) => void
  onBulkDelete?: (ids: number[]) => void
  enableSelection?: boolean
  enableActions?: boolean
  className?: string
  'data-testid'?: string
}

type SortField = 'name' | 'created_at' | 'updated_at'

export const PriceListTable: React.FC<PriceListTableProps> = ({
  priceLists,
  loading = false,
  error = null,
  selectedIds = [],
  onSelectionChange,
  onEdit,
  onDelete,
  onView,
  onBulkDelete,
  enableSelection = false,
  enableActions = true,
  className,
  'data-testid': testId
}) => {
  // Local state for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('updated_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = priceLists

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(priceList =>
        priceList.name.toLowerCase().includes(searchLower)
      )
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number | Date
      let bValue: string | number | Date

      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'created_at':
          aValue = new Date(a.created_at).getTime()
          bValue = new Date(b.created_at).getTime()
          break
        case 'updated_at':
          aValue = new Date(a.updated_at).getTime()
          bValue = new Date(b.updated_at).getTime()
          break
        default:
          aValue = a.id
          bValue = b.id
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return sorted
  }, [priceLists, searchTerm, sortField, sortDirection])

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />
  }

  // Handle row selection
  const handleRowSelect = (priceListId: number, checked: boolean) => {
    if (!onSelectionChange) return

    if (checked) {
      onSelectionChange([...selectedIds, priceListId])
    } else {
      onSelectionChange(selectedIds.filter(id => id !== priceListId))
    }
  }

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return

    if (checked) {
      onSelectionChange(filteredAndSortedData.map(pl => pl.id))
    } else {
      onSelectionChange([])
    }
  }

  // Check if all visible rows are selected
  const isAllSelected = enableSelection && 
    filteredAndSortedData.length > 0 && 
    filteredAndSortedData.every(pl => selectedIds.includes(pl.id))

  // Check if some (but not all) rows are selected
  const isSomeSelected = enableSelection && 
    selectedIds.length > 0 && 
    !isAllSelected

  // Loading state
  if (loading && priceLists.length === 0) {
    return (
      <div className={clsx('space-y-4', className)} data-testid={testId}>
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  // Error state
  if (error && priceLists.length === 0) {
    return (
      <div className={clsx('space-y-4', className)} data-testid={testId}>
        <EmptyState
          variant="error"
          title="Failed to load price lists"
          description={error}
        />
      </div>
    )
  }

  return (
    <div className={clsx('space-y-4', className)} data-testid={testId}>
      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <FormField
            placeholder="Search price lists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Bulk Actions */}
          {enableSelection && selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {selectedIds.length} selected
              </Badge>
              {onBulkDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onBulkDelete(selectedIds)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              )}
            </div>
          )}

          {/* Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={clsx(showFilters && 'bg-blue-50 dark:bg-blue-900/20')}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Extended Filters (if enabled) */}
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Advanced filters coming soon...
          </div>
        </div>
      )}

      {/* Results Count */}
      {searchTerm && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredAndSortedData.length} result{filteredAndSortedData.length !== 1 ? 's' : ''} 
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      )}

      {/* Table */}
      {filteredAndSortedData.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                {/* Selection Column */}
                {enableSelection && (
                  <TableCell className="w-12">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={input => {
                        if (input) input.indeterminate = isSomeSelected
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                      aria-label="Select all price lists"
                    />
                  </TableCell>
                )}

                {/* Name Column */}
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('name')}
                    className="p-0 h-auto font-medium text-left justify-start"
                  >
                    Name
                    {getSortIcon('name')}
                  </Button>
                </TableCell>

                {/* Created Column */}
                <TableCell className="hidden md:table-cell">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('created_at')}
                    className="p-0 h-auto font-medium text-left justify-start"
                  >
                    Created
                    {getSortIcon('created_at')}
                  </Button>
                </TableCell>

                {/* Updated Column */}
                <TableCell className="hidden lg:table-cell">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('updated_at')}
                    className="p-0 h-auto font-medium text-left justify-start"
                  >
                    Last Updated
                    {getSortIcon('updated_at')}
                  </Button>
                </TableCell>

                {/* Actions Column */}
                {enableActions && (
                  <TableCell className="w-20">
                    <span className="sr-only">Actions</span>
                  </TableCell>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredAndSortedData.map((priceList) => (
                <TableRow key={priceList.id}>
                  {/* Selection Column */}
                  {enableSelection && (
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(priceList.id)}
                        onChange={(e) => handleRowSelect(priceList.id, e.target.checked)}
                        className="rounded border-gray-300 dark:border-gray-600"
                        aria-label={`Select ${priceList.name}`}
                      />
                    </TableCell>
                  )}

                  {/* Name Column */}
                  <TableCell>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {priceList.name}
                    </div>
                  </TableCell>

                  {/* Created Column */}
                  <TableCell className="hidden md:table-cell">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <Tooltip content={formatDate(priceList.created_at, { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}>
                        <span>{formatRelativeTime(priceList.created_at)}</span>
                      </Tooltip>
                    </div>
                  </TableCell>

                  {/* Updated Column */}
                  <TableCell className="hidden lg:table-cell">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <Tooltip content={formatDate(priceList.updated_at, { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}>
                        <span>{formatRelativeTime(priceList.updated_at)}</span>
                      </Tooltip>
                    </div>
                  </TableCell>

                  {/* Actions Column */}
                  {enableActions && (
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {onView && (
                          <Tooltip content="View details">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onView(priceList)}
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
                              onClick={() => onEdit(priceList)}
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
                              onClick={() => onDelete(priceList)}
                              className="p-1 h-8 w-8 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <EmptyState
          variant="search"
          title={searchTerm ? "No matching price lists" : "No price lists yet"}
          description={searchTerm 
            ? `Try adjusting your search term "${searchTerm}"` 
            : "Get started by creating your first price list"
          }
        />
      )}

      {/* Loading overlay for updates */}
      {loading && priceLists.length > 0 && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}