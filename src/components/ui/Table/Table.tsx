import React from 'react'
import { clsx } from 'clsx'

export interface TableProps {
  children: React.ReactNode
  className?: string
  striped?: boolean
  hover?: boolean
}

export const Table: React.FC<TableProps> = ({
  children,
  className = '',
  striped = true,
  hover = true
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={clsx(
        'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
        className
      )}>
        {children}
      </table>
    </div>
  )
}

export const TableHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <thead className={clsx('bg-gray-50 dark:bg-gray-800', className)}>
    {children}
  </thead>
)

export const TableBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <tbody className={clsx('bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700', className)}>
    {children}
  </tbody>
)

export const TableRow: React.FC<{
  children: React.ReactNode
  className?: string
  actions?: React.ReactNode
  striped?: boolean
  hover?: boolean
}> = ({
  children,
  className = '',
  actions,
  striped = true,
  hover = true
}) => {
  const rowClasses = clsx(
    striped && 'even:bg-gray-50 dark:even:bg-gray-800',
    hover && 'hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150',
    className
  )

  return (
    <tr className={rowClasses}>
      {children}
      {actions && (
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end space-x-2">
            {actions}
          </div>
        </td>
      )}
    </tr>
  )
}

export const TableCell: React.FC<{
  children: React.ReactNode
  className?: string
  header?: boolean
}> = ({
  children,
  className = '',
  header = false
}) => {
  const Tag = header ? 'th' : 'td'
  const cellClasses = clsx(
    'px-6 py-4 whitespace-nowrap text-sm',
    header ? 'text-left font-medium text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400',
    className
  )

  return (
    <Tag className={cellClasses}>
      {children}
    </Tag>
  )
}
