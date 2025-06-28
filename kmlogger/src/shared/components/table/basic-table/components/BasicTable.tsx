import type { useQuery } from '@tanstack/react-query'
import type { AccessorColumnDef } from '@tanstack/react-table'
import { useMutation } from '@tanstack/react-query'
import LoadingQueryBoundary from '../../../query-loading/components/LoadingQueryBoundary'
import { useTable } from '../hooks/useTable'
import { GenericTable } from '../../../generics/table/GenericTable'
import DeleteModal from '../../../modal/delete/DeleteModal'
import { usePaginationTable } from '../../../../hooks/usePagination.hook'
import { useState } from 'react'

interface BaseProps<T extends { id: string }> {
  'data-testid'?: string
  'data': T[]
  'onEdit'?: (item: T) => void
  'onView'?: (item: T) => void
  'extraColumns': AccessorColumnDef<T, any>[]
  'query': ReturnType<typeof useQuery>
  'deleteIconTitle'?: string
  'additionalTableActionButtons'?:
    | React.ReactNode
    | ((id: string | undefined) => React.ReactNode)
  'showButtons'?: ('edit' | 'delete' | 'view')[]
  'loadingQueryClassName'?: string
  'loadingQueryContainerClassName'?: string
  'shouldShowMenuItem'?: (id: string) => boolean
  'className'?: string
  'tableClassName'?: string
  'showPagination'?: boolean
  'shouldRenderCompact'?: boolean
}

interface PropsWithDeleteMutation<T extends { id: string }>
  extends BaseProps<T> {
  deleteMutation: Parameters<typeof useMutation<any, any, any, unknown>>
  onDelete?: (id: string) => void
}

interface PropsWithOnDelete<T extends { id: string }> extends BaseProps<T> {
  deleteMutation?: undefined
  onDelete: (id: string) => void
}

type Props<T extends { id: string }> =
  | PropsWithDeleteMutation<T>
  | PropsWithOnDelete<T>

const defaultDeleteMutation = [{}] as Parameters<
  typeof useMutation<any, any, any, unknown>
>

export function BasicTable<T extends { id: string }>({
  'data-testid': dataTestId,
  loadingQueryClassName,
  onEdit,
  onView,
  onDelete,
  extraColumns,
  'data': dataProps,
  deleteMutation = defaultDeleteMutation,
  query,
  deleteIconTitle,
  additionalTableActionButtons,
  loadingQueryContainerClassName,
  showButtons,
  shouldShowMenuItem,
  className,
  tableClassName,
  showPagination = true,
  shouldRenderCompact = false,
}: Props<T>) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  
  const {
    data,
    columns,
    modalOpen,
    delete: deleteItem,
    setModalOpen,
    isPendingDelete,
  } = useTable({
    onEdit: onEdit
      ? item => {
          onEdit(item)
        }
      : undefined,
    onView: onView
      ? item => {
          onView(item)
        }
      : undefined,
    onDelete,
    data: dataProps,
    deleteMutation: useMutation(...deleteMutation),
    extraColumns,
    deleteIconTitle,
    additionalTableActionButtons,
    showButtons,
    shouldShowMenuItem,
  })

  const pagination = usePaginationTable()

  const handleDelete = async () => {
    if (pendingDeleteId) {
      await deleteItem(pendingDeleteId)
      setPendingDeleteId(null)
    }
  }

  const handleOpenDeleteModal = (id: string) => {
    setPendingDeleteId(id)
    setModalOpen(true)
  }

  return (
    <LoadingQueryBoundary
      className={loadingQueryClassName}
      containerClassName={loadingQueryContainerClassName}
      isLoading={query.isPending}
      hasError={query.isError}
      error={query.error as Error}
    >
      <GenericTable<T>
        data-testid={dataTestId}
        className={className}
        tableClassName={tableClassName}
        columns={columns}
        data={data}
        manualPagination
        pagination={pagination}
        showPagination={showPagination}
        shouldRenderCompact={shouldRenderCompact}
        loading={query.isPending}
      />
      
      <DeleteModal
        pendingDeletion={isPendingDelete}
        delete={handleDelete}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        deleteButtonTestId="confirm-delete"
      />
    </LoadingQueryBoundary>
  )
}