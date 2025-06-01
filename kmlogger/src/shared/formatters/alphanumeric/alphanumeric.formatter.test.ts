import { describe, it, expect } from 'vitest'
import { alphanumeric, safeAlphanumeric } from './alphanumeric.formatter'

describe('alphanumeric', () => {
  it('should keep only alphanumeric characters', () => {
    expect(alphanumeric('abc123def456')).toBe('abc123def456')
  })

  it('should remove special characters', () => {
    expect(alphanumeric('abc!@#123$%^def')).toBe('abc123def')
  })

  it('should handle string with only letters', () => {
    expect(alphanumeric('abcdef')).toBe('abcdef')
  })

  it('should handle string with only numbers', () => {
    expect(alphanumeric('123456')).toBe('123456')
  })

  it('should handle empty string', () => {
    expect(alphanumeric('')).toBe('')
  })

  it('should preserve accents', () => {
    expect(alphanumeric('café123ção456')).toBe('café123ção456')
  })

  it('should remove spaces and punctuation', () => {
    expect(alphanumeric('hello 123 world 456')).toBe('hello123world456')
  })

  it('should handle mixed case with accents and numbers', () => {
    expect(alphanumeric('João123Silva456')).toBe('João123Silva456')
  })

  it('should remove all special characters', () => {
    expect(alphanumeric('!@#$%^&*()_+-=[]{}|;:,.<>?')).toBe('')
  })
  it('should throw error for non-string input', () => {
    expect(() => alphanumeric(123 as unknown as string)).toThrow('Input must be a string')
  })
})

describe('safeAlphanumeric', () => {
  it('should work normally with valid input', () => {
    expect(safeAlphanumeric('abc123def')).toBe('abc123def')
  })
  it('should return fallback for invalid input', () => {
    expect(safeAlphanumeric(null as unknown as string)).toBe('')
    expect(safeAlphanumeric(undefined as unknown as string)).toBe('')
    expect(safeAlphanumeric(123 as unknown as string)).toBe('')
  })
})
