import type { Meta, StoryObj } from '@storybook/react'
import { ThemeToggle } from './ThemeToggle'

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
  }
}

export default meta
type Story = StoryObj<typeof meta>

// All variants showcase - comprehensive theme toggle configurations
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Default Theme Toggle</h3>
        <div className="p-8 bg-white dark:bg-gray-900 rounded-lg">
          <ThemeToggle />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">In Header Context</h3>
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              App Header
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All theme toggle variants showing different contexts, layouts, and background configurations.'
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
