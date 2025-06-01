import { createSafeFormatter } from '../safe-formatter'

/**
 * Removes all non-letter characters from input (keeps accents and spaces)
 * @param value - The input string to format
 * @returns String containing only letters, accents and spaces
 */
export function onlyLetters(value: string): string {
  if (typeof value !== 'string') {
    throw new Error('Input must be a string')
  }
  
  return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
}

/**
 * Safe version of onlyLetters formatter with error handling
 */
export const safeOnlyLetters = createSafeFormatter(onlyLetters, '')
