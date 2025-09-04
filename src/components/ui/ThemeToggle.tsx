import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { Button } from './Button/Button'

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  className?: string
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'md',
  variant = 'ghost',
  className 
}) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={className}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  )
}