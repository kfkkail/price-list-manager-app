import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './Heading'

const meta: Meta<typeof Heading> = {
  title: 'UI/Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive heading component with multiple levels. Automatically scales based on screen size and supports dark mode.'
      }
    }
  },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: 'The heading level (h1-h6)'
    },
    children: {
      control: { type: 'text' },
      description: 'The heading text content'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// All variants showcase - comprehensive heading configurations
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="light p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">All Heading Levels Light Mode</h3>
        <div className="space-y-4">
          <Heading level={1}>Heading Level 1</Heading>
          <Heading level={2}>Heading Level 2</Heading>
          <Heading level={3}>Heading Level 3</Heading>
          <Heading level={4}>Heading Level 4</Heading>
          <Heading level={5}>Heading Level 5</Heading>
          <Heading level={6}>Heading Level 6</Heading>
        </div>
      </div>

      <div className="dark bg-gray-900 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">All Heading Levels Dark Mode</h3>
        <div className="space-y-4">
          <Heading level={1}>Heading Level 1</Heading>
          <Heading level={2}>Heading Level 2</Heading>
          <Heading level={3}>Heading Level 3</Heading>
          <Heading level={4}>Heading Level 4</Heading>
          <Heading level={5}>Heading Level 5</Heading>
          <Heading level={6}>Heading Level 6</Heading>
        </div>
      </div>

    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All heading variants showing different levels and responsive behavior.'
      }
    }
  }
}
