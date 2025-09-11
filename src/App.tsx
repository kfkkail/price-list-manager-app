import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard, Login } from './pages'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ThemeProvider, AuthProvider } from './contexts'
import { Toaster } from './services/toastService'

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}
