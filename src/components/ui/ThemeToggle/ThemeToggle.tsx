import React, { useState } from 'react'
import { useTheme } from '../../../contexts/ThemeContext'
import { clsx } from 'clsx'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' }
  ] as const

  return (
    <div className="relative">
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
          'border border-gray-200 dark:border-gray-700'
        )}
        aria-label="Toggle theme"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">
          {isDark ? '🌙' : '☀️'}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            data-testid="theme-toggle-backdrop"
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-20">
            <div className="py-1">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value)
                    setIsOpen(false)
                  }}
                  className={clsx(
                    'w-full px-4 py-2 text-left text-sm transition-colors duration-150',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    'flex items-center space-x-3',
                    theme === themeOption.value && 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  )}
                >
                  <span className="text-base">{themeOption.icon}</span>
                  <span>{themeOption.label}</span>
                  {theme === themeOption.value && (
                    <span className="ml-auto text-blue-600 dark:text-blue-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
