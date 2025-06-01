import { createSafeFormatter } from '../safe-formatter'

/**
 * Keeps only alphanumeric characters (letters and numbers)
 * @param value - The input string to format
 * @returns String containing only letters and numbers
 */
export function alphanumeric(value: string): string {
  if (typeof value !== 'string') {
    throw new Error('Input must be a string')
  }
  
  return value.replace(/[^a-zA-Z0-9À-ÿ]/g, '')
}

/**
 * Safe version of alphanumeric formatter with error handling
 */
export const safeAlphanumeric = createSafeFormatter(alphanumeric, '')
