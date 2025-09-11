import type { Meta, StoryObj } from '@storybook/react'
import { FormField } from './FormField'
import { Search, Mail, Lock, User } from 'lucide-react'

const meta = {
  title: 'UI/Form/FormField',
  component: FormField,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search'],
    },
    required: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
  },
}

export const Required: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    required: true,
  },
}

export const WithHelper: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helper: 'Must be at least 3 characters long and contain only letters, numbers, and underscores',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    required: true,
    error: 'Password must be at least 8 characters long',
  },
}

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search products...',
    type: 'search',
    leftIcon: <Search className="h-4 w-4" />,
  },
}

export const WithRightIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    rightIcon: <Mail className="h-4 w-4" />,
  },
}

export const WithBothIcons: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    leftIcon: <User className="h-4 w-4" />,
    rightIcon: <Search className="h-4 w-4" />,
  },
}

export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'This is disabled',
    disabled: true,
    value: 'Cannot edit this',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    required: true,
    leftIcon: <Lock className="h-4 w-4" />,
    helper: 'Must contain at least 8 characters with a mix of letters and numbers',
  },
}

export const Number: Story = {
  args: {
    label: 'Price',
    placeholder: '0.00',
    type: 'number',
    step: '0.01',
    min: '0',
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <FormField
        label="Default State"
        placeholder="Normal input field"
      />
      
      <FormField
        label="With Value"
        placeholder="Enter text"
        value="Some text here"
        onChange={() => {}}
      />
      
      <FormField
        label="Required Field"
        placeholder="This is required"
        required
      />
      
      <FormField
        label="With Helper Text"
        placeholder="Enter your data"
        helper="This is some helpful information about this field"
      />
      
      <FormField
        label="With Error"
        placeholder="Enter valid data"
        error="This field is required"
        value="invalid input"
        onChange={() => {}}
      />
      
      <FormField
        label="Disabled Field"
        placeholder="Cannot edit"
        disabled
        value="Disabled value"
        onChange={() => {}}
      />
      
      <FormField
        label="With Icon"
        placeholder="Search..."
        leftIcon={<Search className="h-4 w-4" />}
      />
    </div>
  ),
}