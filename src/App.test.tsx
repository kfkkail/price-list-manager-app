import { screen } from '@testing-library/react'
import { render } from './test-utils'
import { App } from './App'

// Mock the HTTP client to avoid import.meta.env issues
jest.mock('./services/httpClient', () => ({
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
jest.mock('./services/authService', () => ({
  authService: {
    sendVerificationCode: jest.fn(),
    verifyCode: jest.fn(),
    checkAuthStatus: jest.fn().mockResolvedValue({ isAuthenticated: false }),
    isAuthenticated: jest.fn().mockReturnValue(false),
    getAuthToken: jest.fn().mockReturnValue(null),
  },
}))

// Mock toast service
jest.mock('./services/toastService', () => ({
  toastService: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => null,
}))

// Mock the auth context to return authenticated state
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

jest.mock('./contexts/AuthContext', () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}))

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
    
    // The welcome message is rendered as Text component, not as a heading
    const welcomeText = screen.getByText('Welcome to your Dashboard')
    expect(welcomeText).toBeInTheDocument()
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
