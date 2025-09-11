import {
  formatDate,
  formatDateTime,
  formatRelativeTime,
  truncateText,
  capitalize,
  camelCaseToReadable,
  highlightSearchTerm
} from './formatting'

describe('formatting utilities', () => {
  describe('formatDate', () => {
    it('should format date with default options', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      const result = formatDate(date)
      expect(result).toBe('Jan 15, 2024')
    })

    it('should format date with custom options', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      const result = formatDate(date, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      expect(result).toBe('January 15, 2024')
    })

    it('should format date from string', () => {
      const result = formatDate('2024-01-15T10:30:00Z')
      expect(result).toBe('Jan 15, 2024')
    })

    it('should handle invalid date', () => {
      const result = formatDate('invalid-date')
      expect(result).toBe('Invalid date')
    })

    it('should handle invalid Date object', () => {
      const result = formatDate(new Date('invalid'))
      expect(result).toBe('Invalid date')
    })
  })

  describe('formatDateTime', () => {
    it('should format date and time', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      const result = formatDateTime(date)
      expect(result).toMatch(/Jan 15, 2024.*10:30 AM|PM/)
    })

    it('should format with custom options', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      const result = formatDateTime(date, { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
      expect(result).toMatch(/Jan 15, 2024.*\d{2}:\d{2}/)
    })
  })

  describe('formatRelativeTime', () => {
    const now = new Date('2024-01-15T12:00:00Z')
    
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(now)
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should return "Just now" for recent times', () => {
      const recent = new Date('2024-01-15T11:59:30Z') // 30 seconds ago
      expect(formatRelativeTime(recent)).toBe('Just now')
    })

    it('should return minutes ago', () => {
      const minutesAgo = new Date('2024-01-15T11:58:00Z') // 2 minutes ago
      expect(formatRelativeTime(minutesAgo)).toBe('2 minutes ago')
    })

    it('should return minute ago (singular)', () => {
      const minuteAgo = new Date('2024-01-15T11:59:00Z') // 1 minute ago
      expect(formatRelativeTime(minuteAgo)).toBe('1 minute ago')
    })

    it('should return hours ago', () => {
      const hoursAgo = new Date('2024-01-15T10:00:00Z') // 2 hours ago
      expect(formatRelativeTime(hoursAgo)).toBe('2 hours ago')
    })

    it('should return hour ago (singular)', () => {
      const hourAgo = new Date('2024-01-15T11:00:00Z') // 1 hour ago
      expect(formatRelativeTime(hourAgo)).toBe('1 hour ago')
    })

    it('should return days ago', () => {
      const daysAgo = new Date('2024-01-13T12:00:00Z') // 2 days ago
      expect(formatRelativeTime(daysAgo)).toBe('2 days ago')
    })

    it('should return day ago (singular)', () => {
      const dayAgo = new Date('2024-01-14T12:00:00Z') // 1 day ago
      expect(formatRelativeTime(dayAgo)).toBe('1 day ago')
    })

    it('should return weeks ago', () => {
      const weeksAgo = new Date('2024-01-01T12:00:00Z') // 2 weeks ago
      expect(formatRelativeTime(weeksAgo)).toBe('2 weeks ago')
    })

    it('should return week ago (singular)', () => {
      const weekAgo = new Date('2024-01-08T12:00:00Z') // 1 week ago
      expect(formatRelativeTime(weekAgo)).toBe('1 week ago')
    })

    it('should return months ago', () => {
      const monthsAgo = new Date('2023-11-15T12:00:00Z') // 2 months ago
      expect(formatRelativeTime(monthsAgo)).toBe('2 months ago')
    })

    it('should return month ago (singular)', () => {
      const monthAgo = new Date('2023-12-15T12:00:00Z') // 1 month ago
      expect(formatRelativeTime(monthAgo)).toBe('1 month ago')
    })

    it('should return years ago', () => {
      const yearsAgo = new Date('2022-01-15T12:00:00Z') // 2 years ago
      expect(formatRelativeTime(yearsAgo)).toBe('2 years ago')
    })

    it('should return year ago (singular)', () => {
      const yearAgo = new Date('2023-01-15T12:00:00Z') // 1 year ago
      expect(formatRelativeTime(yearAgo)).toBe('1 year ago')
    })

    it('should handle string dates', () => {
      const result = formatRelativeTime('2024-01-15T11:59:00Z')
      expect(result).toBe('1 minute ago')
    })

    it('should handle invalid dates', () => {
      expect(formatRelativeTime('invalid')).toBe('Invalid date')
      expect(formatRelativeTime(new Date('invalid'))).toBe('Invalid date')
    })
  })

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const text = 'This is a very long text that should be truncated'
      const result = truncateText(text, 20)
      expect(result).toBe('This is a very lo...')
      expect(result.length).toBe(20)
    })

    it('should not truncate short text', () => {
      const text = 'Short text'
      const result = truncateText(text, 20)
      expect(result).toBe('Short text')
    })

    it('should handle exact length', () => {
      const text = 'Exact length text'
      const result = truncateText(text, text.length)
      expect(result).toBe('Exact length text')
    })

    it('should handle empty text', () => {
      const result = truncateText('', 10)
      expect(result).toBe('')
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello world')).toBe('Hello world')
    })

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('should handle already capitalized text', () => {
      expect(capitalize('Hello World')).toBe('Hello world')
    })

    it('should handle mixed case', () => {
      expect(capitalize('hELLO wORLD')).toBe('Hello world')
    })
  })

  describe('camelCaseToReadable', () => {
    it('should convert camelCase to readable text', () => {
      expect(camelCaseToReadable('camelCaseText')).toBe('Camel Case Text')
    })

    it('should handle single word', () => {
      expect(camelCaseToReadable('word')).toBe('Word')
    })

    it('should handle empty string', () => {
      expect(camelCaseToReadable('')).toBe('')
    })

    it('should handle already readable text', () => {
      expect(camelCaseToReadable('Already Readable')).toBe('Already  Readable')
    })

    it('should handle multiple uppercase letters', () => {
      expect(camelCaseToReadable('XMLHttpRequest')).toBe('X M L Http Request')
    })
  })

  describe('highlightSearchTerm', () => {
    it('should highlight search term', () => {
      const text = 'This is a test text'
      const result = highlightSearchTerm(text, 'test')
      expect(result).toBe('This is a <mark>test</mark> text')
    })

    it('should handle case insensitive search', () => {
      const text = 'This is a Test text'
      const result = highlightSearchTerm(text, 'test')
      expect(result).toBe('This is a <mark>Test</mark> text')
    })

    it('should handle multiple occurrences', () => {
      const text = 'Test this test text'
      const result = highlightSearchTerm(text, 'test')
      expect(result).toBe('<mark>Test</mark> this <mark>test</mark> text')
    })

    it('should handle empty search term', () => {
      const text = 'This is a test'
      const result = highlightSearchTerm(text, '')
      expect(result).toBe('This is a test')
    })

    it('should handle no matches', () => {
      const text = 'This is a test'
      const result = highlightSearchTerm(text, 'xyz')
      expect(result).toBe('This is a test')
    })

    it('should handle special regex characters', () => {
      const text = 'Test (parentheses) and [brackets]'
      const result = highlightSearchTerm(text, '(parentheses)')
      expect(result).toBe('Test (<mark>parentheses</mark>) and [brackets]')
    })
  })
})