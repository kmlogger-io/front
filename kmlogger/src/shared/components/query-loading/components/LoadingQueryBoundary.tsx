import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { animacaoFadeDown } from '../../../animations/fade-down.animation'
import ErrorBoundary from '../../boundaries/ErrorBoundary'
import Spinner from '../../spinner/Spinner'

interface CarregandoQueryProps {
  'estaCarregando': boolean
  'estaComErro': boolean
  'erro'?: Error | null
  'children': ReactNode
  'animacao'?: typeof animacaoFadeDown
  'className'?: string
  'containerClassName'?: string
  'carregandoClassName'?: string
  'data-testid'?: string
}

export function LoadingQuery({
  estaCarregando,
  estaComErro,
  erro,
  children,
  animacao = animacaoFadeDown,
  className = '',
  containerClassName,
  carregandoClassName = '',
  'data-testid': dataTestId,
}: CarregandoQueryProps) {
  if (estaComErro) throw new Error(erro ?.message || 'Erro desconhecido durante a consulta')

  return (
    <div
      className={twMerge(containerClassName, 'w-full h-full relative')}
      data-testid={dataTestId}
    >
      <AnimatePresence mode="wait">
        {estaCarregando && (
          <motion.div
            key="carregando-estado"
            data-testid="query-carregando-estado"
            className={twMerge(
              'w-full h-full absolute inset-0 flex items-center justify-center',
              carregandoClassName
            )}
            {...animacao}
            exit={{ opacity: 0 }}
          >
            <Spinner />
          </motion.div>
        )}

        {!estaCarregando && !estaComErro && (
          <motion.div
            key="conteudo-estado"
            className={twMerge('w-full h-full', className)}
            {...animacao}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LoadingQueryBoundary(props: CarregandoQueryProps) {
  return (
    <ErrorBoundary>
      <LoadingQuery {...props} />
    </ErrorBoundary>
  )
}
