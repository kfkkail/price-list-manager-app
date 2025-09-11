import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks'
import { Container, Card, CardBody } from './ui'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

/**
 * Component that protects routes by checking authentication status
 * Redirects to login page if user is not authenticated
 * Shows loading state while checking authentication
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, isInitialized, isLoading } = useAuth()
  const location = useLocation()

  // Show loading state while initializing auth
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Container size="sm">
          <Card>
            <CardBody className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <svg 
                  className="animate-spin h-8 w-8 text-blue-600" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                  />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Checking authentication...
              </p>
            </CardBody>
          </Card>
        </Container>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />
    )
  }

  // Render protected content
  return <>{children}</>
}