import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Login } from './Login'
import { ThemeProvider } from '../contexts/ThemeContext'
import { Toaster } from '../services/toastService'

// Mock the auth service for Storybook
const mockAuthService = {
  sendVerificationCode: async (email: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { message: `Verification code sent to ${email}` }
  },
  verifyCode: async (email: string, code: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (code === '123456') {
      return {
        user: { id: '1', email, name: 'John Doe', isVerified: true },
        token: 'demo-token',
        expiresAt: new Date().toISOString()
      }
    }
    throw new Error('Invalid verification code')
  },
  checkAuthStatus: async () => ({ isAuthenticated: false }),
  isAuthenticated: () => false,
  getAuthToken: () => null,
}

// Mock the auth context for Storybook
const mockAuthContext = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: true,
  login: mockAuthService.sendVerificationCode,
  verifyCode: mockAuthService.verifyCode,
  logout: async () => {},
  refreshProfile: async () => {},
  checkAuthStatus: async () => {},
}

// Custom AuthProvider for Storybook
const StoryAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
})

const meta: Meta<typeof Login> = {
  title: 'Pages/Login',
  component: Login,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Login page with email verification flow. Shows both email input and verification code steps.',
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/login']}>
          <ThemeProvider>
            <StoryAuthProvider>
              <Story />
              <Toaster />
            </StoryAuthProvider>
          </ThemeProvider>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Login>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default login page showing the email input step.',
      },
    },
  },
}

export const LightMode: Story = {
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story: 'Login page in light mode.',
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/login']}>
          <ThemeProvider defaultTheme="light">
            <StoryAuthProvider>
              <Story />
              <Toaster />
            </StoryAuthProvider>
          </ThemeProvider>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Login page in dark mode.',
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/login']}>
          <ThemeProvider defaultTheme="dark">
            <StoryAuthProvider>
              <Story />
              <Toaster />
            </StoryAuthProvider>
          </ThemeProvider>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
}

// Demo states for the login flow
export const EmailStep: Story = {
  parameters: {
    docs: {
      description: {
        story: 'First step of login flow - email input.',
      },
    },
  },
}

export const WithInstructions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Login page with help instructions visible.',
      },
    },
  },
  render: () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="pt-8 pb-4 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto mb-8">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Demo Instructions</h3>
          <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <p>• Enter any valid email address</p>
            <p>• Use code "123456" to successfully verify</p>
            <p>• Any other code will show an error</p>
          </div>
        </div>
      </div>
      <Login />
    </div>
  ),
}