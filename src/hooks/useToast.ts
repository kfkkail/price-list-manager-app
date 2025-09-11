import { toastService, ToastVariant } from '../services/toastService'
import { ToastOptions } from 'react-hot-toast'

/**
 * Custom hook that provides easy access to toast notifications
 * with consistent styling and behavior across the application
 */
export const useToast = () => {
  const showSuccess = (message: string, options?: Partial<ToastOptions>) => {
    return toastService.success(message, options)
  }

  const showError = (message: string, options?: Partial<ToastOptions>) => {
    return toastService.error(message, options)
  }

  const showWarning = (message: string, options?: Partial<ToastOptions>) => {
    return toastService.warning(message, options)
  }

  const showInfo = (message: string, options?: Partial<ToastOptions>) => {
    return toastService.info(message, options)
  }

  const showLoading = (message: string, options?: Partial<ToastOptions>) => {
    return toastService.loading(message, options)
  }

  const showPromise = <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: any) => string)
    },
    options?: Partial<ToastOptions>
  ) => {
    return toastService.promise(promise, messages, options)
  }

  const dismiss = (toastId?: string) => {
    toastService.dismiss(toastId)
  }

  const remove = (toastId?: string) => {
    toastService.remove(toastId)
  }

  return {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    loading: showLoading,
    promise: showPromise,
    dismiss,
    remove,
  }
}