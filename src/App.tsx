import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { 
  Dashboard, 
  PriceLists, 
  PriceListDetail, 
  PriceListFormPage 
} from './pages'
import { ThemeProvider } from './contexts/ThemeContext'

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Price List Management */}
          <Route path="/price-lists" element={<PriceLists />} />
          <Route path="/price-lists/new" element={<PriceListFormPage />} />
          <Route path="/price-lists/:id" element={<PriceListDetail />} />
          <Route path="/price-lists/:id/edit" element={<PriceListFormPage />} />
          
          {/* Catch-all fallback */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}
