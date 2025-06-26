import { createContext, useContext } from 'react'

export interface PaginacaoEstado {
  indicePagina: number
  itensPorPagina: number
  totalItens: number
}

export type PaginacaoAcao =
  | { tipo: 'setarIndicePagina'; indicePagina: number }
  | { tipo: 'setarItensPorPagina'; itensPorPagina: number }
  | { tipo: 'setarTotalItens'; totalItens: number }
  | { tipo: 'atualizarPaginacao'; paginacao: Partial<PaginacaoEstado> }

export interface PaginacaoContextoTipo {
  estado: PaginacaoEstado
  dispatch: React.Dispatch<PaginacaoAcao>
}

export const PaginacaoContext = createContext<
  PaginacaoContextoTipo | undefined
>(undefined)


export function usePaginacaoContext() {
  const context = useContext(PaginacaoContext)

  if (context === undefined) {
    throw new Error(
      'usePaginacaoContext deve ser usado dentro de um PaginacaoProvider'
    )
  }

  return context
}
