import { describe, it, expect } from 'vitest'
import { onlyLetters, safeOnlyLetters } from './only-letters.formatter'

describe('onlyLetters', () => {
  it('should remove all non-letter characters', () => {
    expect(onlyLetters('abc123def456')).toBe('abcdef')
  })

  it('should handle string with only letters', () => {
    expect(onlyLetters('abcdef')).toBe('abcdef')
  })

  it('should handle string with only numbers', () => {
    expect(onlyLetters('123456')).toBe('')
  })

  it('should handle empty string', () => {
    expect(onlyLetters('')).toBe('')
  })

  it('should preserve accents and special characters', () => {
    expect(onlyLetters('café123ção456')).toBe('caféção')
  })

  it('should preserve spaces', () => {
    expect(onlyLetters('hello 123 world 456')).toBe('hello  world ')
  })

  it('should handle special characters and punctuation', () => {
    expect(onlyLetters('hello!@#world$%^test&*()')).toBe('helloworldtest')
  })

  it('should handle mixed case with accents', () => {
    expect(onlyLetters('João123Silva456')).toBe('JoãoSilva')
  })
  it('should throw error for non-string input', () => {
    expect(() => onlyLetters(123 as unknown as string)).toThrow('Input must be a string')
  })
})

describe('safeOnlyLetters', () => {
  it('should work normally with valid input', () => {
    expect(safeOnlyLetters('abc123def')).toBe('abcdef')
  })
  it('should return fallback for invalid input', () => {
    expect(safeOnlyLetters(null as unknown as string)).toBe('')
    expect(safeOnlyLetters(undefined as unknown as string)).toBe('')
    expect(safeOnlyLetters(123 as unknown as string)).toBe('')
  })
})
