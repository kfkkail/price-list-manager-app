import type { Meta, StoryObj } from '@storybook/react'
import { PriceListTable } from './PriceListTable'
import type { PriceList } from '../../types'

const meta = {
  title: 'Components/PriceListTable',
  component: PriceListTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PriceListTable>

export default meta
type Story = StoryObj<typeof meta>

// Sample data
const samplePriceLists: PriceList[] = [
  {
    id: 1,
    name: 'Standard Pricing',
    created_at: new Date('2024-01-15T10:30:00Z'),
    updated_at: new Date('2024-01-20T14:45:00Z'),
  },
  {
    id: 2,
    name: 'Premium Products',
    created_at: new Date('2024-01-10T09:15:00Z'),
    updated_at: new Date('2024-01-25T16:20:00Z'),
  },
  {
    id: 3,
    name: 'Wholesale Pricing',
    created_at: new Date('2024-01-05T11:00:00Z'),
    updated_at: new Date('2024-01-18T13:30:00Z'),
  },
  {
    id: 4,
    name: 'Black Friday Special',
    created_at: new Date('2024-01-01T08:45:00Z'),
    updated_at: new Date('2024-01-22T10:15:00Z'),
  },
  {
    id: 5,
    name: 'Student Discount',
    created_at: new Date('2023-12-28T14:20:00Z'),
    updated_at: new Date('2024-01-19T17:00:00Z'),
  },
]

const newPriceList: PriceList = {
  id: 6,
  name: 'New Price List',
  created_at: new Date(), // Just created
  updated_at: new Date(),
}

const recentlyUpdatedPriceList: PriceList = {
  id: 7,
  name: 'Recently Updated List',
  created_at: new Date('2024-01-01T10:00:00Z'),
  updated_at: new Date(), // Just updated
}

export const Default: Story = {
  args: {
    priceLists: samplePriceLists,
    loading: false,
    enableSelection: true,
    enableActions: true,
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
    onBulkDelete: (ids) => console.log('Bulk delete:', ids),
  },
}

export const Loading: Story = {
  args: {
    priceLists: [],
    loading: true,
    enableSelection: true,
    enableActions: true,
  },
}

export const Empty: Story = {
  args: {
    priceLists: [],
    loading: false,
    enableSelection: true,
    enableActions: true,
  },
}

export const Error: Story = {
  args: {
    priceLists: [],
    loading: false,
    error: 'Failed to load price lists. Please try again.',
    enableSelection: true,
    enableActions: true,
  },
}

export const WithSelection: Story = {
  args: {
    priceLists: samplePriceLists,
    loading: false,
    selectedIds: [1, 3, 5],
    enableSelection: true,
    enableActions: true,
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
    onBulkDelete: (ids) => console.log('Bulk delete:', ids),
  },
}

export const NoActions: Story = {
  args: {
    priceLists: samplePriceLists,
    loading: false,
    enableSelection: false,
    enableActions: false,
  },
}

export const ReadOnlyWithSelection: Story = {
  args: {
    priceLists: samplePriceLists,
    loading: false,
    enableSelection: true,
    enableActions: false,
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
  },
}

export const WithNewAndUpdated: Story = {
  args: {
    priceLists: [newPriceList, recentlyUpdatedPriceList, ...samplePriceLists],
    loading: false,
    enableSelection: true,
    enableActions: true,
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
    onBulkDelete: (ids) => console.log('Bulk delete:', ids),
  },
}

export const LargeDataset: Story = {
  args: {
    priceLists: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Price List ${i + 1}`,
      created_at: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
      updated_at: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
    })),
    loading: false,
    enableSelection: true,
    enableActions: true,
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
    onSelectionChange: (ids) => console.log('Selection changed:', ids),
    onBulkDelete: (ids) => console.log('Bulk delete:', ids),
  },
}