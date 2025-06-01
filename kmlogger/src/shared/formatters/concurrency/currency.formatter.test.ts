import { describe, it, expect } from 'vitest'
import { currency, safeCurrency } from './currency.formatter'

describe('currency', () => {
  it('should format integer as currency', () => {
    expect(currency('100')).toBe('R$\u00A0100,00')
  })

  it('should format decimal with comma as currency', () => {
    expect(currency('100,50')).toBe('R$\u00A0100,50')
  })

  it('should format decimal with dot as currency', () => {
    expect(currency('100.50')).toBe('R$\u00A0100,50')
  })

  it('should format large numbers with thousands separator', () => {
    expect(currency('1000')).toBe('R$\u00A01.000,00')
  })

  it('should format very large numbers', () => {
    expect(currency('1000000')).toBe('R$\u00A01.000.000,00')
  })

  it('should handle empty string', () => {
    expect(currency('')).toBe('R$\u00A00,00')
  })

  it('should handle zero', () => {
    expect(currency('0')).toBe('R$\u00A00,00')
  })

  it('should handle decimal cents only', () => {
    expect(currency('0,99')).toBe('R$\u00A00,99')
  })

  it('should handle string with currency symbols already', () => {
    expect(currency('R$ 100,50')).toBe('R$\u00A0100,50')
  })

  it('should handle string with letters and numbers', () => {
    expect(currency('abc123def')).toBe('R$\u00A0123,00')
  })

  it('should handle multiple decimal separators (use last one)', () => {
    expect(currency('1.000,50')).toBe('R$\u00A01.000,50')
  })

  it('should handle invalid input with only letters', () => {
    expect(currency('abcdef')).toBe('R$\u00A00,00')
  })

  it('should handle negative numbers', () => {
    expect(currency('-100')).toBe('-R$\u00A0100,00')
  })
  
  it('should throw error for non-string input', () => {
    expect(() => currency(123 as unknown as string)).toThrow('Input must be a string')
  })
})

describe('safeCurrency', () => {
  it('should work normally with valid input', () => {
    expect(safeCurrency('100')).toBe('R$\u00A0100,00')
  })
  
  it('should return fallback for invalid input', () => {
    expect(safeCurrency(null as unknown as string)).toBe('R$\u00A00,00')
    expect(safeCurrency(undefined as unknown as string)).toBe('R$\u00A00,00')
    expect(safeCurrency(123 as unknown as string)).toBe('R$\u00A00,00')
  })
})
