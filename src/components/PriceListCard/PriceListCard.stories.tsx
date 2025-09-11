import type { Meta, StoryObj } from '@storybook/react'
import { PriceListCard } from './PriceListCard'
import type { PriceList } from '../../types'

const meta = {
  title: 'Components/PriceListCard',
  component: PriceListCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PriceListCard>

export default meta
type Story = StoryObj<typeof meta>

// Sample data
const standardPriceList: PriceList = {
  id: 1,
  name: 'Standard Pricing',
  created_at: new Date('2024-01-15T10:30:00Z'),
  updated_at: new Date('2024-01-20T14:45:00Z'),
}

const newPriceList: PriceList = {
  id: 2,
  name: 'New Price List',
  created_at: new Date(), // Just created
  updated_at: new Date(),
}

const recentlyUpdatedPriceList: PriceList = {
  id: 3,
  name: 'Recently Updated List',
  created_at: new Date('2024-01-01T10:00:00Z'),
  updated_at: new Date(), // Just updated
}

const longNamePriceList: PriceList = {
  id: 4,
  name: 'This is a very long price list name that might cause layout issues if not handled properly',
  created_at: new Date('2024-01-10T09:15:00Z'),
  updated_at: new Date('2024-01-25T16:20:00Z'),
}

export const Default: Story = {
  args: {
    priceList: standardPriceList,
    enableSelection: false,
    enableActions: true,
    showTimestamps: true,
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
  },
}

export const Compact: Story = {
  args: {
    priceList: standardPriceList,
    variant: 'compact',
    enableSelection: false,
    enableActions: true,
    showTimestamps: true,
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
  },
}

export const WithSelection: Story = {
  args: {
    priceList: standardPriceList,
    enableSelection: true,
    enableActions: true,
    showTimestamps: true,
    selected: false,
    onSelect: (selected) => console.log('Selection changed:', selected),
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
  },
}

export const Selected: Story = {
  args: {
    priceList: standardPriceList,
    enableSelection: true,
    enableActions: true,
    showTimestamps: true,
    selected: true,
    onSelect: (selected) => console.log('Selection changed:', selected),
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
  },
}

export const NoActions: Story = {
  args: {
    priceList: standardPriceList,
    enableSelection: false,
    enableActions: false,
    showTimestamps: true,
  },
}

export const NoTimestamps: Story = {
  args: {
    priceList: standardPriceList,
    enableSelection: false,
    enableActions: true,
    showTimestamps: false,
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
  },
}

export const NewItem: Story = {
  args: {
    priceList: newPriceList,
    enableSelection: false,
    enableActions: true,
    showTimestamps: true,
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
  },
}

export const RecentlyUpdated: Story = {
  args: {
    priceList: recentlyUpdatedPriceList,
    enableSelection: false,
    enableActions: true,
    showTimestamps: true,
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
  },
}

export const LongName: Story = {
  args: {
    priceList: longNamePriceList,
    enableSelection: false,
    enableActions: true,
    showTimestamps: true,
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
  },
}

export const CompactWithSelection: Story = {
  args: {
    priceList: standardPriceList,
    variant: 'compact',
    enableSelection: true,
    enableActions: true,
    showTimestamps: true,
    selected: false,
    onSelect: (selected) => console.log('Selection changed:', selected),
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
  },
}

export const CompactSelected: Story = {
  args: {
    priceList: standardPriceList,
    variant: 'compact',
    enableSelection: true,
    enableActions: true,
    showTimestamps: true,
    selected: true,
    onSelect: (selected) => console.log('Selection changed:', selected),
    onEdit: (priceList) => console.log('Edit:', priceList),
    onDelete: (priceList) => console.log('Delete:', priceList),
    onView: (priceList) => console.log('View:', priceList),
  },
}

// Grid layout demo
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[standardPriceList, newPriceList, recentlyUpdatedPriceList].map((priceList) => (
        <PriceListCard
          key={priceList.id}
          priceList={priceList}
          enableSelection={true}
          enableActions={true}
          showTimestamps={true}
          onSelect={(selected) => console.log(`${priceList.name} selection:`, selected)}
          onEdit={(priceList) => console.log('Edit:', priceList)}
          onDelete={(priceList) => console.log('Delete:', priceList)}
          onView={(priceList) => console.log('View:', priceList)}
        />
      ))}
    </div>
  ),
}

// Compact grid layout demo
export const CompactGridLayout: Story = {
  render: () => (
    <div className="space-y-3">
      {[standardPriceList, newPriceList, recentlyUpdatedPriceList, longNamePriceList].map((priceList) => (
        <PriceListCard
          key={priceList.id}
          priceList={priceList}
          variant="compact"
          enableSelection={true}
          enableActions={true}
          showTimestamps={true}
          onSelect={(selected) => console.log(`${priceList.name} selection:`, selected)}
          onEdit={(priceList) => console.log('Edit:', priceList)}
          onDelete={(priceList) => console.log('Delete:', priceList)}
          onView={(priceList) => console.log('View:', priceList)}
        />
      ))}
    </div>
  ),
}