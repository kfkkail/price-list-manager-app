import React from 'react'
import { screen } from '@testing-library/react'
import { render } from './test-utils'
import { App } from './App'

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('Price List Manager')).toBeInTheDocument()
  })

  it('renders the dashboard on the root route', () => {
    render(<App />)
    
    // Check for dashboard content
    expect(screen.getByText('Price List Manager')).toBeInTheDocument()
    expect(screen.getByText('Manage your product pricing efficiently')).toBeInTheDocument()
    expect(screen.getByText('Welcome to your Dashboard')).toBeInTheDocument()
  })

  it('has proper semantic HTML structure', () => {
    render(<App />)
    
    // Check for proper header structure
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    
    // Check for proper main content structure
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  it('renders with proper accessibility attributes', () => {
    render(<App />)
    
    // Check for proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('Price List Manager')
    
    const h3 = screen.getByRole('heading', { level: 3 })
    expect(h3).toBeInTheDocument()
    expect(h3).toHaveTextContent('Welcome to your Dashboard')
  })

  it('renders with proper routing setup', () => {
    render(<App />)
    
    // Verify that the app renders the dashboard component
    // This tests that React Router is working and rendering the correct component
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    
    // Verify the dashboard content is present
    expect(screen.getByText('Price List Manager')).toBeInTheDocument()
  })
})
