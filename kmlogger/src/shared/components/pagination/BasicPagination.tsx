import type { PaginationProps, SelectChangeEvent } from '@mui/material'
import type { Table } from '@tanstack/react-table'
import { Box, MenuItem, Pagination, Select } from '@mui/material'
import { useCallback, useEffect } from 'react'

interface Props<T> {
  table: Table<T>
  className?: string
  paginationProps: PaginationProps
  itemsPerPageOptions?: number[]
}

const defaultOptions = [5, 10, 25, 50]

export default function BasicPagination<T>({
  table,
  paginationProps,
  itemsPerPageOptions = defaultOptions,
}: Props<T>) {
  const totalItems = table.getRowCount()
  const itemsPerPage = table.getState().pagination.pageSize
  const totalPages = table.getPageCount()
  const pageIndex = table.getState().pagination.pageIndex

  const onPageChange = useCallback(
    (_: unknown, page: number) => {
      table.setPageIndex(page - 1)
    },
    [table]
  )

  useEffect(() => {
    if (!(pageIndex * itemsPerPage >= totalItems)) return
    table.setPageIndex(0)
  }, [pageIndex, itemsPerPage, table, totalItems])

  const onItemsPerPageChange = useCallback(
    (event: SelectChangeEvent) => {
      const { value } = event.target
      const newValue = Number(value)
      table.setPageSize(newValue)
    },
    [table]
  )

  const formatPaginationIndexText = useCallback(() => {
    if (
      ![totalItems, pageIndex, itemsPerPage, totalPages].some(
        value => !isFinite(value)
      )
    ) {
      return `${pageIndex * itemsPerPage + 1}-${Math.min(
        (pageIndex + 1) * itemsPerPage,
        totalItems
      )} of ${totalItems}`
    }
    return '0-0 of 0'
  }, [totalItems, pageIndex, itemsPerPage, totalPages])

  return (
    <Box className="flex sm:flex-row flex-col items-center justify-between w-full">
      <Box className="flex gap-2 items-center">
        <span className="mr-1">Items per page</span>
        <Select
          data-testid="items-per-page"
          id="items-per-page"
          value={String(itemsPerPage) as ''}
          onChange={onItemsPerPageChange}
          variant="outlined"
          size="small"
        >
          {itemsPerPageOptions.map(option => (
            <MenuItem key={option} value={String(option)}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <Box data-testid="total-items">{formatPaginationIndexText()}</Box>
      </Box>
      <Pagination
        {...paginationProps}
        data-testid="pagination"
        count={table.getPageCount()}
        page={table.getState().pagination.pageIndex + 1}
        onChange={(_, page) => {
          onPageChange(_, page)
        }}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>
  )
}