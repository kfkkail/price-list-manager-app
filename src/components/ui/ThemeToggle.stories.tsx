import type { Meta, StoryObj } from '@storybook/react'
import { ThemeToggle } from './ThemeToggle'
import { ThemeProvider } from '../../contexts/ThemeContext'

const meta: Meta<typeof ThemeToggle> = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A theme toggle component that allows users to switch between light, dark, and system themes. Features a dropdown menu with smooth animations and proper accessibility.'
      }
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    )
  ],
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Default theme toggle
export const Default: Story = {
  render: () => (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg">
      <ThemeToggle />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default theme toggle button with dropdown functionality.'
      }
    }
  }
}

// In header context
export const InHeader: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          App Header
        </h1>
        <ThemeToggle />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Theme toggle positioned in a typical header layout.'
      }
    }
  }
}

// Multiple toggles
export const MultipleToggles: Story = {
  render: () => (
    <div className="space-y-4 p-8 bg-white dark:bg-gray-900 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300">Primary toggle:</span>
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300">Secondary toggle:</span>
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300">Tertiary toggle:</span>
        <ThemeToggle />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple theme toggles demonstrating that they all work independently and share the same theme state.'
      }
    }
  }
}

// Different backgrounds
export const DifferentBackgrounds: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg border">
        <h3 className="font-semibold mb-4">Light Background</h3>
        <ThemeToggle />
      </div>
      
      <div className="p-6 bg-gray-900 rounded-lg">
        <h3 className="font-semibold mb-4 text-white">Dark Background</h3>
        <ThemeToggle />
      </div>
      
      <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-lg">
        <h3 className="font-semibold mb-4 text-blue-800 dark:text-blue-200">Colored Background</h3>
        <ThemeToggle />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Theme toggle on different background colors to show contrast and visibility.'
      }
    }
  }
}

// Interactive demonstration
export const InteractiveDemo: Story = {
  render: () => (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Interactive Theme Demo
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Click the theme toggle to see the entire interface change themes
        </p>
      </div>
      
      <div className="flex justify-center mb-6">
        <ThemeToggle />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Sample Content</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            This content area demonstrates how the theme affects different UI elements.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Another Section</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Notice how borders, backgrounds, and text colors all adapt to the selected theme.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration showing how the theme toggle affects the entire interface. Click the toggle to see the theme change in real-time.'
      }
    }
  }
}

// Accessibility showcase
export const Accessibility: Story = {
  render: () => (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Accessibility Features
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Keyboard Navigation:</strong> Tab to focus, Enter/Space to open, Escape to close
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Screen Reader:</strong> Proper ARIA labels and descriptions
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Accessibility Checklist</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>✅ Proper ARIA labels and descriptions</li>
            <li>✅ Keyboard navigation support</li>
            <li>✅ Focus management</li>
            <li>✅ Screen reader compatibility</li>
            <li>✅ High contrast support</li>
            <li>✅ Semantic HTML structure</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrating the accessibility features of the theme toggle component.'
      }
    }
  }
}

// Responsive behavior
export const Responsive: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Mobile Layout</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Theme:</span>
          <ThemeToggle />
        </div>
      </div>
      
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Tablet Layout</h3>
        <div className="flex justify-between items-center">
          <span className="text-base text-gray-600 dark:text-gray-400">Select Theme:</span>
          <ThemeToggle />
        </div>
      </div>
      
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Desktop Layout</h3>
        <div className="flex justify-between items-center">
          <span className="text-lg text-gray-600 dark:text-gray-400">Choose Your Theme:</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Theme toggle in different responsive layouts and sizes.'
      }
    }
  }
}
