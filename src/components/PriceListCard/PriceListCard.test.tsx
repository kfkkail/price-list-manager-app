import { render, screen, fireEvent } from '@testing-library/react'
import { PriceListCard } from './PriceListCard'
import type { PriceList } from '../../types'

// Mock data
const mockPriceList: PriceList = {
  id: 1,
  name: 'Test Price List',
  created_at: new Date('2024-01-15T10:30:00Z'),
  updated_at: new Date('2024-01-20T14:45:00Z'),
}

const newPriceList: PriceList = {
  id: 2,
  name: 'New Price List',
  created_at: new Date(),
  updated_at: new Date(),
}

describe('PriceListCard', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders price list name', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
          onView={jest.fn()}
        />
      )
      
      expect(screen.getByText('Test Price List')).toBeInTheDocument()
    })

    it('renders price list ID', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
          onView={jest.fn()}
        />
      )
      
      expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('renders timestamps when showTimestamps is true', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          showTimestamps={true}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
          onView={jest.fn()}
        />
      )
      
      // Should show relative time
      expect(screen.getByText(/Created/i)).toBeInTheDocument()
      expect(screen.getByText(/Updated/i)).toBeInTheDocument()
    })

    it('does not render timestamps when showTimestamps is false', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          showTimestamps={false}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
          onView={jest.fn()}
        />
      )
      
      expect(screen.queryByText(/Created/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Updated/i)).not.toBeInTheDocument()
    })
  })

  // Variant tests
  describe('Variants', () => {
    it('renders compact variant correctly', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          variant="compact"
          onEdit={jest.fn()}
          onDelete={jest.fn()}
          onView={jest.fn()}
        />
      )
      
      expect(screen.getByText('Test Price List')).toBeInTheDocument()
      // Compact variant should have different styling but same content
    })

    it('renders default variant correctly', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          variant="default"
          onEdit={jest.fn()}
          onDelete={jest.fn()}
          onView={jest.fn()}
        />
      )
      
      expect(screen.getByText('Test Price List')).toBeInTheDocument()
    })
  })

  // Action button tests
  describe('Actions', () => {
    it('calls onEdit when edit button is clicked', () => {
      const mockOnEdit = jest.fn()
      
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableActions={true}
          onEdit={mockOnEdit}
          onDelete={jest.fn()}
          onView={jest.fn()}
        />
      )
      
      const editButton = screen.getByLabelText('Edit price list')
      fireEvent.click(editButton)
      
      expect(mockOnEdit).toHaveBeenCalledWith(mockPriceList)
      expect(mockOnEdit).toHaveBeenCalledTimes(1)
    })

    it('calls onDelete when delete button is clicked', () => {
      const mockOnDelete = jest.fn()
      
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableActions={true}
          onEdit={jest.fn()}
          onDelete={mockOnDelete}
          onView={jest.fn()}
        />
      )
      
      const deleteButton = screen.getByLabelText('Delete price list')
      fireEvent.click(deleteButton)
      
      expect(mockOnDelete).toHaveBeenCalledWith(mockPriceList)
      expect(mockOnDelete).toHaveBeenCalledTimes(1)
    })

    it('calls onView when view button is clicked', () => {
      const mockOnView = jest.fn()
      
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableActions={true}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
          onView={mockOnView}
        />
      )
      
      const viewButton = screen.getByLabelText('View details')
      fireEvent.click(viewButton)
      
      expect(mockOnView).toHaveBeenCalledWith(mockPriceList)
      expect(mockOnView).toHaveBeenCalledTimes(1)
    })

    it('does not render action buttons when enableActions is false', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableActions={false}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
          onView={jest.fn()}
        />
      )
      
      expect(screen.queryByLabelText('Edit price list')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Delete price list')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('View details')).not.toBeInTheDocument()
    })
  })

  // Selection tests
  describe('Selection', () => {
    it('renders checkbox when enableSelection is true', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableSelection={true}
          onSelect={jest.fn()}
        />
      )
      
      const checkbox = screen.getByRole('checkbox', { name: 'Select Test Price List' })
      expect(checkbox).toBeInTheDocument()
    })

    it('does not render checkbox when enableSelection is false', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableSelection={false}
        />
      )
      
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    })

    it('checkbox is checked when selected is true', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableSelection={true}
          selected={true}
          onSelect={jest.fn()}
        />
      )
      
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      expect(checkbox.checked).toBe(true)
    })

    it('checkbox is unchecked when selected is false', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableSelection={true}
          selected={false}
          onSelect={jest.fn()}
        />
      )
      
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      expect(checkbox.checked).toBe(false)
    })

    it('calls onSelect when checkbox is clicked', () => {
      const mockOnSelect = jest.fn()
      
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableSelection={true}
          selected={false}
          onSelect={mockOnSelect}
        />
      )
      
      const checkbox = screen.getByRole('checkbox')
      fireEvent.click(checkbox)
      
      expect(mockOnSelect).toHaveBeenCalledWith(true)
      expect(mockOnSelect).toHaveBeenCalledTimes(1)
    })
  })

  // Badge tests
  describe('Status Badges', () => {
    it('shows "New" badge for recently created price list', () => {
      render(
        <PriceListCard
          priceList={newPriceList}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
          onView={jest.fn()}
        />
      )
      
      expect(screen.getByText('New')).toBeInTheDocument()
    })

    it('shows "Recently Updated" badge for recently updated price list', () => {
      const recentlyUpdated: PriceList = {
        id: 3,
        name: 'Recently Updated',
        created_at: new Date('2024-01-01T10:00:00Z'), // Old creation date
        updated_at: new Date(), // Just updated
      }
      
      render(
        <PriceListCard
          priceList={recentlyUpdated}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
          onView={jest.fn()}
        />
      )
      
      // Look for the badge specifically by finding all elements and checking for the badge
      const badges = screen.getAllByText('Recently Updated')
      const badgeElement = badges.find(el => el.closest('.bg-cyan-100'))
      expect(badgeElement).toBeInTheDocument()
    })

    it('does not show badges for old price lists', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
          onView={jest.fn()}
        />
      )
      
      expect(screen.queryByText('New')).not.toBeInTheDocument()
      expect(screen.queryByText(/Recently Updated/i)).not.toBeInTheDocument()
    })
  })

  // Card click behavior tests
  describe('Card Click Behavior', () => {
    it('calls onView when card is clicked and enableSelection is false', () => {
      const mockOnView = jest.fn()
      
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableSelection={false}
          onView={mockOnView}
          data-testid="price-list-card"
        />
      )
      
      const cardElement = screen.getByTestId('price-list-card')
      fireEvent.click(cardElement)
      
      expect(mockOnView).toHaveBeenCalledWith(mockPriceList)
    })

    it('calls onSelect when card is clicked and enableSelection is true', () => {
      const mockOnSelect = jest.fn()
      
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableSelection={true}
          selected={false}
          onSelect={mockOnSelect}
          data-testid="price-list-card"
        />
      )
      
      const cardElement = screen.getByTestId('price-list-card')
      fireEvent.click(cardElement)
      
      expect(mockOnSelect).toHaveBeenCalledWith(true)
    })
  })

  // Accessibility tests
  describe('Accessibility', () => {
    it('has proper ARIA labels for action buttons', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableActions={true}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
          onView={jest.fn()}
        />
      )
      
      expect(screen.getByLabelText('View details')).toBeInTheDocument()
      expect(screen.getByLabelText('Edit price list')).toBeInTheDocument()
      expect(screen.getByLabelText('Delete price list')).toBeInTheDocument()
    })

    it('has proper checkbox label when selection is enabled', () => {
      render(
        <PriceListCard
          priceList={mockPriceList}
          enableSelection={true}
          onSelect={jest.fn()}
        />
      )
      
      expect(screen.getByLabelText('Select Test Price List')).toBeInTheDocument()
    })
  })
})