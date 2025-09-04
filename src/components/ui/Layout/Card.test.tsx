
import { screen } from '@testing-library/react'
import { render } from '../../../test-utils'
import { Card, CardHeader, CardBody, CardFooter } from './Card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default props', () => {
      render(<Card>Card content</Card>)
      const card = screen.getByText('Card content').closest('div')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('bg-white', 'dark:bg-gray-800', 'rounded-lg', 'p-6', 'shadow-md', 'border', 'border-gray-200', 'dark:border-gray-700')
    })

    it('renders without padding when padding=false', () => {
      render(<Card padding={false}>Card content</Card>)
      const card = screen.getByText('Card content').closest('div')
      expect(card).not.toHaveClass('p-6')
    })

    it('renders with different shadow options', () => {
      const { rerender } = render(<Card shadow="sm">Card content</Card>)
      let card = screen.getByText('Card content').closest('div')
      expect(card).toHaveClass('shadow-sm')

      rerender(<Card shadow="lg">Card content</Card>)
      card = screen.getByText('Card content').closest('div')
      expect(card).toHaveClass('shadow-lg')

      rerender(<Card shadow="none">Card content</Card>)
      card = screen.getByText('Card content').closest('div')
      expect(card).not.toHaveClass('shadow-sm', 'shadow', 'shadow-lg')
    })

    it('renders without border when border=false', () => {
      render(<Card border={false}>Card content</Card>)
      const card = screen.getByText('Card content').closest('div')
      expect(card).not.toHaveClass('border', 'border-gray-200', 'dark:border-gray-700')
    })

    it('applies custom className', () => {
      render(<Card className="custom-class">Card content</Card>)
      const card = screen.getByText('Card content').closest('div')
      expect(card).toHaveClass('custom-class')
    })

    it('combines all props correctly', () => {
      render(
        <Card 
          padding={false} 
          shadow="lg" 
          border={false} 
          className="custom-class"
        >
          Card content
        </Card>
      )
      const card = screen.getByText('Card content').closest('div')
      expect(card).toHaveClass('bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 'custom-class')
      expect(card).not.toHaveClass('p-6', 'border', 'border-gray-200', 'dark:border-gray-700')
    })
  })

  describe('CardHeader', () => {
    it('renders with default props', () => {
      render(<CardHeader>Header content</CardHeader>)
      const header = screen.getByText('Header content').closest('div')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('px-6', 'py-4', 'border-b', 'border-gray-200', 'dark:border-gray-700')
    })

    it('renders without border when border=false', () => {
      render(<CardHeader border={false}>Header content</CardHeader>)
      const header = screen.getByText('Header content').closest('div')
      expect(header).not.toHaveClass('border-b', 'border-gray-200', 'dark:border-gray-700')
    })

    it('applies custom className', () => {
      render(<CardHeader className="custom-header">Header content</CardHeader>)
      const header = screen.getByText('Header content').closest('div')
      expect(header).toHaveClass('custom-header')
    })
  })

  describe('CardBody', () => {
    it('renders with default props', () => {
      render(<CardBody>Body content</CardBody>)
      const body = screen.getByText('Body content').closest('div')
      expect(body).toBeInTheDocument()
      expect(body).toHaveClass('px-6', 'py-4')
    })

    it('applies custom className', () => {
      render(<CardBody className="custom-body">Body content</CardBody>)
      const body = screen.getByText('Body content').closest('div')
      expect(body).toHaveClass('custom-body')
    })
  })

  describe('CardFooter', () => {
    it('renders with default props', () => {
      render(<CardFooter>Footer content</CardFooter>)
      const footer = screen.getByText('Footer content').closest('div')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('px-6', 'py-4', 'border-t', 'border-gray-200', 'dark:border-gray-700')
    })

    it('renders without border when border=false', () => {
      render(<CardFooter border={false}>Footer content</CardFooter>)
      const footer = screen.getByText('Footer content').closest('div')
      expect(footer).not.toHaveClass('border-t', 'border-gray-200', 'dark:border-gray-700')
    })

    it('applies custom className', () => {
      render(<CardFooter className="custom-footer">Footer content</CardFooter>)
      const footer = screen.getByText('Footer content').closest('div')
      expect(footer).toHaveClass('custom-footer')
    })
  })

  describe('Card Integration', () => {
    it('renders complete card structure', () => {
      render(
        <Card>
          <CardHeader>Header</CardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      )
      
      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('Body')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })

    it('applies dark mode classes correctly', () => {
      // Mock dark mode by adding dark class to document
      document.documentElement.classList.add('dark')
      
      render(<Card>Card content</Card>)
      const card = screen.getByText('Card content').closest('div')
      expect(card).toHaveClass('dark:bg-gray-800', 'dark:border-gray-700')
      
      // Clean up
      document.documentElement.classList.remove('dark')
    })
  })
})
