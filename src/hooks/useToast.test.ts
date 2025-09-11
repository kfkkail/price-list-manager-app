import { renderHook } from '@testing-library/react'
import { useToast } from './useToast'
import { toastService } from '../services/toastService'

// Mock the toast service
jest.mock('../services/toastService', () => ({
  toastService: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
    loading: jest.fn(),
    promise: jest.fn(),
    dismiss: jest.fn(),
    remove: jest.fn(),
  },
}))

const mockToastService = toastService as jest.Mocked<typeof toastService>

describe('useToast', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('provides success method', () => {
    const { result } = renderHook(() => useToast())
    
    result.current.success('Success message')
    
    expect(mockToastService.success).toHaveBeenCalledWith('Success message', undefined)
  })

  it('provides success method with options', () => {
    const { result } = renderHook(() => useToast())
    const options = { duration: 2000 }
    
    result.current.success('Success message', options)
    
    expect(mockToastService.success).toHaveBeenCalledWith('Success message', options)
  })

  it('provides error method', () => {
    const { result } = renderHook(() => useToast())
    
    result.current.error('Error message')
    
    expect(mockToastService.error).toHaveBeenCalledWith('Error message', undefined)
  })

  it('provides warning method', () => {
    const { result } = renderHook(() => useToast())
    
    result.current.warning('Warning message')
    
    expect(mockToastService.warning).toHaveBeenCalledWith('Warning message', undefined)
  })

  it('provides info method', () => {
    const { result } = renderHook(() => useToast())
    
    result.current.info('Info message')
    
    expect(mockToastService.info).toHaveBeenCalledWith('Info message', undefined)
  })

  it('provides loading method', () => {
    const { result } = renderHook(() => useToast())
    
    result.current.loading('Loading message')
    
    expect(mockToastService.loading).toHaveBeenCalledWith('Loading message', undefined)
  })

  it('provides promise method', () => {
    const { result } = renderHook(() => useToast())
    const mockPromise = Promise.resolve('success')
    const messages = {
      loading: 'Loading...',
      success: 'Success!',
      error: 'Error!',
    }
    
    result.current.promise(mockPromise, messages)
    
    expect(mockToastService.promise).toHaveBeenCalledWith(mockPromise, messages, undefined)
  })

  it('provides dismiss method', () => {
    const { result } = renderHook(() => useToast())
    
    result.current.dismiss('toast-id')
    
    expect(mockToastService.dismiss).toHaveBeenCalledWith('toast-id')
  })

  it('provides remove method', () => {
    const { result } = renderHook(() => useToast())
    
    result.current.remove('toast-id')
    
    expect(mockToastService.remove).toHaveBeenCalledWith('toast-id')
  })

  it('provides all expected methods', () => {
    const { result } = renderHook(() => useToast())
    
    expect(result.current).toHaveProperty('success')
    expect(result.current).toHaveProperty('error')
    expect(result.current).toHaveProperty('warning')
    expect(result.current).toHaveProperty('info')
    expect(result.current).toHaveProperty('loading')
    expect(result.current).toHaveProperty('promise')
    expect(result.current).toHaveProperty('dismiss')
    expect(result.current).toHaveProperty('remove')
  })
})