import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '../../../test-utils'
import { Container } from './Container'

describe('Container', () => {
  it('renders with default props', () => {
    render(<Container>Container content</Container>)
    const container = screen.getByText('Container content').closest('div')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('mx-auto', 'max-w-5xl', 'px-4', 'sm:px-6', 'lg:px-8')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Container size="sm">Container content</Container>)
    let container = screen.getByText('Container content').closest('div')
    expect(container).toHaveClass('max-w-3xl')

    rerender(<Container size="md">Container content</Container>)
    container = screen.getByText('Container content').closest('div')
    expect(container).toHaveClass('max-w-4xl')

    rerender(<Container size="lg">Container content</Container>)
    container = screen.getByText('Container content').closest('div')
    expect(container).toHaveClass('max-w-5xl')

    rerender(<Container size="xl">Container content</Container>)
    container = screen.getByText('Container content').closest('div')
    expect(container).toHaveClass('max-w-6xl')

    rerender(<Container size="full">Container content</Container>)
    container = screen.getByText('Container content').closest('div')
    expect(container).toHaveClass('max-w-full')
  })

  it('renders without padding when padding=false', () => {
    render(<Container padding={false}>Container content</Container>)
    const container = screen.getByText('Container content').closest('div')
    expect(container).not.toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
  })

  it('applies custom className', () => {
    render(<Container className="custom-container">Container content</Container>)
    const container = screen.getByText('Container content').closest('div')
    expect(container).toHaveClass('custom-container')
  })

  it('combines all props correctly', () => {
    render(
      <Container 
        size="sm" 
        padding={false} 
        className="custom-class"
      >
        Container content
      </Container>
    )
    const container = screen.getByText('Container content').closest('div')
    expect(container).toHaveClass('mx-auto', 'max-w-3xl', 'custom-class')
    expect(container).not.toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
  })

  it('renders children correctly', () => {
    render(
      <Container>
        <div>Child 1</div>
        <div>Child 2</div>
      </Container>
    )
    
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })

  it('maintains proper responsive behavior', () => {
    render(<Container>Container content</Container>)
    const container = screen.getByText('Container content').closest('div')
    
    // Check responsive padding classes
    expect(container).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
  })
})
