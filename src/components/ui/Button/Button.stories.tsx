import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button', 
    variant: 'secondary',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
}

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}