import React from 'react'
import { render, screen } from '@testing-library/react'
import { Table, TableHeader, TableBody, TableRow, TableCell } from './Table'

describe('Table Components', () => {
  describe('Table', () => {
    it('renders with default props', () => {
      render(
        <Table>
          <tbody><tr><td>Test</td></tr></tbody>
        </Table>
      )
      const table = screen.getByRole('table')
      expect(table).toBeInTheDocument()
      expect(table).toHaveClass('min-w-full', 'divide-y', 'divide-gray-200')
    })

    it('applies custom className', () => {
      render(
        <Table className="custom-table">
          <tbody><tr><td>Test</td></tr></tbody>
        </Table>
      )
      const table = screen.getByRole('table')
      expect(table).toHaveClass('custom-table')
    })

    it('renders with overflow wrapper', () => {
      render(
        <Table>
          <tbody><tr><td>Test</td></tr></tbody>
        </Table>
      )
      const wrapper = screen.getByRole('table').parentElement
      expect(wrapper).toHaveClass('overflow-x-auto')
    })
  })

  describe('TableHeader', () => {
    it('renders with correct styling', () => {
      render(
        <Table>
          <TableHeader>
            <tr><th>Header</th></tr>
          </TableHeader>
        </Table>
      )
      const thead = screen.getByRole('rowgroup')
      expect(thead).toHaveClass('bg-gray-50')
    })

    it('applies custom className', () => {
      render(
        <Table>
          <TableHeader className="custom-header">
            <tr><th>Header</th></tr>
          </TableHeader>
        </Table>
      )
      const thead = screen.getByRole('rowgroup')
      expect(thead).toHaveClass('custom-header')
    })
  })

  describe('TableBody', () => {
    it('renders with correct styling', () => {
      render(
        <Table>
          <TableBody>
            <tr><td>Body</td></tr>
          </TableBody>
        </Table>
      )
      const tbody = screen.getByRole('rowgroup')
      expect(tbody).toHaveClass('bg-white', 'divide-y', 'divide-gray-200')
    })

    it('applies custom className', () => {
      render(
        <Table>
          <TableBody className="custom-body">
            <tr><td>Body</td></tr>
          </TableBody>
        </Table>
      )
      const tbody = screen.getByRole('rowgroup')
      expect(tbody).toHaveClass('custom-body')
    })
  })

  describe('TableRow', () => {
    it('renders with default props', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <td>Row content</td>
            </TableRow>
          </TableBody>
        </Table>
      )
      const row = screen.getByRole('row')
      expect(row).toBeInTheDocument()
      expect(row).toHaveClass('hover:bg-gray-100')
    })

    it('renders with actions', () => {
      render(
        <Table>
          <TableBody>
            <TableRow actions={<button>Edit</button>}>
              <td>Row content</td>
            </TableRow>
          </TableBody>
        </Table>
      )
      const row = screen.getByRole('row')
      expect(row).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('disables stripes when striped=false', () => {
      render(
        <Table>
          <TableBody>
            <TableRow striped={false}>
              <td>Row content</td>
            </TableRow>
          </TableBody>
        </Table>
      )
      const row = screen.getByRole('row')
      expect(row).not.toHaveClass('even:bg-gray-50')
    })

    it('disables hover when hover=false', () => {
      render(
        <Table>
          <TableBody>
            <TableRow hover={false}>
              <td>Row content</td>
            </TableRow>
          </TableBody>
        </Table>
      )
      const row = screen.getByRole('row')
      expect(row).not.toHaveClass('hover:bg-gray-100')
    })

    it('applies custom className', () => {
      render(
        <Table>
          <TableBody>
            <TableRow className="custom-row">
              <td>Row content</td>
            </TableRow>
          </TableBody>
        </Table>
      )
      const row = screen.getByRole('row')
      expect(row).toHaveClass('custom-row')
    })

    it('renders actions in correct position', () => {
      render(
        <Table>
          <TableBody>
            <TableRow actions={<button>Edit</button>}>
              <td>Content</td>
            </TableRow>
          </TableBody>
        </Table>
      )
      
      const actionCell = screen.getByRole('button').closest('td')
      expect(actionCell).toHaveClass('text-right', 'text-sm', 'font-medium')
    })
  })

  describe('TableCell', () => {
    it('renders as td by default', () => {
      render(
        <Table>
          <TableBody>
            <tr>
              <TableCell>Cell content</TableCell>
            </tr>
          </TableBody>
        </Table>
      )
      const cell = screen.getByText('Cell content')
      expect(cell.tagName).toBe('TD')
      expect(cell).toHaveClass('text-gray-500')
    })

    it('renders as th when header=true', () => {
      render(
        <Table>
          <TableHeader>
            <tr>
              <TableCell header>Header content</TableCell>
            </tr>
          </TableHeader>
        </Table>
      )
      const cell = screen.getByText('Header content')
      expect(cell.tagName).toBe('TH')
      expect(cell).toHaveClass('text-gray-900', 'font-medium')
    })

    it('applies correct styling for header cells', () => {
      render(
        <Table>
          <TableHeader>
            <tr>
              <TableCell header>Header</TableCell>
            </tr>
          </TableHeader>
        </Table>
      )
      const cell = screen.getByText('Header')
      expect(cell).toHaveClass('text-left', 'font-medium', 'text-gray-900')
    })

    it('applies correct styling for data cells', () => {
      render(
        <Table>
          <TableBody>
            <tr>
              <TableCell>Data</TableCell>
            </tr>
          </TableBody>
        </Table>
      )
      const cell = screen.getByText('Data')
      expect(cell).toHaveClass('text-gray-500')
    })

    it('applies custom className', () => {
      render(
        <Table>
          <TableBody>
            <tr>
              <TableCell className="custom-cell">Content</TableCell>
            </tr>
          </TableBody>
        </Table>
      )
      const cell = screen.getByText('Content')
      expect(cell).toHaveClass('custom-cell')
    })
  })

  describe('Dark Mode Support', () => {
    beforeEach(() => {
      document.documentElement.classList.add('dark')
    })

    afterEach(() => {
      document.documentElement.classList.remove('dark')
    })

    it('applies dark mode classes to table', () => {
      render(
        <Table>
          <tbody><tr><td>Test</td></tr></tbody>
        </Table>
      )
      const table = screen.getByRole('table')
      expect(table).toHaveClass('dark:divide-gray-700')
    })

    it('applies dark mode classes to header', () => {
      render(
        <Table>
          <TableHeader>
            <tr><th>Header</th></tr>
          </TableHeader>
        </Table>
      )
      const thead = screen.getByRole('rowgroup')
      expect(thead).toHaveClass('dark:bg-gray-800')
    })

    it('applies dark mode classes to body', () => {
      render(
        <Table>
          <TableBody>
            <tr><td>Body</td></tr>
          </TableBody>
        </Table>
      )
      const tbody = screen.getByRole('rowgroup')
      expect(tbody).toHaveClass('dark:bg-gray-900', 'dark:divide-gray-700')
    })

    it('applies dark mode classes to rows', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <td>Row content</td>
            </TableRow>
          </TableBody>
        </Table>
      )
      const row = screen.getByRole('row')
      expect(row).toHaveClass('dark:hover:bg-gray-700')
    })

    it('applies dark mode classes to cells', () => {
      render(
        <Table>
          <TableBody>
            <tr>
              <TableCell>Data</TableCell>
            </tr>
          </TableBody>
        </Table>
      )
      const cell = screen.getByText('Data')
      expect(cell).toHaveClass('dark:text-gray-400')
    })

    it('applies dark mode classes to header cells', () => {
      render(
        <Table>
          <TableHeader>
            <tr>
              <TableCell header>Header</TableCell>
            </tr>
          </TableHeader>
        </Table>
      )
      const cell = screen.getByText('Header')
      expect(cell).toHaveClass('dark:text-gray-100')
    })
  })

  describe('Integration', () => {
    it('renders complete table structure', () => {
      render(
        <Table>
          <TableHeader>
            <tr>
              <TableCell header>Name</TableCell>
              <TableCell header>Email</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>jane@example.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getAllByRole('row')).toHaveLength(3) // 1 header + 2 data rows
      expect(screen.getByText('Name')).toHaveClass('text-gray-900', 'font-medium')
      expect(screen.getByText('John Doe')).toHaveClass('text-gray-500')
    })

    it('handles complex table with actions', () => {
      render(
        <Table>
          <TableHeader>
            <tr>
              <TableCell header>Product</TableCell>
              <TableCell header>Price</TableCell>
              <TableCell header>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            <TableRow
              actions={
                <div>
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              }
            >
              <TableCell>Product A</TableCell>
              <TableCell>$29.99</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      expect(screen.getByText('Product A')).toBeInTheDocument()
      expect(screen.getByText('$29.99')).toBeInTheDocument()
      expect(screen.getAllByRole('button')).toHaveLength(2)
    })
  })
})
