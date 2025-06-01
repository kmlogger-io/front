import { createSafeFormatter } from '../safe-formatter'

/**
 * Removes all non-numeric characters from input
 * @param value - The input string to format
 * @returns String containing only numbers
 */
export function onlyNumbers(value: string): string {
  if (typeof value !== 'string') {
    throw new Error('Input must be a string')
  }
  
  return value.replace(/\D/g, '')
}

/**
 * Safe version of onlyNumbers formatter with error handling
 */
export const safeOnlyNumbers = createSafeFormatter(onlyNumbers, '')
