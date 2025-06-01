import { describe, it, expect } from 'vitest'
import { onlyNumbers, safeOnlyNumbers } from './only-numbers.formatter'

describe('onlyNumbers', () => {
  it('should remove all non-numeric characters', () => {
    expect(onlyNumbers('abc123def456')).toBe('123456')
  })

  it('should handle string with only numbers', () => {
    expect(onlyNumbers('123456')).toBe('123456')
  })

  it('should handle string with only letters', () => {
    expect(onlyNumbers('abcdef')).toBe('')
  })

  it('should handle empty string', () => {
    expect(onlyNumbers('')).toBe('')
  })

  it('should handle special characters', () => {
    expect(onlyNumbers('!@#123$%^456&*()')).toBe('123456')
  })

  it('should handle spaces and punctuation', () => {
    expect(onlyNumbers('1 2 3.4,5-6')).toBe('123456')
  })
  it('should throw error for non-string input', () => {
    expect(() => onlyNumbers(123 as unknown as string)).toThrow('Input must be a string')
  })
})

describe('safeOnlyNumbers', () => {
  it('should work normally with valid input', () => {
    expect(safeOnlyNumbers('abc123def')).toBe('123')
  })
  it('should return fallback for invalid input', () => {
    expect(safeOnlyNumbers(null as unknown as string)).toBe('')
    expect(safeOnlyNumbers(undefined as unknown as string)).toBe('')
    expect(safeOnlyNumbers(123 as unknown as string)).toBe('')
  })
})
