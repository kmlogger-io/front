export function createSafeFormatter<T extends any[], R>(
  formatter: (...args: T) => R,
  fallback: R
) {
  return (...args: T): R => {
    try {
      return formatter(...args)
    } catch (error) {
      console.error('Formatter error:', error)
      return fallback
    }
  }
}
