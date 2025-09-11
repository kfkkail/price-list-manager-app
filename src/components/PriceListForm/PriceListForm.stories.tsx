import type { Meta, StoryObj } from '@storybook/react'
import { PriceListForm } from './PriceListForm'
import type { PriceList } from '../../types'

const meta = {
  title: 'Components/PriceListForm',
  component: PriceListForm,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PriceListForm>

export default meta
type Story = StoryObj<typeof meta>

// Sample data
const existingPriceList: PriceList = {
  id: 1,
  name: 'Standard Pricing',
  created_at: new Date('2024-01-15T10:30:00Z'),
  updated_at: new Date('2024-01-20T14:45:00Z'),
}

export const Create: Story = {
  args: {
    mode: 'create',
    onSubmit: (data) => {
      console.log('Create form submitted:', data)
      return new Promise(resolve => setTimeout(resolve, 1000))
    },
    onCancel: () => console.log('Create form cancelled'),
    loading: false,
  },
}

export const Edit: Story = {
  args: {
    mode: 'edit',
    priceList: existingPriceList,
    onSubmit: (data) => {
      console.log('Edit form submitted:', data)
      return new Promise(resolve => setTimeout(resolve, 1000))
    },
    onCancel: () => console.log('Edit form cancelled'),
    loading: false,
    enableAutoSave: true,
  },
}

export const CreateLoading: Story = {
  args: {
    mode: 'create',
    onSubmit: (data) => {
      console.log('Create form submitted:', data)
      return new Promise(resolve => setTimeout(resolve, 2000))
    },
    onCancel: () => console.log('Create form cancelled'),
    loading: true,
  },
}

export const EditLoading: Story = {
  args: {
    mode: 'edit',
    priceList: existingPriceList,
    onSubmit: (data) => {
      console.log('Edit form submitted:', data)
      return new Promise(resolve => setTimeout(resolve, 2000))
    },
    onCancel: () => console.log('Edit form cancelled'),
    loading: true,
    enableAutoSave: true,
  },
}

export const EditWithAutoSave: Story = {
  args: {
    mode: 'edit',
    priceList: existingPriceList,
    onSubmit: (data) => {
      console.log('Auto-save triggered:', data)
      return new Promise(resolve => setTimeout(resolve, 500))
    },
    onCancel: () => console.log('Edit form cancelled'),
    loading: false,
    enableAutoSave: true,
  },
}

export const CreateWithLongName: Story = {
  args: {
    mode: 'create',
    onSubmit: (data) => {
      console.log('Create form submitted:', data)
      return new Promise(resolve => setTimeout(resolve, 1000))
    },
    onCancel: () => console.log('Create form cancelled'),
    loading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement
    const nameInput = canvas.querySelector('input[type="text"]') as HTMLInputElement
    if (nameInput) {
      nameInput.value = 'This is a very long price list name that might cause layout issues if not handled properly'
      nameInput.dispatchEvent(new Event('input', { bubbles: true }))
    }
  },
}

export const EditRecentlyCreated: Story = {
  args: {
    mode: 'edit',
    priceList: {
      id: 2,
      name: 'Recently Created List',
      created_at: new Date(), // Just created
      updated_at: new Date(),
    },
    onSubmit: (data) => {
      console.log('Edit form submitted:', data)
      return new Promise(resolve => setTimeout(resolve, 1000))
    },
    onCancel: () => console.log('Edit form cancelled'),
    loading: false,
    enableAutoSave: true,
  },
}

export const EditWithValidationErrors: Story = {
  args: {
    mode: 'edit',
    priceList: {
      id: 3,
      name: '', // Empty name to trigger validation
      created_at: new Date('2024-01-15T10:30:00Z'),
      updated_at: new Date('2024-01-20T14:45:00Z'),
    },
    onSubmit: (data) => {
      console.log('Edit form submitted:', data)
      return new Promise(resolve => setTimeout(resolve, 1000))
    },
    onCancel: () => console.log('Edit form cancelled'),
    loading: false,
    enableAutoSave: false,
  },
}