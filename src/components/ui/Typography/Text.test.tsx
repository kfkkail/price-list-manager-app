
import { render, screen } from '@testing-library/react'
import { Text } from './Text'

describe('Text', () => {
  it('renders with default props', () => {
    render(<Text>Default text</Text>)
    const text = screen.getByText('Default text')
    expect(text).toBeInTheDocument()
    expect(text.tagName).toBe('P')
    expect(text).toHaveClass('text-base', 'sm:text-lg', 'text-gray-700')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Text size="xs">Extra Small</Text>)
    expect(screen.getByText('Extra Small')).toHaveClass('text-xs', 'sm:text-sm')

    rerender(<Text size="sm">Small</Text>)
    expect(screen.getByText('Small')).toHaveClass('text-sm', 'sm:text-base')

    rerender(<Text size="base">Base</Text>)
    expect(screen.getByText('Base')).toHaveClass('text-base', 'sm:text-lg')

    rerender(<Text size="lg">Large</Text>)
    expect(screen.getByText('Large')).toHaveClass('text-lg', 'sm:text-xl')

    rerender(<Text size="xl">Extra Large</Text>)
    expect(screen.getByText('Extra Large')).toHaveClass('text-xl', 'sm:text-2xl')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Text variant="default">Default variant</Text>)
    expect(screen.getByText('Default variant')).toHaveClass('text-gray-700')

    rerender(<Text variant="muted">Muted variant</Text>)
    expect(screen.getByText('Muted variant')).toHaveClass('text-gray-500')

    rerender(<Text variant="strong">Strong variant</Text>)
    expect(screen.getByText('Strong variant')).toHaveClass('text-gray-900', 'font-medium')

    rerender(<Text variant="code">Code variant</Text>)
    expect(screen.getByText('Code variant')).toHaveClass('text-gray-800', 'bg-gray-100', 'px-1', 'py-0.5', 'rounded', 'font-mono')
  })

  it('renders as different HTML elements', () => {
    const { rerender } = render(<Text as="span">Span text</Text>)
    expect(screen.getByText('Span text').tagName).toBe('SPAN')

    rerender(<Text as="div">Div text</Text>)
    expect(screen.getByText('Div text').tagName).toBe('DIV')

    rerender(<Text as="label">Label text</Text>)
    expect(screen.getByText('Label text').tagName).toBe('LABEL')

    rerender(<Text as="p">Paragraph text</Text>)
    expect(screen.getByText('Paragraph text').tagName).toBe('P')
  })

  it('applies custom className', () => {
    render(<Text className="custom-class">Custom text</Text>)
    expect(screen.getByText('Custom text')).toHaveClass('custom-class')
  })

  it('combines size and variant correctly', () => {
    render(<Text size="lg" variant="strong">Large Strong Text</Text>)
    const text = screen.getByText('Large Strong Text')
    expect(text).toHaveClass('text-lg', 'sm:text-xl', 'text-gray-900', 'font-medium')
  })

  it('renders children correctly', () => {
    render(<Text>Text with <strong>bold</strong> and <em>italic</em> content</Text>)
    const text = screen.getByText(/Text with/)
    expect(text).toHaveTextContent('Text with bold and italic content')
    expect(text.querySelector('strong')).toBeInTheDocument()
    expect(text.querySelector('em')).toBeInTheDocument()
  })

  it('handles empty children', () => {
    render(<Text></Text>)
    const text = screen.getByText('', { selector: 'p' })
    expect(text).toBeInTheDocument()
    expect(text).toBeEmptyDOMElement()
  })

  it('applies dark mode classes correctly', () => {
    // Mock dark mode by adding dark class to document
    document.documentElement.classList.add('dark')
    
    render(<Text variant="default">Dark mode text</Text>)
    const text = screen.getByText('Dark mode text')
    expect(text).toHaveClass('dark:text-gray-300')
    
    render(<Text variant="muted">Dark mode muted</Text>)
    const mutedText = screen.getByText('Dark mode muted')
    expect(mutedText).toHaveClass('dark:text-gray-400')
    
    render(<Text variant="strong">Dark mode strong</Text>)
    const strongText = screen.getByText('Dark mode strong')
    expect(strongText).toHaveClass('dark:text-gray-100')
    
    render(<Text variant="code">Dark mode code</Text>)
    const codeText = screen.getByText('Dark mode code')
    expect(codeText).toHaveClass('dark:text-gray-200', 'dark:bg-gray-700')
    
    // Clean up
    document.documentElement.classList.remove('dark')
  })

  it('maintains proper responsive sizing', () => {
    render(<Text size="sm">Responsive text</Text>)
    const text = screen.getByText('Responsive text')
    expect(text).toHaveClass('text-sm', 'sm:text-base')
  })

  it('handles complex nested content', () => {
    render(
      <Text>
        <span>Complex</span> content with{' '}
        <a href="#" className="text-blue-600 hover:text-blue-800">links</a> and{' '}
        <code className="bg-gray-100 px-1 rounded">code</code>
      </Text>
    )
    
    const text = screen.getByText('Complex')
    expect(text.closest('p')).toHaveTextContent('Complex content with links and code')
    expect(text.closest('p')?.querySelector('span')).toBeInTheDocument()
    expect(text.closest('p')?.querySelector('a')).toBeInTheDocument()
    expect(text.closest('p')?.querySelector('code')).toBeInTheDocument()
  })

  it('applies all variant styles correctly', () => {
    render(<Text variant="code" size="sm">Small code text</Text>)
    const text = screen.getByText('Small code text')
    expect(text).toHaveClass(
      'text-sm', 'sm:text-base', // size
      'text-gray-800', 'bg-gray-100', 'px-1', 'py-0.5', 'rounded', 'font-mono' // variant
    )
  })

  it('forwards additional props', () => {
    render(<Text data-testid="text-element" aria-label="Test text">Test</Text>)
    const text = screen.getByTestId('text-element')
    expect(text).toHaveAttribute('aria-label', 'Test text')
    expect(text).toHaveAttribute('data-testid', 'text-element')
  })
})
