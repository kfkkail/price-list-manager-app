import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('border-gray-300') // default variant
    expect(input).toHaveClass('px-3 py-2') // md size
  })

  it('renders with label', () => {
    render(<Input label="Email" placeholder="Enter email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Input variant="default" />)
    expect(screen.getByRole('textbox')).toHaveClass('border-gray-300')

    rerender(<Input variant="error" />)
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')

    rerender(<Input variant="success" />)
    expect(screen.getByRole('textbox')).toHaveClass('border-green-500')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" />)
    expect(screen.getByRole('textbox')).toHaveClass('px-3', 'py-1.5', 'text-sm')

    rerender(<Input size="md" />)
    expect(screen.getByRole('textbox')).toHaveClass('px-3', 'py-2', 'text-base')

    rerender(<Input size="lg" />)
    expect(screen.getByRole('textbox')).toHaveClass('px-4', 'py-3', 'text-lg')
  })

  it('handles disabled state', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('handles loading state', () => {
    render(<Input loading />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    // Check for spinner SVG
    expect(input.parentElement?.querySelector('svg')).toBeInTheDocument()
  })

  it('displays error message', () => {
    render(<Input error="This field is required" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-500')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required')
  })

  it('displays help text', () => {
    render(<Input helpText="Enter your email address" />)
    expect(screen.getByText('Enter your email address')).toBeInTheDocument()
  })

  it('error overrides variant', () => {
    render(<Input variant="success" error="Invalid input" />)
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500')
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid input')
  })

  it('does not show help text when error is present', () => {
    render(<Input error="Error message" helpText="Help text" />)
    expect(screen.getByText('Error message')).toBeInTheDocument()
    expect(screen.queryByText('Help text')).not.toBeInTheDocument()
  })

  it('handles input changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'test value' })
    }))
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  it('forwards additional props', () => {
    render(<Input data-testid="custom-input" autoComplete="email" />)
    const input = screen.getByTestId('custom-input')
    expect(input).toHaveAttribute('autoComplete', 'email')
  })

  it('generates unique id when not provided', () => {
    render(<Input label="Test" />)
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Test')
    
    expect(input).toHaveAttribute('id')
    expect(label).toHaveAttribute('for', input.getAttribute('id'))
  })

  it('uses provided id', () => {
    render(<Input label="Test" id="custom-id" />)
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Test')
    
    expect(input).toHaveAttribute('id', 'custom-id')
    expect(label).toHaveAttribute('for', 'custom-id')
  })

  it('associates error message with input', () => {
    render(<Input id="test-input" error="Error message" />)
    const input = screen.getByRole('textbox')
    const error = screen.getByRole('alert')
    
    expect(input).toHaveAttribute('aria-describedby')
    expect(input.getAttribute('aria-describedby')).toContain(error.getAttribute('id'))
  })

  it('associates help text with input', () => {
    render(<Input id="test-input" helpText="Help message" />)
    const input = screen.getByRole('textbox')
    const help = screen.getByText('Help message')
    
    expect(input).toHaveAttribute('aria-describedby')
    expect(input.getAttribute('aria-describedby')).toContain(help.getAttribute('id'))
  })
})