import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { animacaoFadeDown } from '../../../animations/fade-down.animation'
import ErrorBoundary from '../../boundaries/ErrorBoundary'
import LoadingSpinner from '../../spinner/Spinner'

interface LoadingQueryProps {
  'isLoading': boolean
  'hasError': boolean
  'error'?: Error | null
  'children': ReactNode
  'animation'?: typeof animacaoFadeDown
  'className'?: string
  'containerClassName'?: string
  'loadingClassName'?: string
  'data-testid'?: string
}

export function LoadingQuery({
  isLoading,
  hasError,
  error,
  children,
  animation = animacaoFadeDown,
  className = '',
  containerClassName,
  loadingClassName = '',
  'data-testid': dataTestId,
}: LoadingQueryProps) {
  if (hasError) throw new Error(error?.message || 'Unknown error during query')

  return (
    <div
      className={twMerge(containerClassName, 'w-full h-full relative')}
      data-testid={dataTestId}
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading-state"
            data-testid="query-loading-state"
            className={twMerge(
              'w-full h-full absolute inset-0 flex items-center justify-center',
              loadingClassName
            )}
            {...animation}
            exit={{ opacity: 0 }}
          >
            <LoadingSpinner />
          </motion.div>
        )}
        {!isLoading && !hasError && (
          <motion.div
            key="content-state"
            className={twMerge('w-full h-full', className)}
            {...animation}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LoadingQueryBoundary(props: LoadingQueryProps) {
  return (
    <ErrorBoundary>
      <LoadingQuery {...props} />
    </ErrorBoundary>
  )
}