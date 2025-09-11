import toast, { Toast, ToastOptions, Toaster } from 'react-hot-toast'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface CustomToastOptions extends Partial<ToastOptions> {
  variant?: ToastVariant
}

// Default toast configuration that matches our design system
const defaultToastOptions: ToastOptions = {
  duration: 4000,
  position: 'top-right',
  style: {
    maxWidth: '500px',
  },
  className: 'font-sans',
  success: {
    duration: 4000,
    iconTheme: {
      primary: '#10B981', // green-500
      secondary: '#ffffff',
    },
  },
  error: {
    duration: 5000,
    iconTheme: {
      primary: '#EF4444', // red-500
      secondary: '#ffffff',
    },
  },
}

// Custom toast functions that integrate with our design system
export const toastService = {
  success: (message: string, options?: Partial<ToastOptions>) => {
    return toast.success(message, {
      ...defaultToastOptions.success,
      ...options,
      style: {
        ...defaultToastOptions.style,
        background: 'var(--toast-success-bg, #F0FDF4)', // green-50
        color: 'var(--toast-success-text, #166534)', // green-800
        border: '1px solid var(--toast-success-border, #BBF7D0)', // green-200
        ...options?.style,
      },
    })
  },

  error: (message: string, options?: Partial<ToastOptions>) => {
    return toast.error(message, {
      ...defaultToastOptions.error,
      ...options,
      style: {
        ...defaultToastOptions.style,
        background: 'var(--toast-error-bg, #FEF2F2)', // red-50
        color: 'var(--toast-error-text, #991B1B)', // red-800
        border: '1px solid var(--toast-error-border, #FECACA)', // red-200
        ...options?.style,
      },
    })
  },

  warning: (message: string, options?: Partial<ToastOptions>) => {
    return toast(message, {
      ...defaultToastOptions,
      ...options,
      icon: '⚠️',
      style: {
        ...defaultToastOptions.style,
        background: 'var(--toast-warning-bg, #FFFBEB)', // yellow-50
        color: 'var(--toast-warning-text, #92400E)', // yellow-800
        border: '1px solid var(--toast-warning-border, #FDE68A)', // yellow-200
        ...options?.style,
      },
    })
  },

  info: (message: string, options?: Partial<ToastOptions>) => {
    return toast(message, {
      ...defaultToastOptions,
      ...options,
      icon: 'ℹ️',
      style: {
        ...defaultToastOptions.style,
        background: 'var(--toast-info-bg, #EFF6FF)', // blue-50
        color: 'var(--toast-info-text, #1E40AF)', // blue-800
        border: '1px solid var(--toast-info-border, #DBEAFE)', // blue-200
        ...options?.style,
      },
    })
  },

  // Promise-based toast for async operations
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: any) => string)
    },
    options?: Partial<ToastOptions>
  ) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      },
      {
        ...defaultToastOptions,
        ...options,
        style: {
          ...defaultToastOptions.style,
          ...options?.style,
        },
      }
    )
  },

  // Loading toast with manual control
  loading: (message: string, options?: Partial<ToastOptions>) => {
    return toast.loading(message, {
      ...defaultToastOptions,
      ...options,
      style: {
        ...defaultToastOptions.style,
        background: 'var(--toast-loading-bg, #F9FAFB)', // gray-50
        color: 'var(--toast-loading-text, #374151)', // gray-700
        border: '1px solid var(--toast-loading-border, #E5E7EB)', // gray-200
        ...options?.style,
      },
    })
  },

  // Custom toast with full control
  custom: (
    message: string,
    variant: ToastVariant = 'info',
    options?: CustomToastOptions
  ) => {
    const variantMethod = toastService[variant] || toastService.info
    return variantMethod(message, options)
  },

  // Dismiss toast
  dismiss: (toastId?: string) => {
    toast.dismiss(toastId)
  },

  // Remove toast
  remove: (toastId?: string) => {
    toast.remove(toastId)
  },
}

// Export the original toast and Toaster for advanced use cases
export { toast, Toaster }
export default toastService