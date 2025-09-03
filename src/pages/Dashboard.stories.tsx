import type { Meta, StoryObj } from '@storybook/react'
import { Dashboard } from './Dashboard'

const meta: Meta<typeof Dashboard> = {
  title: 'Pages/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main dashboard page for the Price List Manager application.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithCustomTitle: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with default styling and layout.'
      }
    }
  }
}

// Story for testing responsive behavior
export const Responsive: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Dashboard viewed on mobile device to test responsive behavior.'
      }
    }
  }
}

// Story for accessibility testing
export const Accessibility: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Dashboard focused on accessibility features and screen reader support.'
      }
    }
  }
}
