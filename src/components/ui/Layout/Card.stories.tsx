import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardBody, CardFooter } from './Card'
import { Button } from '../Button/Button'
import { Text } from '../Typography/Text'
import clsx from 'clsx'
import { Heading } from '../Typography/Heading'

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
    border: {
      control: { type: 'boolean' },
      description: 'Whether to show a border'
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const AllVariantsTemplate: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={clsx("space-y-8", className)}>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Border & Padding Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card border={true} padding={true}>
            <CardBody>
              <Heading>With Border & Padding</Heading>
              <Text>Default configuration</Text>
            </CardBody>
          </Card>
          
          <Card border={false} padding={true}>
            <CardBody>
              <Heading>No Border, With Padding</Heading>
              <Text>Clean look with padding</Text>
            </CardBody>
          </Card>
          
          <Card border={true} padding={false}>
            <CardBody>
              <Heading>With Border, No Padding</Heading>
              <Text>Custom content control</Text>
            </CardBody>
          </Card>
          
          <Card border={false} padding={false}>
            <CardBody>
              <Heading>No Border, No Padding</Heading>
              <Text>Minimal styling</Text>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

// All variants showcase - comprehensive card configurations
export const AllVariantsLight: Story = {
  render: () => (
     <AllVariantsTemplate className="space-y-8 light bg-gray-50 p-4 rounded-lg" />
  ),
  parameters: {
    docs: {
      description: {
        story: 'All card variants showing different shadow levels, border options, and padding configurations.'
      }
    }
  }
}

export const AllVariantsDark: Story = {
  render: () => (
     <AllVariantsTemplate className="space-y-8 dark bg-gray-900 p-4 rounded-lg" />
  ),
  parameters: {
    docs: {
      description: {
        story: 'All card variants showing different shadow levels, border options, and padding configurations.'
      }
    }
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
