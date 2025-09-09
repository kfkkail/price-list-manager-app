import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'
import { clsx } from 'clsx'

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
  }
}

export default meta
type Story = StoryObj<typeof meta>

const AllVariantsTemplate: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={clsx("space-y-8 light p-4 rounded-lg", className)}>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">All Text Sizes</h3>
        <div className="space-y-4">
          <Text size="xs">Extra Small Text (xs)</Text>
          <Text size="sm">Small Text (sm)</Text>
          <Text size="base">Base Text (base)</Text>
          <Text size="lg">Large Text (lg)</Text>
          <Text size="xl">Extra Large Text (xl)</Text>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">All Text Variants</h3>
        <div className="space-y-4">
          <Text variant="default">Default variant text</Text>
          <Text variant="muted">Muted variant text</Text>
          <Text variant="strong">Strong variant text</Text>
          <Text variant="code">Code variant text</Text>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Size and Variant Combinations</h3>
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
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Custom HTML Elements</h3>
        <div className="space-y-4">
          <Text as="p">This renders as a paragraph element</Text>
          <Text as="span">This renders as a span element</Text>
          <Text as="label">This renders as a label element</Text>
          <Text as="div">This renders as a div element</Text>
        </div>
      </div>
    </div>
  )
}

// All variants showcase - comprehensive text configurations
export const AllVariantsLight: Story = {
  render: () => (
    <AllVariantsTemplate className="space-y-8 light bg-gray-50 p-4 rounded-lg" />
        ),
  parameters: {
    docs: {
      description: {
        story: 'All text variants showing different sizes, variants, combinations, and HTML elements.'
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
        story: 'All text variants showing different sizes, variants, combinations, and HTML elements.'
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
