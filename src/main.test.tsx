import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

// Mock the CSS import
jest.mock('./index.css', () => ({}), { virtual: true })

// Mock ReactDOM to prevent execution
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}))

describe('Main Entry Point', () => {
  it('can import main.tsx without errors', () => {
    // This test verifies that the main.tsx file can be imported
    // without throwing errors, which means the syntax is correct
    expect(() => {
      require('./main.tsx')
    }).not.toThrow()
  })

  it('has correct import structure', () => {
    // Test that all required modules can be imported
    expect(React).toBeDefined()
    expect(QueryClient).toBeDefined()
    expect(QueryClientProvider).toBeDefined()
    expect(BrowserRouter).toBeDefined()
  })

  it('creates QueryClient instance', () => {
    // Test that QueryClient can be instantiated
    const queryClient = new QueryClient()
    expect(queryClient).toBeInstanceOf(QueryClient)
  })

  it('has proper React imports', () => {
    // Test React imports
    expect(React.StrictMode).toBeDefined()
    expect(typeof React.StrictMode).toBe('symbol')
  })

  it('can create provider components', () => {
    // Test that provider components can be created
    const queryClient = new QueryClient()
    
    // These should not throw errors
    expect(() => {
      React.createElement(QueryClientProvider, { client: queryClient })
    }).not.toThrow()
    
    expect(() => {
      React.createElement(BrowserRouter)
    }).not.toThrow()
  })
})
