import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableHeader, TableBody, TableRow, TableCell } from './Table'
import { Button } from '../Button/Button'

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive table system with headers, rows, cells, and built-in support for actions. Features striped rows, hover effects, and dark mode support.'
      }
    }
  },
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

// Basic table
export const Basic: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <tr>
          <TableCell header>Name</TableCell>
          <TableCell header>Email</TableCell>
          <TableCell header>Role</TableCell>
        </tr>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic table with headers and data rows.'
      }
    }
  }
}

// Table with actions
export const WithActions: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <tr>
          <TableCell header>Product</TableCell>
          <TableCell header>Price</TableCell>
          <TableCell header>Status</TableCell>
          <TableCell header>Actions</TableCell>
        </tr>
      </TableHeader>
      <TableBody>
        <TableRow
          actions={
            <>
              <Button size="sm" variant="secondary">Edit</Button>
              <Button size="sm" variant="danger">Delete</Button>
            </>
          }
        >
          <TableCell>Product A</TableCell>
          <TableCell>$29.99</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow
          actions={
            <>
              <Button size="sm" variant="secondary">Edit</Button>
              <Button size="sm" variant="danger">Delete</Button>
            </>
          }
        >
          <TableCell>Product B</TableCell>
          <TableCell>$49.99</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with action buttons in each row.'
      }
    }
  }
}

// Table without stripes
export const NoStripes: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <tr>
          <TableCell header>Name</TableCell>
          <TableCell header>Department</TableCell>
          <TableCell header>Salary</TableCell>
        </tr>
      </TableHeader>
      <TableBody>
        <TableRow striped={false}>
          <TableCell>Alice Johnson</TableCell>
          <TableCell>Engineering</TableCell>
          <TableCell>$85,000</TableCell>
        </TableRow>
        <TableRow striped={false}>
          <TableCell>Bob Wilson</TableCell>
          <TableCell>Marketing</TableCell>
          <TableCell>$75,000</TableCell>
        </TableRow>
        <TableRow striped={false}>
          <TableCell>Carol Davis</TableCell>
          <TableCell>Sales</TableCell>
          <TableCell>$80,000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table without alternating row colors.'
      }
    }
  }
}

// Table without hover effects
export const NoHover: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <tr>
          <TableCell header>Task</TableCell>
          <TableCell header>Priority</TableCell>
          <TableCell header>Due Date</TableCell>
        </tr>
      </TableHeader>
      <TableBody>
        <TableRow hover={false}>
          <TableCell>Review code</TableCell>
          <TableCell>High</TableCell>
          <TableCell>2024-01-15</TableCell>
        </TableRow>
        <TableRow hover={false}>
          <TableCell>Write tests</TableCell>
          <TableCell>Medium</TableCell>
          <TableCell>2024-01-20</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table without hover effects on rows.'
      }
    }
  }
}

// Complex table with mixed content
export const Complex: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <tr>
          <TableCell header>ID</TableCell>
          <TableCell header>Name</TableCell>
          <TableCell header>Category</TableCell>
          <TableCell header>Price</TableCell>
          <TableCell header>Stock</TableCell>
          <TableCell header>Actions</TableCell>
        </tr>
      </TableHeader>
      <TableBody>
        <TableRow
          actions={
            <div className="flex space-x-2">
              <Button size="sm" variant="ghost">View</Button>
              <Button size="sm" variant="secondary">Edit</Button>
              <Button size="sm" variant="danger">Delete</Button>
            </div>
          }
        >
          <TableCell>#001</TableCell>
          <TableCell>Premium Widget</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>$199.99</TableCell>
          <TableCell>15</TableCell>
        </TableRow>
        <TableRow
          actions={
            <div className="flex space-x-2">
              <Button size="sm" variant="ghost">View</Button>
              <Button size="sm" variant="secondary">Edit</Button>
              <Button size="sm" variant="danger">Delete</Button>
            </div>
          }
        >
          <TableCell>#002</TableCell>
          <TableCell>Basic Tool</TableCell>
          <TableCell>Hardware</TableCell>
          <TableCell>$29.99</TableCell>
          <TableCell>42</TableCell>
        </TableRow>
        <TableRow
          actions={
            <div className="flex space-x-2">
              <Button size="sm" variant="ghost">View</Button>
              <Button size="sm" variant="secondary">Edit</Button>
              <Button size="sm" variant="danger">Delete</Button>
            </div>
          }
        >
          <TableCell>#003</TableCell>
          <TableCell>Design Template</TableCell>
          <TableCell>Software</TableCell>
          <TableCell>$99.99</TableCell>
          <TableCell>8</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex table with multiple columns and various action button layouts.'
      }
    }
  }
}

// Dark mode showcase
export const DarkMode: Story = {
  render: () => (
    <div className="p-6 bg-gray-900 rounded-lg">
      <Table>
        <TableHeader>
          <tr>
            <TableCell header>Name</TableCell>
            <TableCell header>Email</TableCell>
            <TableCell header>Role</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table in dark mode with proper contrast and styling.'
      }
    }
  }
}

// Responsive table
export const Responsive: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table>
        <TableHeader>
          <tr>
            <TableCell header>Product Name</TableCell>
            <TableCell header>Description</TableCell>
            <TableCell header>Category</TableCell>
            <TableCell header>Price</TableCell>
            <TableCell header>Actions</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          <TableRow
            actions={
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button size="sm" variant="secondary">Edit</Button>
                <Button size="sm" variant="danger">Delete</Button>
              </div>
            }
          >
            <TableCell>Premium Widget Pro</TableCell>
            <TableCell>High-quality widget with advanced features</TableCell>
            <TableCell>Electronics</TableCell>
            <TableCell>$299.99</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        This table is responsive and will scroll horizontally on smaller screens.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive table that adapts to different screen sizes.'
      }
    }
  }
}
