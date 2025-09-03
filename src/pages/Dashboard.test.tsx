import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { Dashboard } from './Dashboard'

describe('Dashboard Component', () => {
  beforeEach(() => {
    render(<Dashboard />)
  })

  describe('Core Functionality', () => {
    it('renders without crashing', () => {
      expect(screen.getByText('Price List Manager')).toBeInTheDocument()
    })

    it('displays the main title and subtitle', () => {
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toHaveTextContent('Price List Manager')
      
      const subtitle = screen.getByText('Manage your product pricing efficiently')
      expect(subtitle).toBeInTheDocument()
    })

    it('shows welcome message and description', () => {
      const welcomeTitle = screen.getByRole('heading', { level: 3 })
      expect(welcomeTitle).toHaveTextContent('Welcome to your Dashboard')
      
      const description = screen.getByText(
        "This is where you'll manage your price lists and products."
      )
      expect(description).toBeInTheDocument()
    })
  })

  describe('Semantic Structure', () => {
    it('has proper HTML structure with header and main content', () => {
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('has proper heading hierarchy', () => {
      const headings = screen.getAllByRole('heading')
      expect(headings).toHaveLength(2)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      const h3 = screen.getByRole('heading', { level: 3 })
      
      expect(h1).toBeInTheDocument()
      expect(h3).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has descriptive text content for screen readers', () => {
      expect(screen.getByText('Manage your product pricing efficiently')).toBeInTheDocument()
      expect(screen.getByText("This is where you'll manage your price lists and products.")).toBeInTheDocument()
    })

    it('has proper ARIA landmarks', () => {
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  describe('Component Integration', () => {
    it('renders as a functional component', () => {
      expect(Dashboard).toBeInstanceOf(Function)
    })

    it('has proper TypeScript typing', () => {
      const Component: React.FC = Dashboard
      expect(Component).toBeDefined()
    })
  })

  describe('Layout Behavior', () => {
    it('has a placeholder area for future content', () => {
      const placeholder = screen.getByText('Welcome to your Dashboard').closest('div')
      expect(placeholder).toBeInTheDocument()
      // Chromatic will verify the visual appearance and responsive behavior
    })

    it('renders with responsive layout structure', () => {
      const header = screen.getByRole('banner')
      const main = screen.getByRole('main')
      
      expect(header).toBeInTheDocument()
      expect(main).toBeInTheDocument()
      // Chromatic will test responsive behavior across different screen sizes
    })
  })
})
