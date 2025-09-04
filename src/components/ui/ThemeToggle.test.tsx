import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  it('renders without crashing', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeInTheDocument()
  })

  it('displays theme toggle button with proper accessibility', () => {
    render(<ThemeToggle />)
    const toggleButton = screen.getByRole('button', { name: 'Toggle theme' })
    
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleButton).toHaveAttribute('aria-haspopup', 'true')
    expect(toggleButton).toHaveAttribute('aria-label', 'Toggle theme')
  })

  it('has proper styling classes', () => {
    render(<ThemeToggle />)
    const toggleButton = screen.getByRole('button', { name: 'Toggle theme' })
    
    expect(toggleButton).toHaveClass('flex', 'items-center', 'justify-center', 'w-10', 'h-10', 'rounded-lg')
  })
})
