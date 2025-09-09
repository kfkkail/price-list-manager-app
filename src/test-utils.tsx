import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './contexts/ThemeContext'

// Create a custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
  queryClient?: QueryClient
}

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
    mutations: {
      retry: false,
    },
  },
})

const AllTheProviders = ({ 
  children, 
  queryClient = createTestQueryClient(),
  route = '/'
}: { 
  children: React.ReactNode
  queryClient?: QueryClient
  route?: string
 }) => {
  // Set up the route if needed
  if (typeof window !== 'undefined') {
    window.history.pushState({}, 'Test page', route)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { route, queryClient, ...renderOptions } = options
  
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders route={route} queryClient={queryClient}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  })
}

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { customRender as render }

// Export custom providers for specific test cases
export { AllTheProviders, createTestQueryClient }

// Helper function to wait for loading states
export const waitForLoadingToFinish = () => {
  return new Promise(resolve => setTimeout(resolve, 0))
}
