import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'

const meta = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnBackdrop: {
      control: { type: 'boolean' },
    },
    closeOnEscape: {
      control: { type: 'boolean' },
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const ModalTemplate = (args: any) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {args.children}
      </Modal>
    </div>
  )
}

export const Default: Story = {
  render: ModalTemplate,
  args: {
    title: 'Default Modal',
    children: (
      <div>
        <p>This is a default modal with some content.</p>
        <p>You can close it by clicking the close button, pressing escape, or clicking the backdrop.</p>
      </div>
    ),
  },
}

export const WithFooter: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal with Footer',
    children: (
      <div>
        <p>This modal has a custom footer with action buttons.</p>
      </div>
    ),
    footer: (
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </div>
    ),
  },
}

export const Small: Story = {
  render: ModalTemplate,
  args: {
    title: 'Small Modal',
    size: 'sm',
    children: (
      <div>
        <p>This is a small modal.</p>
      </div>
    ),
  },
}

export const Large: Story = {
  render: ModalTemplate,
  args: {
    title: 'Large Modal',
    size: 'lg',
    children: (
      <div>
        <p>This is a large modal with more space for content.</p>
        <p>It can accommodate more complex layouts and longer text.</p>
      </div>
    ),
  },
}

export const NoCloseButton: Story = {
  render: ModalTemplate,
  args: {
    title: 'No Close Button',
    showCloseButton: false,
    children: (
      <div>
        <p>This modal has no close button in the header.</p>
        <p>You can still close it by pressing escape or clicking the backdrop.</p>
      </div>
    ),
  },
}

export const NoBackdropClose: Story = {
  render: ModalTemplate,
  args: {
    title: 'No Backdrop Close',
    closeOnBackdrop: false,
    children: (
      <div>
        <p>This modal cannot be closed by clicking the backdrop.</p>
        <p>Use the close button or press escape to close.</p>
      </div>
    ),
  },
}

export const Confirmation: Story = {
  render: ModalTemplate,
  args: {
    title: 'Confirm Action',
    size: 'sm',
    children: (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
      </div>
    ),
    footer: (
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary" className="bg-red-600 hover:bg-red-700">
          Delete
        </Button>
      </div>
    ),
  },
}