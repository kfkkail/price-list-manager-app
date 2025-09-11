import type { Meta, StoryObj } from '@storybook/react'
import { LoadingSpinner } from './LoadingSpinner'

const meta = {
  title: 'UI/DataDisplay/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof LoadingSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Loading...',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Loading...',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Loading...',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Loading...',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    label: 'Loading...',
  },
}

export const CustomLabel: Story = {
  args: {
    size: 'md',
    label: 'Please wait while we load your data...',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <LoadingSpinner size="sm" />
        <p className="text-xs text-gray-600 mt-2">Small</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="md" />
        <p className="text-xs text-gray-600 mt-2">Medium</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-gray-600 mt-2">Large</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="text-xs text-gray-600 mt-2">Extra Large</p>
      </div>
    </div>
  ),
}

export const InContent: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Loading Content</h2>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
      </div>
      <div className="flex justify-center mt-6">
        <LoadingSpinner size="md" label="Loading more content..." />
      </div>
    </div>
  ),
}

export const Overlay: Story = {
  render: () => (
    <div className="relative">
      <div className="max-w-md mx-auto p-6 bg-white border rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Content Being Updated</h2>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
        <LoadingSpinner size="lg" label="Updating..." />
      </div>
    </div>
  ),
}