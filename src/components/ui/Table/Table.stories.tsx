import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableHeader, TableBody, TableRow, TableCell } from './Table'
import { Button } from '../Button/Button'
import clsx from 'clsx'

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
  }
}

export default meta
type Story = StoryObj<typeof meta>

const AllVariantsTemplate: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={clsx("space-y-8", className)}>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Basic Table (Default)</h3>
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

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Table with Actions</h3>
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
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Table without Stripes</h3>
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
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Table without Hover Effects</h3>
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
      </div>
    </div>
  )
}

// All variants showcase - comprehensive table configurations
export const AllVariantsLight: Story = {
  render: () => (
    <AllVariantsTemplate className="space-y-8 light bg-gray-50 p-4 rounded-lg" />
  ),
  parameters: {
    docs: {
      description: {
        story: 'All table variants showing different configurations including actions, stripes, and hover effects.'
      }
    }
  }
}

export const AllVariantsDark: Story = {
  render: () => (
    <AllVariantsTemplate className="space-y-8 dark bg-gray-900 p-4 rounded-lg" />
  ),
  parameters: {
    docs: {
      description: {
        story: 'All table variants showing different configurations including actions, stripes, and hover effects.'
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
