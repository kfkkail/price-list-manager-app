import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Login } from './Login'
import { AuthProvider } from '../contexts/AuthContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import { Toaster } from '../services/toastService'

// Mock the auth service
jest.mock('../services/authService', () => ({
  authService: {
    sendVerificationCode: jest.fn().mockResolvedValue({ message: 'Code sent' }),
    verifyCode: jest.fn().mockResolvedValue({ 
      user: { id: '1', email: 'test@example.com' }, 
      token: 'test-token' 
    }),
    checkAuthStatus: jest.fn().mockResolvedValue({ isAuthenticated: false }),
    isAuthenticated: jest.fn().mockReturnValue(false),
    getAuthToken: jest.fn().mockReturnValue(null),
  },
}))

// Mock navigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: null }),
}))

// Mock toast service to prevent issues
jest.mock('../services/toastService', () => ({
  toastService: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => null,
}))

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  </MemoryRouter>
)

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders email step initially', () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    )

    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByText('Enter your email to sign in')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send verification code/i })).toBeInTheDocument()
  })

  it('validates email format', async () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    )

    const emailInput = screen.getByLabelText('Email Address')
    const submitButton = screen.getByRole('button', { name: /send verification code/i })

    // Test empty email
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })

    // Test invalid email format
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('advances to verification step after successful email submission', async () => {
    const { authService } = require('../services/authService')
    authService.sendVerificationCode.mockResolvedValue({ message: 'Code sent' })

    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    )

    const emailInput = screen.getByLabelText('Email Address')
    const submitButton = screen.getByRole('button', { name: /send verification code/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Enter the verification code sent to your email')).toBeInTheDocument()
      expect(screen.getByText('test@example.com')).toBeInTheDocument()
      expect(screen.getByLabelText('Verification Code')).toBeInTheDocument()
    })
  })

  it('validates verification code format', async () => {
    const { authService } = require('../services/authService')
    authService.sendVerificationCode.mockResolvedValue({ message: 'Code sent' })

    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    )

    // First advance to verification step
    const emailInput = screen.getByLabelText('Email Address')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /send verification code/i }))

    await waitFor(() => {
      expect(screen.getByLabelText('Verification Code')).toBeInTheDocument()
    })

    const codeInput = screen.getByLabelText('Verification Code')
    const verifyButton = screen.getByRole('button', { name: /verify code/i })

    // Test empty code
    fireEvent.click(verifyButton)
    await waitFor(() => {
      expect(screen.getByText('Verification code is required')).toBeInTheDocument()
    })

    // Test invalid code length
    fireEvent.change(codeInput, { target: { value: '123' } })
    fireEvent.click(verifyButton)
    await waitFor(() => {
      expect(screen.getByText('Verification code must be 6 digits')).toBeInTheDocument()
    })

    // Test non-numeric code
    fireEvent.change(codeInput, { target: { value: 'abcdef' } })
    fireEvent.click(verifyButton)
    await waitFor(() => {
      expect(screen.getByText('Verification code must contain only numbers')).toBeInTheDocument()
    })
  })

  it('restricts code input to numbers only', async () => {
    const { authService } = require('../services/authService')
    authService.sendVerificationCode.mockResolvedValue({ message: 'Code sent' })

    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    )

    // Advance to verification step
    const emailInput = screen.getByLabelText('Email Address')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /send verification code/i }))

    await waitFor(() => {
      expect(screen.getByLabelText('Verification Code')).toBeInTheDocument()
    })

    const codeInput = screen.getByLabelText('Verification Code')

    // Test that only numbers are accepted
    fireEvent.change(codeInput, { target: { value: 'abc123def456' } })
    expect(codeInput).toHaveValue('123456')

    // Test max length restriction
    fireEvent.change(codeInput, { target: { value: '1234567890' } })
    expect(codeInput).toHaveValue('123456')
  })

  it('allows going back to email step', async () => {
    const { authService } = require('../services/authService')
    authService.sendVerificationCode.mockResolvedValue({ message: 'Code sent' })

    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    )

    // Advance to verification step
    const emailInput = screen.getByLabelText('Email Address')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /send verification code/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /change email/i })).toBeInTheDocument()
    })

    // Go back to email step
    fireEvent.click(screen.getByRole('button', { name: /change email/i }))

    expect(screen.getByText('Enter your email to sign in')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
  })

  it('allows resending verification code', async () => {
    const { authService } = require('../services/authService')
    authService.sendVerificationCode.mockResolvedValue({ message: 'Code sent' })

    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    )

    // Advance to verification step
    const emailInput = screen.getByLabelText('Email Address')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /send verification code/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /resend code/i })).toBeInTheDocument()
    })

    // Resend code
    fireEvent.click(screen.getByRole('button', { name: /resend code/i }))

    expect(authService.sendVerificationCode).toHaveBeenCalledTimes(2)
    expect(authService.sendVerificationCode).toHaveBeenLastCalledWith('test@example.com')
  })

  it('disables submit buttons during loading', async () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    )

    const emailInput = screen.getByLabelText('Email Address')
    const submitButton = screen.getByRole('button', { name: /send verification code/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    // Button should be enabled with valid email
    expect(submitButton).not.toBeDisabled()

    // Button should be disabled with empty email
    fireEvent.change(emailInput, { target: { value: '' } })
    expect(submitButton).toBeDisabled()
  })

  it('shows help text', () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    )

    expect(screen.getByText(/having trouble\? check your spam folder/i)).toBeInTheDocument()
  })
})