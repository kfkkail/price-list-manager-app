import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>Test Badge</Badge>)
      expect(screen.getByText('Test Badge')).toBeInTheDocument()
    })

    it('renders with default variant and size', () => {
      render(<Badge>Default</Badge>)
      const badge = screen.getByText('Default')
      
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800')
      expect(badge).toHaveClass('text-sm', 'px-2.5', 'py-1')
    })
  })

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Badge variant="default">Default</Badge>)
      const badge = screen.getByText('Default')
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800')
    })

    it('renders secondary variant', () => {
      render(<Badge variant="secondary">Secondary</Badge>)
      const badge = screen.getByText('Secondary')
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
    })

    it('renders success variant', () => {
      render(<Badge variant="success">Success</Badge>)
      const badge = screen.getByText('Success')
      expect(badge).toHaveClass('bg-green-100', 'text-green-800')
    })

    it('renders warning variant', () => {
      render(<Badge variant="warning">Warning</Badge>)
      const badge = screen.getByText('Warning')
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800')
    })

    it('renders error variant', () => {
      render(<Badge variant="error">Error</Badge>)
      const badge = screen.getByText('Error')
      expect(badge).toHaveClass('bg-red-100', 'text-red-800')
    })

    it('renders info variant', () => {
      render(<Badge variant="info">Info</Badge>)
      const badge = screen.getByText('Info')
      expect(badge).toHaveClass('bg-cyan-100', 'text-cyan-800')
    })
  })

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Badge size="sm">Small</Badge>)
      const badge = screen.getByText('Small')
      expect(badge).toHaveClass('text-xs', 'px-2', 'py-0.5')
    })

    it('renders medium size', () => {
      render(<Badge size="md">Medium</Badge>)
      const badge = screen.getByText('Medium')
      expect(badge).toHaveClass('text-sm', 'px-2.5', 'py-1')
    })

    it('renders large size', () => {
      render(<Badge size="lg">Large</Badge>)
      const badge = screen.getByText('Large')
      expect(badge).toHaveClass('text-base', 'px-3', 'py-1.5')
    })
  })

  describe('Custom styling', () => {
    it('applies custom className', () => {
      render(<Badge className="custom-class">Custom</Badge>)
      const badge = screen.getByText('Custom')
      expect(badge).toHaveClass('custom-class')
    })

    it('applies data-testid', () => {
      render(<Badge data-testid="custom-badge">Test</Badge>)
      expect(screen.getByTestId('custom-badge')).toBeInTheDocument()
    })
  })

  describe('Complex content', () => {
    it('renders with icon content', () => {
      render(
        <Badge>
          <span>🔥</span> Hot
        </Badge>
      )
      
      expect(screen.getByText('🔥')).toBeInTheDocument()
      expect(screen.getByText('Hot')).toBeInTheDocument()
    })

    it('renders with number content', () => {
      render(<Badge variant="error">{42}</Badge>)
      expect(screen.getByText('42')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      render(<Badge>Accessible Badge</Badge>)
      const badge = screen.getByText('Accessible Badge')
      
      expect(badge.tagName).toBe('SPAN')
      expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'font-medium')
    })
  })
})