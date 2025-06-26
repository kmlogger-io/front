import type { PaginationState, Updater } from '@tanstack/react-table'
import { usePaginacaoContext } from '../contexts/PaginationContext'

export type PaginacaoTipo = {
  indicePagina: number
  itensPorPagina: number
  totalItens: number
}

export function usePaginacaoTabela() {
  const { estado, dispatch } = usePaginacaoContext()

  const aoMudarPaginacao = (paginacao: Updater<PaginationState>) => {
    const paginacaoAtual = {
      pageIndex: estado.indicePagina,
      pageSize: estado.itensPorPagina,
    }

    const novaPaginacao =
      typeof paginacao === 'function' ? paginacao(paginacaoAtual) : paginacao

    dispatch({
      tipo: 'atualizarPaginacao',
      paginacao: {
        indicePagina: novaPaginacao.pageIndex,
        itensPorPagina: novaPaginacao.pageSize,
      },
    })
  }

  const paginacao: PaginacaoTipo & {
    aoMudarPaginacao: (paginacao: Updater<PaginationState>) => void
  } = {
    indicePagina: estado.indicePagina,
    itensPorPagina: estado.itensPorPagina,
    totalItens: estado.totalItens,
    aoMudarPaginacao,
  }

  return paginacao
}
