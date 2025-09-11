import React from 'react'
import { Container, Heading, ThemeToggle, Text, Button } from '../components/ui'
import { useAuth } from '../hooks'

export const Dashboard: React.FC = () => {
  const { user, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      // Error is handled by the auth context
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <Container>
          <div className="flex justify-between items-center py-6">
            <div>
              <Heading level={1}>Price List Manager</Heading>
              <Text variant="muted" size="sm">
                Manage your product pricing efficiently
              </Text>
              {user && (
                <Text variant="muted" size="sm" className="mt-1">
                  Welcome back, {user.email}
                </Text>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                loading={isLoading}
              >
                Logout
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-6">
        <Container>
          <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <Text className="text-lg font-medium text-gray-900 mb-2">
                Welcome to your Dashboard
              </Text>
              <Text className="text-gray-500">
                This is where you'll manage your price lists and products.
              </Text>
            </div>
          </div>
        </Container>
      </main>
    </div>
  )
}
