
import { render, screen } from '@testing-library/react'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renders with default props', () => {
    render(<Heading>Test Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Heading')
    expect(heading).toHaveClass('text-2xl', 'sm:text-3xl', 'lg:text-4xl', 'font-bold', 'text-gray-900')
  })

  it('renders with different levels', () => {
    const { rerender } = render(<Heading level={1}>H1 Heading</Heading>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

    rerender(<Heading level={2}>H2 Heading</Heading>)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()

    rerender(<Heading level={3}>H3 Heading</Heading>)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()

    rerender(<Heading level={4}>H4 Heading</Heading>)
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument()

    rerender(<Heading level={5}>H5 Heading</Heading>)
    expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument()

    rerender(<Heading level={6}>H6 Heading</Heading>)
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument()
  })

  it('renders with correct default level styles', () => {
    render(<Heading level={1}>H1 Heading</Heading>)
    expect(screen.getByRole('heading')).toHaveClass('text-2xl', 'sm:text-3xl', 'lg:text-4xl', 'font-bold', 'text-gray-900')
  })

  it('applies correct styles for each level', () => {
    const { rerender } = render(<Heading level={1}>H1</Heading>)
    expect(screen.getByRole('heading')).toHaveClass('font-bold', 'text-gray-900')

    rerender(<Heading level={2}>H2</Heading>)
    expect(screen.getByRole('heading')).toHaveClass('font-semibold', 'text-gray-800')

    rerender(<Heading level={3}>H3</Heading>)
    expect(screen.getByRole('heading')).toHaveClass('font-semibold', 'text-gray-800')

    rerender(<Heading level={4}>H4</Heading>)
    expect(screen.getByRole('heading')).toHaveClass('font-medium', 'text-gray-700')

    rerender(<Heading level={5}>H5</Heading>)
    expect(screen.getByRole('heading')).toHaveClass('font-medium', 'text-gray-700')

    rerender(<Heading level={6}>H6</Heading>)
    expect(screen.getByRole('heading')).toHaveClass('font-medium', 'text-gray-600')
  })

  it('applies custom className', () => {
    render(<Heading className="custom-class">Custom Heading</Heading>)
    expect(screen.getByRole('heading')).toHaveClass('custom-class')
  })

  it('renders with correct level 2 styles', () => {
    render(<Heading level={2}>H2 Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveClass('text-xl', 'sm:text-2xl', 'lg:text-3xl')
    expect(heading).toHaveClass('font-semibold', 'text-gray-800')
  })

  it('renders children correctly', () => {
    render(<Heading>Complex <strong>Content</strong> with <em>HTML</em></Heading>)
    const heading = screen.getByRole('heading')
    expect(heading).toHaveTextContent('Complex Content with HTML')
    expect(heading.querySelector('strong')).toBeInTheDocument()
    expect(heading.querySelector('em')).toBeInTheDocument()
  })

  it('handles empty children', () => {
    render(<Heading></Heading>)
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
    expect(heading).toBeEmptyDOMElement()
  })

  it('applies dark mode classes correctly', () => {
    // Mock dark mode by adding dark class to document
    document.documentElement.classList.add('dark')
    
    render(<Heading level={1}>Dark Mode Heading</Heading>)
    const heading = screen.getByRole('heading')
    expect(heading).toHaveClass('dark:text-gray-100')
    
    // Clean up
    document.documentElement.classList.remove('dark')
  })

  it('maintains proper semantic structure', () => {
    render(
      <div>
        <Heading level={1}>Main Title</Heading>
        <Heading level={2}>Section Title</Heading>
        <Heading level={3}>Subsection Title</Heading>
      </div>
    )
    
    const headings = screen.getAllByRole('heading')
    expect(headings).toHaveLength(3)
    expect(headings[0].tagName).toBe('H1')
    expect(headings[1].tagName).toBe('H2')
    expect(headings[2].tagName).toBe('H3')
  })
})
