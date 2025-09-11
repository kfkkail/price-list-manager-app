import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Container, Card, CardBody, Heading, Text, Button, Input } from '../components/ui'
import { useAuth, useToast } from '../hooks'

type LoginStep = 'email' | 'verify'

interface LoginState {
  email: string
  code: string
  step: LoginStep
  isLoading: boolean
}

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, verifyCode, isAuthenticated, isLoading: authLoading } = useAuth()
  const toast = useToast()

  const [state, setState] = useState<LoginState>({
    email: '',
    code: '',
    step: 'email',
    isLoading: false,
  })

  const [errors, setErrors] = useState<{
    email?: string
    code?: string
  }>({})

  // Get the intended destination from router state
  const from = (location.state as any)?.from?.pathname || '/'

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  const updateState = (updates: Partial<LoginState>) => {
    setState(current => ({ ...current, ...updates }))
  }

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return 'Email is required'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    
    return undefined
  }

  const validateCode = (code: string): string | undefined => {
    if (!code.trim()) {
      return 'Verification code is required'
    }
    
    if (code.length !== 6) {
      return 'Verification code must be 6 digits'
    }
    
    if (!/^\d{6}$/.test(code)) {
      return 'Verification code must contain only numbers'
    }
    
    return undefined
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const emailError = validateEmail(state.email)
    if (emailError) {
      setErrors({ email: emailError })
      return
    }

    setErrors({})
    updateState({ isLoading: true })

    try {
      await login(state.email)
      updateState({ step: 'verify', isLoading: false })
    } catch (error) {
      updateState({ isLoading: false })
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const codeError = validateCode(state.code)
    if (codeError) {
      setErrors({ code: codeError })
      return
    }

    setErrors({})
    updateState({ isLoading: true })

    try {
      await verifyCode(state.email, state.code)
      // Navigation will happen automatically via useEffect when isAuthenticated becomes true
    } catch (error) {
      updateState({ isLoading: false })
    }
  }

  const handleResendCode = async () => {
    try {
      await login(state.email)
    } catch (error) {
      // Error is already handled by the login function
    }
  }

  const handleBackToEmail = () => {
    updateState({ step: 'email', code: '', isLoading: false })
    setErrors({})
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    updateState({ email })
    
    // Clear email error on change
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }))
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.replace(/\D/g, '').slice(0, 6) // Only digits, max 6
    updateState({ code })
    
    // Clear code error on change
    if (errors.code) {
      setErrors(prev => ({ ...prev, code: undefined }))
    }
  }

  const isFormLoading = state.isLoading || authLoading

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container size="sm">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Heading level={1} className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </Heading>
            <Text className="mt-2 text-gray-600 dark:text-gray-400">
              {state.step === 'email' 
                ? 'Enter your email to sign in'
                : 'Enter the verification code sent to your email'
              }
            </Text>
          </div>

          <Card>
            <CardBody className="p-6">
              {state.step === 'email' ? (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email address"
                    value={state.email}
                    onChange={handleEmailChange}
                    error={errors.email}
                    loading={isFormLoading}
                    required
                    autoComplete="email"
                    autoFocus
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    loading={isFormLoading}
                    disabled={!state.email.trim() || isFormLoading}
                  >
                    {isFormLoading ? 'Sending...' : 'Send Verification Code'}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <Text size="sm" className="text-gray-600 dark:text-gray-400">
                      We've sent a 6-digit verification code to:
                    </Text>
                    <Text className="font-medium text-gray-900 dark:text-white mt-1">
                      {state.email}
                    </Text>
                  </div>

                  <form onSubmit={handleCodeSubmit} className="space-y-4">
                    <Input
                      type="text"
                      label="Verification Code"
                      placeholder="Enter 6-digit code"
                      value={state.code}
                      onChange={handleCodeChange}
                      error={errors.code}
                      loading={isFormLoading}
                      required
                      autoComplete="one-time-code"
                      autoFocus
                      maxLength={6}
                      className="text-center text-2xl font-mono tracking-widest"
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      loading={isFormLoading}
                      disabled={state.code.length !== 6 || isFormLoading}
                    >
                      {isFormLoading ? 'Verifying...' : 'Verify Code'}
                    </Button>
                  </form>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBackToEmail}
                      disabled={isFormLoading}
                    >
                      Change Email
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleResendCode}
                      disabled={isFormLoading}
                    >
                      Resend Code
                    </Button>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Additional help text */}
          <div className="mt-6 text-center">
            <Text size="sm" className="text-gray-500 dark:text-gray-400">
              Having trouble? Check your spam folder or try resending the code.
            </Text>
          </div>
        </div>
      </Container>
    </div>
  )
}