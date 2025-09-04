import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardBody, CardFooter } from './Card'
import { Button } from '../Button/Button'

const meta: Meta<typeof Card> = {
  title: 'UI/Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component with header, body, and footer sections. Supports different shadow levels, borders, and padding options. Perfect for content containers and layouts.'
      }
    }
  },
  argTypes: {
    padding: {
      control: { type: 'boolean' },
      description: 'Whether to apply default padding'
    },
    shadow: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'none'],
      description: 'The shadow level for the card'
    },
    border: {
      control: { type: 'boolean' },
      description: 'Whether to show a border'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Default card
export const Default: Story = {
  args: {
    children: (
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Default Card</h3>
        <p className="text-gray-600 dark:text-gray-300">
          This card uses all default settings: medium shadow, border, and padding.
        </p>
      </div>
    )
  }
}

// Card with all sections
export const WithAllSections: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Card with All Sections</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">This card demonstrates all available sections</p>
      </CardHeader>
      <CardBody>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This is the main content area of the card. You can put any content here including text, images, forms, or other components.
        </p>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is an example of nested content within the card body.
          </p>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: 2 hours ago</span>
          <Button size="sm">Action</Button>
        </div>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with header, body, and footer sections all properly structured.'
      }
    }
  }
}

// Shadow variants
export const ShadowVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <Card shadow="sm">
        <CardBody>
          <h3 className="font-semibold mb-2">Small Shadow</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">shadow-sm</p>
        </CardBody>
      </Card>
      
      <Card shadow="md">
        <CardBody>
          <h3 className="font-semibold mb-2">Medium Shadow (Default)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">shadow</p>
        </CardBody>
      </Card>
      
      <Card shadow="lg">
        <CardBody>
          <h3 className="font-semibold mb-2">Large Shadow</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">shadow-lg</p>
        </CardBody>
      </Card>
      
      <Card shadow="none">
        <CardBody>
          <h3 className="font-semibold mb-2">No Shadow</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">shadow-none</p>
        </CardBody>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All shadow variants displayed together for comparison.'
      }
    }
  }
}

// Border options
export const BorderOptions: Story = {
  render: () => (
    <div className="space-y-6">
      <Card border={true}>
        <CardBody>
          <h3 className="font-semibold mb-2">With Border (Default)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">border border-gray-200 dark:border-gray-700</p>
        </CardBody>
      </Card>
      
      <Card border={false}>
        <CardBody>
          <h3 className="font-semibold mb-2">Without Border</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">No border applied</p>
        </CardBody>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards with and without borders for comparison.'
      }
    }
  }
}

// Padding options
export const PaddingOptions: Story = {
  render: () => (
    <div className="space-y-6">
      <Card padding={true}>
        <CardBody>
          <h3 className="font-semibold mb-2">With Padding (Default)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Default p-6 padding applied</p>
        </CardBody>
      </Card>
      
      <Card padding={false}>
        <CardBody>
          <h3 className="font-semibold mb-2">Without Padding</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">No padding applied</p>
        </CardBody>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards with and without default padding for comparison.'
      }
    }
  }
}

// Card without header border
export const NoHeaderBorder: Story = {
  render: () => (
    <Card>
      <CardHeader border={false}>
        <h3 className="text-lg font-semibold">No Header Border</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Header without bottom border</p>
      </CardHeader>
      <CardBody>
        <p className="text-gray-600 dark:text-gray-300">
          This card header has no border separating it from the body.
        </p>
      </CardBody>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with header border disabled.'
      }
    }
  }
}

// Card without footer border
export const NoFooterBorder: Story = {
  render: () => (
    <Card>
      <CardBody>
        <p className="text-gray-600 dark:text-gray-300">
          This card body has no border separating it from the footer.
        </p>
      </CardBody>
      <CardFooter border={false}>
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-gray-500 dark:text-gray-400">No border above</span>
          <Button size="sm">Action</Button>
        </div>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with footer border disabled.'
      }
    }
  }
}

// Interactive card
export const Interactive: Story = {
  render: () => (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <CardHeader>
        <h3 className="text-lg font-semibold">Interactive Card</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Hover to see shadow effect</p>
      </CardHeader>
      <CardBody>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This card demonstrates interactive behavior with hover effects and smooth transitions.
        </p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Feature 1</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Feature 2</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Feature 3</span>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="primary" className="w-full">Get Started</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive card with hover effects and smooth transitions.'
      }
    }
  }
}

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 border-blue-200 dark:border-blue-700">
      <CardHeader className="border-blue-200 dark:border-blue-700">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Custom Styled Card</h3>
        <p className="text-sm text-blue-600 dark:text-blue-300">With custom colors and gradients</p>
      </CardHeader>
      <CardBody>
        <p className="text-blue-700 dark:text-blue-300">
          This card demonstrates custom styling applied via className props.
          You can override any default styles to create unique designs.
        </p>
      </CardBody>
      <CardFooter className="border-blue-200 dark:border-blue-700">
        <Button variant="primary" className="bg-blue-600 hover:bg-blue-700">Custom Action</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with custom styling applied via className props.'
      }
    }
  }
}

// Grid layout
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Card 1</h3>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-gray-600 dark:text-gray-300">First card in the grid</p>
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Card 2</h3>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-gray-600 dark:text-gray-300">Second card in the grid</p>
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Card 3</h3>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-gray-600 dark:text-gray-300">Third card in the grid</p>
        </CardBody>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards arranged in a responsive grid layout.'
      }
    }
  }
}
