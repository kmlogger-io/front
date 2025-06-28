import type { AccessorColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import ButtonActions from '../components/ButtonActions'

interface UseTableProps<T extends { id: string }> {
  data: T[]
  extraColumns: AccessorColumnDef<T, any>[]
  deleteMutation: {
    mutateAsync: (params: { id: string }) => Promise<any>
    isPending: boolean
  }
  onEdit?: (item: T) => void
  onView?: (item: T) => void
  onDelete?: (id: string) => void
  onDeleteSuccess?: () => void
  onDeleteError?: (error: any) => void
  deleteIconTitle?: string
  shouldShowMenuItem?: (id: string) => boolean
  showButtons?: ('edit' | 'delete' | 'view')[]
  additionalTableActionButtons?:
    | React.ReactNode
    | ((id: string | undefined) => React.ReactNode)
}

export function useTable<T extends { id: string }>({
  data,
  extraColumns,
  deleteMutation,
  onEdit,
  onView,
  onDelete,
  onDeleteSuccess,
  onDeleteError,
  deleteIconTitle,
  additionalTableActionButtons,
  shouldShowMenuItem,
  showButtons = ['edit', 'delete'],
}: UseTableProps<T>) {
  // State
  const [modalOpen, setModalOpen] = useState(false)
  const [deletionId, setDeletionId] = useState<string | undefined>()

  async function view(id: string) {
    const itemToView = data.find(item => item.id === id)
    if (!itemToView) {
      console.error('Item to view not found')
      throw new Error('Item to view not found')
    }
    if (onView) onView(itemToView)
  }

  async function edit(id: string) {
    const itemToEdit = data.find(item => item.id === id)
    if (!itemToEdit) {
      throw new Error('Item to edit not found')
    }
    if (onEdit) onEdit(itemToEdit)
  }

  async function deleteItem(id: string) {
    try {
      await deleteMutation.mutateAsync({ id })
      setModalOpen(false)
      setDeletionId(undefined)
      if (onDelete) onDelete(id)
      if (onDeleteSuccess) onDeleteSuccess()
    } catch (error) {
      if (onDeleteError) onDeleteError(error)
    }
  }

  function openDeleteModal(id: string) {
    setDeletionId(id)
    setModalOpen(true)
  }

  const columns: AccessorColumnDef<T, any>[] = [
    ...extraColumns,
    {
      accessorKey: 'id',
      header: 'Actions',
      meta: {
        dataType: 'icon',
        alignment: 'center'
      },
      cell: info => {
        const id = info.getValue() as string
        return (
          <ButtonActions
            itemId={id}
            view={showButtons.includes('view') ? () => view(id) : undefined}
            edit={showButtons.includes('edit') ? () => edit(id) : undefined}
            delete={showButtons.includes('delete') ? () => openDeleteModal(id) : undefined}
            isPendingDeletion={deleteMutation.isPending && deletionId === id}
            openDeleteModal={() => openDeleteModal(id)}
            deleteIconTitle={deleteIconTitle}
            additionalTableActionButtons={additionalTableActionButtons}
            showButtons={showButtons}
            shouldShowMenuItem={
              shouldShowMenuItem ? () => shouldShowMenuItem(id) : undefined
            }
          />
        )
      },
    },
  ]

  return {
    data,
    columns,
    modalOpen,
    delete: deleteItem,
    setModalOpen,
    isPendingDelete: deleteMutation.isPending,
  }
}