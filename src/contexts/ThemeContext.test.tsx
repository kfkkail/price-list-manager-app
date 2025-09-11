import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeContext'

// Test component that uses the theme context
const TestComponent = () => {
  const { theme, setTheme, isDark } = useTheme()
  
  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <span data-testid="is-dark">{isDark.toString()}</span>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
    </div>
  )
}

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Clear document classes
    document.documentElement.classList.remove('dark', 'light')
  })

  describe('ThemeProvider', () => {
    it('provides theme context to children', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('current-theme')).toBeInTheDocument()
      expect(screen.getByTestId('toggle-button')).toBeInTheDocument()
    })

    it('initializes with system theme when no stored preference', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('system')
    })

    it('initializes with stored theme preference', () => {
      mockLocalStorage.getItem.mockReturnValue('dark')
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
    })

    it('detects system dark mode preference', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      // Mock system preference for dark mode
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('system')
      expect(screen.getByTestId('is-dark')).toHaveTextContent('true')
    })

    it('applies theme class to document element', () => {
      mockLocalStorage.getItem.mockReturnValue('dark')
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )
      
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  describe('setTheme', () => {
    it('changes from system to light', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('system')
      
      fireEvent.click(screen.getByTestId('toggle-button'))
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light')
      expect(document.documentElement.classList.contains('light')).toBe(true)
    })

    it('toggles from light to dark', () => {
      mockLocalStorage.getItem.mockReturnValue('light')
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
      
      fireEvent.click(screen.getByTestId('toggle-button'))
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('toggles from dark to light', () => {
      mockLocalStorage.getItem.mockReturnValue('dark')
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
      
      fireEvent.click(screen.getByTestId('toggle-button'))
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light')
      expect(document.documentElement.classList.contains('light')).toBe(true)
    })
  })

  describe('useTheme hook', () => {
    it('throws error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      expect(() => {
        render(<TestComponent />)
      }).toThrow('useTheme must be used within a ThemeProvider')
      
      consoleSpy.mockRestore()
    })
  })

  describe('localStorage interaction', () => {
    it('saves theme preference to localStorage', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )
      
      fireEvent.click(screen.getByTestId('toggle-button'))
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', expect.any(String))
    })
  })

  describe('system theme detection', () => {
    beforeEach(() => {
      // Reset localStorage mock for these tests
      mockLocalStorage.setItem.mockImplementation(() => {})
    })

    it('applies dark class when system prefers dark mode', () => {
      mockLocalStorage.getItem.mockReturnValue('system')
      
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('system')
      expect(screen.getByTestId('is-dark')).toHaveTextContent('true')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('applies light class when system prefers light mode', () => {
      mockLocalStorage.getItem.mockReturnValue('system')
      
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false, // No preference matches, defaults to light
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
      
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('current-theme')).toHaveTextContent('system')
      expect(screen.getByTestId('is-dark')).toHaveTextContent('false')
      expect(document.documentElement.classList.contains('light')).toBe(true)
    })
  })
})