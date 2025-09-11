import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { Tooltip } from './Tooltip'

// Mock timers for testing delays
jest.useFakeTimers()

describe('Tooltip', () => {
  afterEach(() => {
    jest.clearAllTimers()
  })

  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Tooltip content="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      )
      
      expect(screen.getByText('Hover me')).toBeInTheDocument()
    })

    it('does not show tooltip initially', () => {
      render(
        <Tooltip content="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      )
      
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument()
    })
  })

  describe('Mouse interactions', () => {
    it('shows tooltip on mouse enter after delay', async () => {
      render(
        <Tooltip content="Test tooltip" delay={200}>
          <button>Hover me</button>
        </Tooltip>
      )
      
      const button = screen.getByText('Hover me')
      fireEvent.mouseEnter(button)
      
      // Tooltip should not be visible immediately
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument()
      
      // Fast-forward time to trigger tooltip
      act(() => {
        jest.advanceTimersByTime(200)
      })
      
      await waitFor(() => {
        expect(screen.getByText('Test tooltip')).toBeInTheDocument()
      })
    })

    it('hides tooltip on mouse leave', async () => {
      render(
        <Tooltip content="Test tooltip" delay={200}>
          <button>Hover me</button>
        </Tooltip>
      )
      
      const button = screen.getByText('Hover me')
      
      // Show tooltip
      fireEvent.mouseEnter(button)
      
      act(() => {
        jest.advanceTimersByTime(200)
      })
      
      await waitFor(() => {
        expect(screen.getByText('Test tooltip')).toBeInTheDocument()
      })
      
      // Hide tooltip
      fireEvent.mouseLeave(button)
      
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument()
    })

    it('cancels tooltip show on quick mouse leave', () => {
      render(
        <Tooltip content="Test tooltip" delay={200}>
          <button>Hover me</button>
        </Tooltip>
      )
      
      const button = screen.getByText('Hover me')
      
      fireEvent.mouseEnter(button)
      fireEvent.mouseLeave(button)
      
      // Fast-forward time
      act(() => {
        jest.advanceTimersByTime(200)
      })
      
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument()
    })
  })

  describe('Focus interactions', () => {
    it('shows tooltip on focus', async () => {
      render(
        <Tooltip content="Test tooltip" delay={200}>
          <button>Focus me</button>
        </Tooltip>
      )
      
      const button = screen.getByText('Focus me')
      fireEvent.focus(button)
      
      act(() => {
        jest.advanceTimersByTime(200)
      })
      
      await waitFor(() => {
        expect(screen.getByText('Test tooltip')).toBeInTheDocument()
      })
    })

    it('hides tooltip on blur', async () => {
      render(
        <Tooltip content="Test tooltip" delay={200}>
          <button>Focus me</button>
        </Tooltip>
      )
      
      const button = screen.getByText('Focus me')
      
      // Show tooltip
      fireEvent.focus(button)
      
      act(() => {
        jest.advanceTimersByTime(200)
      })
      
      await waitFor(() => {
        expect(screen.getByText('Test tooltip')).toBeInTheDocument()
      })
      
      // Hide tooltip
      fireEvent.blur(button)
      
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument()
    })
  })

  describe('Placement', () => {
    it('renders with top placement by default', async () => {
      render(
        <Tooltip content="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      )
      
      const button = screen.getByText('Hover me')
      fireEvent.mouseEnter(button)
      
      act(() => {
        jest.advanceTimersByTime(200)
      })
      
      await waitFor(() => {
        const tooltip = screen.getByText('Test tooltip')
        expect(tooltip).toBeInTheDocument()
        expect(tooltip).toHaveClass('bottom-full', 'left-1/2', '-translate-x-1/2', 'mb-2')
      })
    })

    it('renders with bottom placement', async () => {
      render(
        <Tooltip content="Test tooltip" placement="bottom">
          <button>Hover me</button>
        </Tooltip>
      )
      
      const button = screen.getByText('Hover me')
      fireEvent.mouseEnter(button)
      
      act(() => {
        jest.advanceTimersByTime(200)
      })
      
      await waitFor(() => {
        const tooltip = screen.getByText('Test tooltip')
        expect(tooltip).toHaveClass('top-full', 'left-1/2', '-translate-x-1/2', 'mt-2')
      })
    })

    it('renders with left placement', async () => {
      render(
        <Tooltip content="Test tooltip" placement="left">
          <button>Hover me</button>
        </Tooltip>
      )
      
      const button = screen.getByText('Hover me')
      fireEvent.mouseEnter(button)
      
      act(() => {
        jest.advanceTimersByTime(200)
      })
      
      await waitFor(() => {
        const tooltip = screen.getByText('Test tooltip')
        expect(tooltip).toHaveClass('right-full', 'top-1/2', '-translate-y-1/2', 'mr-2')
      })
    })

    it('renders with right placement', async () => {
      render(
        <Tooltip content="Test tooltip" placement="right">
          <button>Hover me</button>
        </Tooltip>
      )
      
      const button = screen.getByText('Hover me')
      fireEvent.mouseEnter(button)
      
      act(() => {
        jest.advanceTimersByTime(200)
      })
      
      await waitFor(() => {
        const tooltip = screen.getByText('Test tooltip')
        expect(tooltip).toHaveClass('left-full', 'top-1/2', '-translate-y-1/2', 'ml-2')
      })
    })
  })

  describe('Custom delay', () => {
    it('uses custom delay', async () => {
      render(
        <Tooltip content="Test tooltip" delay={500}>
          <button>Hover me</button>
        </Tooltip>
      )
      
      const button = screen.getByText('Hover me')
      fireEvent.mouseEnter(button)
      
      // Should not show after default delay
      act(() => {
        jest.advanceTimersByTime(200)
      })
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument()
      
      // Should show after custom delay
      act(() => {
        jest.advanceTimersByTime(300)
      })
      
      await waitFor(() => {
        expect(screen.getByText('Test tooltip')).toBeInTheDocument()
      })
    })

    it('uses default delay when not specified', async () => {
      render(
        <Tooltip content="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      )
      
      const button = screen.getByText('Hover me')
      fireEvent.mouseEnter(button)
      
      act(() => {
        jest.advanceTimersByTime(200)
      })
      
      await waitFor(() => {
        expect(screen.getByText('Test tooltip')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', async () => {
      render(
        <Tooltip content="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      )
      
      const button = screen.getByText('Hover me')
      fireEvent.mouseEnter(button)
      
      act(() => {
        jest.advanceTimersByTime(200)
      })
      
      await waitFor(() => {
        const tooltip = screen.getByText('Test tooltip')
        expect(tooltip).toHaveAttribute('role', 'tooltip')
        expect(tooltip).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })

  describe('Custom styling', () => {
    it('applies custom className', () => {
      render(
        <Tooltip content="Test tooltip" className="custom-class">
          <button>Hover me</button>
        </Tooltip>
      )
      
      const container = screen.getByText('Hover me').parentElement
      expect(container).toHaveClass('custom-class')
    })

    it('applies data-testid', () => {
      render(
        <Tooltip content="Test tooltip" data-testid="custom-tooltip">
          <button>Hover me</button>
        </Tooltip>
      )
      
      expect(screen.getByTestId('custom-tooltip')).toBeInTheDocument()
    })
  })
})