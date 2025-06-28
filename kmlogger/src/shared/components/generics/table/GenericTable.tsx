'use client'
import type {
  Column,
  ColumnDef,
  ColumnMeta,
  PaginationState,
  RowData,
  TableOptions,
} from '@tanstack/react-table'
import type { CSSProperties } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { IconLoader3 } from '@tabler/icons-react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import classNames from 'classnames'
import { useEffect } from 'react'
import { BaseTable, BaseTableBody, BaseTableCell, BaseTableHead, BaseTableHeader, BaseTableRow } from '../../table/BaseTable'
import { Card } from '../../card/card'
import BasicPagination from '../../pagination/BasicPagination'
import type { PaginationType } from '../../../hooks/usePagination.hook'

interface GenericTableProps<T> {
  'data': T[]
  'columns': ColumnDef<T, any>[]
  'itemsPerPage'?: number
  'pageIndex'?: number
  'showPagination'?: boolean
  'noDataMessage'?: string
  'className'?: string
  'tableClassName'?: string
  'data-testid'?: string
  'loading'?: boolean
  'onPaginationChange'?: (pagination: PaginationState) => void
  'manualPagination'?: boolean
  'totalItems'?: number
  'shouldRenderCompact'?: boolean
  'pagination'?: PaginationType & {
    onPaginationChange?: (pagination: PaginationState) => void
  }
}

type CustomColumnMeta = ColumnMeta<any, any> & {
  dataType?: 'number' | 'date' | 'icon' | string
  alignment?: 'left' | 'right' | 'center'
}

function getAlignmentByMeta(
  meta?: CustomColumnMeta
): 'left' | 'right' | 'center' {
  if (!meta) return 'left'

  const { dataType, alignment } = meta
  if (alignment) return alignment

  switch (dataType) {
    case 'number':
      return 'right'
    case 'date':
      return 'center'
    case 'icon':
      return 'center'
    default:
      return 'left'
  }
}

function getColumnStyle(column: Column<any>): CSSProperties {
  const isPinned = column.getIsPinned()
  const isPinnedLeft =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isPinnedRight =
    isPinned === 'right' && column.getIsFirstColumn('right')
  const isFirstColumn = column.getIsFirstColumn()
  const isLastColumn = column.getIsLastColumn()
  const isActionsColumn = column.columnDef.header === 'Actions'
  const columnSize = isActionsColumn ? 80 : column.getSize()
  const defaultSize = 150
  const maxSize =
    columnSize === defaultSize
      ? undefined
      : columnSize + (isLastColumn || isFirstColumn ? 30 : 0)
  const alignment = isPinned
    ? 'center'
    : getAlignmentByMeta(column.columnDef.meta)

  return {
    boxShadow: isPinnedLeft
      ? '-1px -1px 1px -1px gray inset'
      : isPinnedRight
        ? '1px 0 -1px -1px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    zIndex: isPinned ? 1 : 0,
    width: maxSize,
    minWidth: columnSize,
    maxWidth: maxSize,
    paddingLeft: isFirstColumn ? '45px' : '1rem',
    paddingRight: isLastColumn ? '45px' : '1rem',
    textAlign: alignment,
  }
}

const defaultNoDataMessage = "No data found"

export function GenericTable<T>({
  pagination,
  data,
  columns,
  pageIndex = pagination?.pageIndex ?? 0,
  itemsPerPage = pagination?.itemsPerPage ?? 10,
  totalItems = pagination?.totalItems,
  showPagination = true,
  noDataMessage = defaultNoDataMessage,
  className,
  tableClassName,
  loading = false,
  onPaginationChange = pagination?.onPaginationChange,
  'data-testid': dataTestId,
  manualPagination = false,
  shouldRenderCompact = false,
}: GenericTableProps<T>) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const manualPaginationOptions: Pick<
    TableOptions<RowData>,
    'onPaginationChange' | 'state' | 'manualPagination'
  > = {
    onPaginationChange: pagination =>
      onPaginationChange?.(pagination as PaginationState),
    state: {
      pagination: { pageIndex: pageIndex, pageSize: itemsPerPage },
    },
    manualPagination: manualPagination,
  }

  const automaticPaginationOptions: Pick<
    TableOptions<RowData>,
    'initialState'
  > = {
    initialState: {
      pagination: {
        pageIndex: pageIndex,
        pageSize: itemsPerPage,
      },
    },
  }

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: totalItems,
    columnResizeMode: 'onChange',
    ...(manualPagination ? manualPaginationOptions : automaticPaginationOptions),
  })

  useEffect(() => {
    const tableColumns = table.getAllColumns().filter(c => c.getIsVisible())
    tableColumns.forEach(column => {
      if (column.columnDef.header === 'Actions') column.pin('right')
    })
  }, [table])

  if (isMobile || shouldRenderCompact) {
    return (
      <Box
        data-testid={dataTestId}
        className={classNames('space-y-4', className)}
      >
        {table.getRowModel().rows.length > 0 ? (
          <>
            {table.getRowModel().rows.map(row => (
              <Card key={row.id} className="p-4">
                <Box className="space-y-2">
                  {row.getVisibleCells().map(cell => {
                    const header = cell.column.columnDef.header
                    const headerContent =
                      typeof header === 'function' ? header({} as any) : header

                    return (
                      <Box key={cell.id} className="grid grid-cols-2 gap-2">
                        <Box className="text-sm font-medium text-gray-500">
                          {headerContent}
                        </Box>
                        <Box className="text-sm flex items-center justify-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              </Card>
            ))}
          </>
        ) : (
          <Box className="text-center p-4">{noDataMessage}</Box>
        )}

        {showPagination && (
          <Box className="flex justify-center py-4">
            <BasicPagination
              table={table}
              paginationProps={{
                size: 'small',
                classes: { ul: 'justify-center' },
              }}
            />
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box
      data-testid={dataTestId}
      className={classNames('rounded-3xl border flex flex-col', className)}
    >
      <Box className="overflow-x-auto m-[3px]">
        <BaseTable
          className={classNames('h-full min-h-0 flex-shrink ', tableClassName)}
        >
          <BaseTableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <BaseTableRow key={headerGroup.id} className="group">
                {headerGroup.headers.map(header => (
                  <BaseTableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      ...(isMobile ? {} : getColumnStyle(header.column)),
                    }}
                    className="group-hover:bg-muted bg-white"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </BaseTableHead>
                ))}
              </BaseTableRow>
            ))}
          </BaseTableHeader>
          <BaseTableBody>
            {loading ? (
              <BaseTableRow>
                <BaseTableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <IconLoader3 className="animate-spin" size={24} />
                </BaseTableCell>
              </BaseTableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <BaseTableRow
                  data-testid="table-row"
                  key={row.id}
                  className="group"
                >
                  {row.getVisibleCells().map(cell => (
                    <BaseTableCell
                      key={cell.id}
                      style={{
                        ...(isMobile ? {} : getColumnStyle(cell.column)),
                      }}
                      className="group-hover:bg-muted bg-white"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </BaseTableCell>
                  ))}
                </BaseTableRow>
              ))
            ) : (
              <BaseTableRow>
                <BaseTableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {noDataMessage}
                </BaseTableCell>
              </BaseTableRow>
            )}
          </BaseTableBody>
        </BaseTable>
      </Box>

      {showPagination && (
        <Box className="flex flex-grow px-4">
          <BasicPagination
            table={table}
            paginationProps={{
              classes: { ul: 'justify-end' },
              className: 'py-4',
            }}
          />
        </Box>
      )}
    </Box>
  )
}