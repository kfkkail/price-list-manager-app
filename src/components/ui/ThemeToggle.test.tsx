import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from './ThemeToggle'
import { ThemeProvider } from '../../contexts/ThemeContext'

const renderWithTheme = (component: React.ReactElement, defaultTheme: 'light' | 'dark' = 'light') => {
  return render(
    <ThemeProvider defaultTheme={defaultTheme}>
      {component}
    </ThemeProvider>
  )
}

describe('ThemeToggle', () => {
  it('renders without crashing when wrapped in ThemeProvider', () => {
    renderWithTheme(<ThemeToggle />)
    
    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(button).toBeInTheDocument()
  })

  it('toggles theme when clicked', () => {
    renderWithTheme(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    
    // Initially should show moon icon (for switching to dark)
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    
    // Click to toggle
    fireEvent.click(button)
    
    // Should now show sun icon (for switching to light) 
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('starts with correct theme based on defaultTheme prop', () => {
    renderWithTheme(<ThemeToggle />, 'dark')
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('throws error when used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      render(<ThemeToggle />)
    }).toThrow('useTheme must be used within a ThemeProvider')
    
    consoleSpy.mockRestore()
  })
})