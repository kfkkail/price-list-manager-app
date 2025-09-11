import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { Dashboard } from './Dashboard'

// Mock the HTTP client to avoid import.meta.env issues
jest.mock('../services/httpClient', () => ({
  httpClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    setAuthToken: jest.fn(),
    clearAuthToken: jest.fn(),
    getAuthToken: jest.fn(),
  },
}))

// Mock the auth service
jest.mock('../services/authService', () => ({
  authService: {
    sendVerificationCode: jest.fn(),
    verifyCode: jest.fn(),
    checkAuthStatus: jest.fn().mockResolvedValue({ isAuthenticated: false }),
    isAuthenticated: jest.fn().mockReturnValue(false),
    getAuthToken: jest.fn().mockReturnValue(null),
  },
}))

// Mock toast service
jest.mock('../services/toastService', () => ({
  toastService: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => null,
}))

// Mock the auth context
const mockAuthContext = {
  user: { id: '1', email: 'test@example.com' },
  isAuthenticated: true,
  isLoading: false,
  isInitialized: true,
  login: jest.fn(),
  verifyCode: jest.fn(),
  logout: jest.fn(),
  refreshProfile: jest.fn(),
  checkAuthStatus: jest.fn(),
}

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}))

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
      const welcomeTitle = screen.getByText('Welcome to your Dashboard')
      expect(welcomeTitle).toBeInTheDocument()
      
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
      expect(headings).toHaveLength(1)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      
      expect(h1).toBeInTheDocument()
      expect(h1).toHaveTextContent('Price List Manager')
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
