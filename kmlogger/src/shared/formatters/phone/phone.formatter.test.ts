import { describe, it, expect } from 'vitest'
import { phone, safePhone } from './phone.formatter'

describe('phone', () => {
  it('should format complete Brazilian mobile number', () => {
    expect(phone('11987654321')).toBe('(11) 98765-4321')
  })

  it('should format complete Brazilian landline number', () => {
    expect(phone('1134567890')).toBe('(11) 3456-7890')
  })

  it('should handle partial input - area code only', () => {
    expect(phone('11')).toBe('(11')
  })

  it('should handle partial input - area code + partial number', () => {
    expect(phone('11987')).toBe('(11) 987')
  })

  it('should handle partial input - area code + full first part', () => {
    expect(phone('119876543')).toBe('(11) 9876-543')
  })

  it('should handle input with existing formatting', () => {
    expect(phone('(11) 98765-4321')).toBe('(11) 98765-4321')
  })

  it('should handle input with mixed formatting', () => {
    expect(phone('11 98765.4321')).toBe('(11) 98765-4321')
  })

  it('should handle empty string', () => {
    expect(phone('')).toBe('')
  })

  it('should handle single digit', () => {
    expect(phone('1')).toBe('(1')
  })

  it('should truncate numbers longer than 11 digits', () => {
    expect(phone('119876543211234')).toBe('(11) 98765-4321')
  })

  it('should handle numbers with letters and special characters', () => {
    expect(phone('11abc98765def4321')).toBe('(11) 98765-4321')
  })

  it('should handle 10-digit landline number', () => {
    expect(phone('1134567890')).toBe('(11) 3456-7890')
  })
  it('should throw error for non-string input', () => {
    expect(() => phone(123 as unknown as string)).toThrow('Input must be a string')
  })
})

describe('safePhone', () => {
  it('should work normally with valid input', () => {
    expect(safePhone('11987654321')).toBe('(11) 98765-4321')
  })
  it('should return fallback for invalid input', () => {
    expect(safePhone(null as unknown as string)).toBe('')
    expect(safePhone(undefined as unknown as string)).toBe('')
    expect(safePhone(123 as unknown as string)).toBe('')
  })
})
