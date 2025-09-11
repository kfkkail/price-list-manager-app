import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    error: 'Password must be at least 8 characters',
  },
}

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    variant: 'success',
    defaultValue: 'john_doe',
  },
}

export const WithHelpText: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email address',
    type: 'email',
    helpText: 'We will never share your email with anyone else.',
  },
}

export const Loading: Story = {
  args: {
    label: 'Processing',
    placeholder: 'Please wait...',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Input 
        size="sm" 
        label="Small Input" 
        placeholder="Small size input"
      />
      <Input 
        size="md" 
        label="Medium Input" 
        placeholder="Medium size input"
      />
      <Input 
        size="lg" 
        label="Large Input" 
        placeholder="Large size input"
      />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <Input 
        variant="default" 
        label="Default Input" 
        placeholder="Default variant"
      />
      <Input 
        variant="error" 
        label="Error Input" 
        placeholder="Error variant"
        error="This field has an error"
      />
      <Input 
        variant="success" 
        label="Success Input" 
        placeholder="Success variant"
        defaultValue="Valid input"
      />
    </div>
  ),
}

export const LoginForm: Story = {
  render: () => (
    <div className="space-y-6 max-w-sm">
      <Input
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        required
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        required
        helpText="Must be at least 8 characters"
      />
    </div>
  ),
}

export const WithValidation: Story = {
  render: () => (
    <div className="space-y-6 max-w-sm">
      <Input
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        error="Please enter a valid email address"
      />
      <Input
        type="text"
        label="Verification Code"
        placeholder="Enter 6-digit code"
        helpText="Check your email for the verification code"
        maxLength={6}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        variant="success"
        defaultValue="SecurePassword123!"
        helpText="Strong password ✓"
      />
    </div>
  ),
}