import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extends Vitest's expect with Testing Library matchers
expect.extend(matchers)

// Cleanup after each test case
afterEach(() => {
  cleanup()
})
