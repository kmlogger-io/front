import type { PaginationState, Updater } from '@tanstack/react-table'
import { usePaginationContext } from '../contexts/PaginationContext'

export type PaginationType = {
  pageIndex: number
  itemsPerPage: number
  totalItems: number
}

export function usePaginationTable() {
  const { state, dispatch } = usePaginationContext()

  const onPaginationChange = (pagination: Updater<PaginationState>) => {
    const currentPagination = {
      pageIndex: state.pageIndex,
      pageSize: state.itemsPerPage,
    }

    const newPagination =
      typeof pagination === 'function' ? pagination(currentPagination) : pagination

    dispatch({
      type: 'updatePagination',
      pagination: {
        pageIndex: newPagination.pageIndex,
        itemsPerPage: newPagination.pageSize,
      },
    })
  }

  const pagination: PaginationType & {
    onPaginationChange: (pagination: Updater<PaginationState>) => void
  } = {
    pageIndex: state.pageIndex,
    itemsPerPage: state.itemsPerPage,
    totalItems: state.totalItems,
    onPaginationChange,
  }

  return pagination
}