import { createSafeFormatter } from '../safe-formatter'

/**
 * Formats a string as a Brazilian phone number (XX) XXXXX-XXXX
 * @param value - The input string to format
 * @returns Formatted phone number string
 */
export function phone(value: string): string {
  if (typeof value !== 'string') {
    throw new Error('Input must be a string')
  }
  
  // Remove all non-numeric characters
  const numbersOnly = value.replace(/\D/g, '')
  
  // Handle different phone number lengths
  if (numbersOnly.length === 0) {
    return ''
  }
  
  if (numbersOnly.length <= 2) {
    return `(${numbersOnly}`
  }
  
  if (numbersOnly.length <= 7) {
    return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2)}`
  }
  
  if (numbersOnly.length <= 10) {
    return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2, 6)}-${numbersOnly.slice(6)}`
  }
  
  // For 11 digits (with 9), format as (XX) XXXXX-XXXX
  if (numbersOnly.length === 11) {
    return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2, 7)}-${numbersOnly.slice(7)}`
  }
  
  // If more than 11 digits, truncate to 11
  const truncated = numbersOnly.slice(0, 11)
  return `(${truncated.slice(0, 2)}) ${truncated.slice(2, 7)}-${truncated.slice(7)}`
}

/**
 * Safe version of phone formatter with error handling
 */
export const safePhone = createSafeFormatter(phone, '')
