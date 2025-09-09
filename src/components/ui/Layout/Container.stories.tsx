import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

const meta: Meta<typeof Container> = {
  title: 'UI/Layout/Container',
  component: Container,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive container component that provides consistent max-widths and padding across different screen sizes. Perfect for maintaining readable content widths.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'The maximum width of the container'
    },
    padding: {
      control: { type: 'boolean' },
      description: 'Whether to apply responsive padding'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Default container
export const Default: Story = {
  args: {
    children: (
      <div className="bg-blue-100 dark:bg-blue-900 p-8 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Default Container (lg)</h2>
        <p className="text-gray-600 dark:text-gray-300">
          This container uses the default large size with responsive padding.
        </p>
      </div>
    )
  }
}

// All container sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <Container size="sm">
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg text-center">
          <h3 className="font-semibold mb-2">Small Container</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">max-w-3xl</p>
        </div>
      </Container>
      
      <Container size="md">
        <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg text-center">
          <h3 className="font-semibold mb-2">Medium Container</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">max-w-4xl</p>
        </div>
      </Container>
      
      <Container size="lg">
        <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg text-center">
          <h3 className="font-semibold mb-2">Large Container (Default)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">max-w-5xl</p>
        </div>
      </Container>
      
      <Container size="xl">
        <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-lg text-center">
          <h3 className="font-semibold mb-2">Extra Large Container</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">max-w-6xl</p>
        </div>
      </Container>
      
      <Container size="full">
        <div className="bg-red-100 dark:bg-red-900 p-6 rounded-lg text-center">
          <h3 className="font-semibold mb-2">Full Width Container</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">max-w-full</p>
        </div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All container sizes displayed together for comparison.'
      }
    }
  }
}

// Container without padding
export const NoPadding: Story = {
  render: () => (
    <Container padding={false}>
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center">
        <h3 className="font-semibold mb-4">Container Without Padding</h3>
        <p className="text-gray-600 dark:text-gray-300">
          This container has no responsive padding applied.
        </p>
      </div>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Container with padding disabled.'
      }
    }
  }
}

// Responsive behavior
export const Responsive: Story = {
  render: () => (
    <Container>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Responsive Container</h2>
        <p className="mb-4">
          This container automatically adjusts its padding based on screen size:
        </p>
        <div className="text-sm space-y-1">
          <p>• Mobile: px-4</p>
          <p>• Small screens: px-6</p>
          <p>• Large screens: px-8</p>
        </div>
        <p className="mt-4 text-blue-100">
          Resize your browser to see the padding change
        </p>
      </div>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Container demonstrating responsive padding behavior. Resize your browser to see the changes.'
      }
    }
  }
}

// Nested containers
export const Nested: Story = {
  render: () => (
    <Container size="xl">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="font-semibold mb-4 text-center">Outer Container (xl)</h3>
        
        <Container size="md">
          <div className="bg-white dark:bg-gray-700 p-4 rounded border">
            <h4 className="font-medium mb-2 text-center">Inner Container (md)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Nested containers work perfectly together
            </p>
          </div>
        </Container>
        
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Outer: max-w-6xl | Inner: max-w-4xl
        </div>
      </div>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrating how containers can be nested for complex layouts.'
      }
    }
  }
}

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <Container className="bg-gradient-to-br from-pink-100 to-orange-100 dark:from-pink-900 dark:to-orange-900 p-8 rounded-2xl border-2 border-pink-200 dark:border-pink-700">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-pink-800 dark:text-pink-200 mb-4">
          Custom Styled Container
        </h2>
        <p className="text-pink-700 dark:text-pink-300">
          This container has custom background, border, and padding applied via className.
        </p>
      </div>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Container with custom styling applied via className prop.'
      }
    }
  }
}

// Content examples
export const ContentExamples: Story = {
  render: () => (
    <Container>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Article Layout</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This demonstrates how the Container component works with typical content layouts.
            The consistent max-width ensures optimal readability across all devices.
          </p>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Read More
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
              Share
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Form Layout</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of how the Container component works with different content types.'
      }
    }
  }
}
