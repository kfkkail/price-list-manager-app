import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'UI/Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile text component with multiple sizes and variants. Supports custom HTML elements and dark mode.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
      description: 'The size of the text'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'muted', 'strong', 'code'],
      description: 'The visual style variant'
    },
    children: {
      control: { type: 'text' },
      description: 'The text content'
    },
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div', 'label'],
      description: 'The HTML element to render'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Default text
export const Default: Story = {
  args: {
    children: 'Default text with standard styling'
  }
}

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Text size="xs">Extra Small Text (xs)</Text>
      <Text size="sm">Small Text (sm)</Text>
      <Text size="base">Base Text (base)</Text>
      <Text size="lg">Large Text (lg)</Text>
      <Text size="xl">Extra Large Text (xl)</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All text sizes displayed together for comparison.'
      }
    }
  }
}

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="default">Default variant text</Text>
      <Text variant="muted">Muted variant text</Text>
      <Text variant="strong">Strong variant text</Text>
      <Text variant="code">Code variant text</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All text variants displayed together for comparison.'
      }
    }
  }
}

// Size and variant combinations
export const SizeAndVariantCombinations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <Text size="lg" variant="strong">Large Strong Text</Text>
        <Text size="base" variant="muted">Base muted text below</Text>
      </div>
      <div>
        <Text size="xl" variant="default">Extra Large Default Text</Text>
        <Text size="sm" variant="code">Small code text below</Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combining different sizes and variants for various use cases.'
      }
    }
  }
}

// Custom HTML elements
export const CustomElements: Story = {
  render: () => (
    <div className="space-y-4">
      <Text as="p">This renders as a paragraph element</Text>
      <Text as="span">This renders as a span element</Text>
      <Text as="label">This renders as a label element</Text>
      <Text as="div">This renders as a div element</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text component can render as different HTML elements using the "as" prop.'
      }
    }
  }
}

// Responsive sizing
export const ResponsiveSizing: Story = {
  render: () => (
    <div className="space-y-4">
      <Text size="sm" className="text-sm sm:text-base lg:text-lg">
        Responsive text that scales with screen size
      </Text>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Resize your browser to see the responsive scaling
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text with responsive sizing that adapts to different screen sizes.'
      }
    }
  }
}

// Dark mode showcase
export const DarkMode: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-gray-900 rounded-lg">
      <Text variant="default" className="text-white">Default text in dark mode</Text>
      <Text variant="muted" className="text-gray-300">Muted text in dark mode</Text>
      <Text variant="strong" className="text-gray-100">Strong text in dark mode</Text>
      <Text variant="code" className="text-gray-200">Code text in dark mode</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text components in dark mode with proper contrast.'
      }
    }
  }
}

// Long content
export const LongContent: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Text size="lg" variant="strong">
        This is a longer piece of text that demonstrates how the Text component handles content that spans multiple lines and requires proper line height and spacing.
      </Text>
      <Text variant="muted">
        This paragraph shows how the component works with longer content, including proper text wrapping, line height, and spacing between elements.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text component handling longer content with proper typography.'
      }
    }
  }
}
