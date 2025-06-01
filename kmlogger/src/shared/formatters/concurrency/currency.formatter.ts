import { createSafeFormatter } from '../safe-formatter'

/**
 * Formats a string as Brazilian currency (BRL)
 * @param value - The input string to format
 * @returns Formatted currency string
 */
export function currency(value: string): string {
  if (typeof value !== 'string') {
    throw new Error('Input must be a string')
  }
  
  let numbersOnly = value.replace(/[^\d,.-]/g, '')
  if (numbersOnly === '') {
    return 'R$\u00A00,00'
  }
  
  const lastCommaIndex = numbersOnly.lastIndexOf(',')
  const lastDotIndex = numbersOnly.lastIndexOf('.')
  
  if (lastCommaIndex > lastDotIndex) {
    // Comma is the decimal separator
    const parts = numbersOnly.split(',')
    const wholePart = parts.slice(0, -1).join('').replace(/[.,]/g, '')
    const decimalPart = parts[parts.length - 1]
    numbersOnly = wholePart + '.' + decimalPart
  } else if (lastDotIndex > lastCommaIndex) {
    // Dot is the decimal separator
    const parts = numbersOnly.split('.')
    const wholePart = parts.slice(0, -1).join('').replace(/[.,]/g, '')
    const decimalPart = parts[parts.length - 1]
    numbersOnly = wholePart + '.' + decimalPart
  } else {
    // No decimal separator
    numbersOnly = numbersOnly.replace(/[.,]/g, '')
  }
  
  // Parse as number
  const number = parseFloat(numbersOnly)
  
  if (isNaN(number)) {
    return 'R$\u00A00,00'
  }
  
  // Format as Brazilian currency
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number)
}

/**
 * Safe version of currency formatter with error handling
 */
export const safeCurrency = createSafeFormatter(currency, 'R$\u00A00,00')
