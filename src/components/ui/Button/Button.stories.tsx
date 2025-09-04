import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states. Perfect for primary actions, secondary actions, and destructive operations.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'ghost'],
      description: 'The visual style variant of the button'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button shows a loading spinner'
    },
    children: {
      control: { type: 'text' },
      description: 'The button text content'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Default button
export const Default: Story = {
  args: {
    children: 'Button'
  }
}

// Primary variant
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}

// Secondary variant
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}

// Danger variant
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete'
  }
}

// Ghost variant
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}

// Small size
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button'
  }
}

// Large size
export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button'
  }
}

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}

// Loading state
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...'
  }
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together for comparison.'
      }
    }
  }
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together for comparison.'
      }
    }
  }
}

// Interactive example
export const Interactive: Story = {
  render: () => {
    const handleClick = () => alert('Button clicked!')
    return (
      <div className="space-y-4">
        <Button onClick={handleClick} variant="primary">
          Click Me
        </Button>
        <p className="text-sm text-gray-600">
          Click the button above to see an alert
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive button that shows an alert when clicked.'
      }
    }
  }
}
