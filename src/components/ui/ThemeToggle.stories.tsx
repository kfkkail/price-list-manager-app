import type { Meta, StoryObj } from '@storybook/react'
import { ThemeToggle } from './ThemeToggle'

const meta: Meta<typeof ThemeToggle> = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle button component that switches between light and dark themes.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toggle button'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant'
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}