import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './Heading'

const meta: Meta<typeof Heading> = {
  title: 'UI/Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive heading component with multiple levels and sizes. Automatically scales based on screen size and supports dark mode.'
      }
    }
  },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: 'The heading level (h1-h6)'
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'large', 'small'],
      description: 'Size override for the heading'
    },
    children: {
      control: { type: 'text' },
      description: 'The heading text content'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Default heading
export const Default: Story = {
  args: {
    children: 'Default Heading'
  }
}

// All heading levels
export const AllLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All heading levels displayed together for comparison.'
      }
    }
  }
}

// Size variants
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1} size="small">Small H1</Heading>
      <Heading level={1} size="default">Default H1</Heading>
      <Heading level={1} size="large">Large H1</Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants for the same heading level.'
      }
    }
  }
}

// Responsive behavior
export const Responsive: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1}>Responsive H1 (2xl → 3xl → 4xl)</Heading>
      <Heading level={2}>Responsive H2 (xl → 2xl → 3xl)</Heading>
      <Heading level={3}>Responsive H3 (lg → xl → 2xl)</Heading>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Resize your browser to see the responsive scaling in action
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Headings automatically scale based on screen size. Try resizing your browser window.'
      }
    }
  }
}

// Dark mode showcase
export const DarkMode: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-gray-900 rounded-lg">
      <Heading level={1} className="text-white">Dark Mode H1</Heading>
      <Heading level={2} className="text-gray-200">Dark Mode H2</Heading>
      <Heading level={3} className="text-gray-300">Dark Mode H3</Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Headings in dark mode with proper contrast.'
      }
    }
  }
}

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1} className="text-blue-600 dark:text-blue-400">
        Custom Blue H1
      </Heading>
      <Heading level={2} className="text-green-600 dark:text-green-400 border-b-2 border-green-300 pb-2">
        Custom Green H2 with Border
      </Heading>
      <Heading level={3} className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Gradient H3
      </Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Headings with custom styling and CSS classes.'
      }
    }
  }
}
