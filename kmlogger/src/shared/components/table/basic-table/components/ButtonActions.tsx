import { Menu, MenuItem, Tooltip } from '@mui/material'
import {
  IconDotsVertical,
  IconEye,
  IconLoader2,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'
import { useMenu } from '../../../../hooks/useMenu.hook'

type ButtonType = 'view' | 'edit' | 'delete'

const DEFAULT_MUTABLE_BUTTONS: ButtonType[] = ['view', 'edit', 'delete']

function formatTestId(baseTestId: string, itemId?: string): string {
  return itemId ? `${baseTestId}-${itemId}` : baseTestId
}

interface Props {
  itemId?: string
  view?: () => void
  edit?: () => void
  delete?: () => void
  isPendingDeletion: boolean
  openDeleteModal: (val: boolean) => void
  viewButtonTestId?: string
  editButtonTestId?: string
  deleteButtonTestId?: string
  showButtons?: ButtonType[]
  viewIcon?: React.ComponentType<any>
  editIcon?: React.ComponentType<any>
  deleteIcon?: React.ComponentType<any>
  viewIconTitle?: string
  editIconTitle?: string
  deleteIconTitle?: string
  additionalTableActionButtons?:
    | React.ReactNode
    | ((id: string | undefined) => React.ReactNode)
  shouldShowMenuItem?: () => boolean
}

export default function ButtonActions({
  itemId,
  view,
  edit,
  delete: deleteAction,
  isPendingDeletion,
  openDeleteModal,
  viewButtonTestId,
  editButtonTestId,
  deleteButtonTestId,
  showButtons = DEFAULT_MUTABLE_BUTTONS,
  viewIcon: ViewIcon = IconEye,
  editIcon: EditIcon = IconPencil,
  deleteIcon: DeleteIcon = IconTrash,
  viewIconTitle = 'View',
  editIconTitle = 'Edit',
  deleteIconTitle = 'Delete',
  additionalTableActionButtons,
  shouldShowMenuItem,
}: Props) {
  const { menuAnchor, openMenu, closeMenu } = useMenu()

  const menuOpen = menuAnchor?.id === itemId

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (itemId) {
      openMenu(event, itemId)
    }
  }

  const handleMenuItemClick = (action: () => void) => {
    action()
    closeMenu()
  }

  const shouldShowButton = (button: ButtonType): boolean => {
    if (shouldShowMenuItem && !shouldShowMenuItem()) {
      return false
    }

    switch (button) {
      case 'view':
        return !!view
      case 'edit':
        return !!edit && !isPendingDeletion
      case 'delete':
        return !isPendingDeletion
      default:
        return true
    }
  }

  const visibleButtons = showButtons.filter(shouldShowButton)
  const totalButtons =
    visibleButtons.length + (additionalTableActionButtons ? 1 : 0)
  const useDropdownMenu = totalButtons >= 3

  if (useDropdownMenu) {
    return (
      <div className="flex items-center gap-2 justify-center">
        {isPendingDeletion ? (
          <IconLoader2 className="animate-spin mr-2 h-4 w-4" />
        ) : (
          <>
            <Tooltip title="More actions" arrow>
              <IconDotsVertical
                role="button"
                size={18}
                className="cursor-pointer"
                onClick={handleClick}
                data-testid={formatTestId(
                  'table-actions-options-button',
                  itemId
                )}
              />
            </Tooltip>

            {menuAnchor?.element && (
              <Menu
                anchorEl={menuAnchor.element as HTMLElement}
                open={menuOpen}
                onClose={closeMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {additionalTableActionButtons && (
                  <div className="px-2 py-1">
                    {typeof additionalTableActionButtons === 'function'
                      ? additionalTableActionButtons(itemId)
                      : additionalTableActionButtons}
                  </div>
                )}

                {shouldShowButton('view') &&
                  showButtons.includes('view') && (
                    <MenuItem
                      onClick={() => handleMenuItemClick(view!)}
                      data-testid={
                        viewButtonTestId ||
                        formatTestId('menu-item-view', itemId)
                      }
                    >
                      <ViewIcon size={16} className="mr-2" />
                      {viewIconTitle}
                    </MenuItem>
                  )}

                {shouldShowButton('edit') &&
                  showButtons.includes('edit') && (
                    <MenuItem
                      onClick={() => handleMenuItemClick(edit!)}
                      data-testid={
                        editButtonTestId ||
                        formatTestId('menu-item-edit', itemId)
                      }
                    >
                      <EditIcon size={16} className="mr-2" />
                      {editIconTitle}
                    </MenuItem>
                  )}

                {shouldShowButton('delete') &&
                  showButtons.includes('delete') && (
                    <MenuItem
                      onClick={() =>
                        handleMenuItemClick(() => {
                          if (deleteAction) {
                            deleteAction()
                          } else {
                            openDeleteModal(true)
                          }
                        })
                      }
                      data-testid={
                        deleteButtonTestId ||
                        formatTestId('menu-item-delete', itemId)
                      }
                    >
                      <DeleteIcon size={16} className="mr-2" />
                      {deleteIconTitle}
                    </MenuItem>
                  )}
              </Menu>
            )}
          </>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {typeof additionalTableActionButtons === 'function'
        ? additionalTableActionButtons(itemId)
        : additionalTableActionButtons}

      {shouldShowButton('edit') && showButtons.includes('edit') && (
        <Tooltip title={editIconTitle} arrow>
          <EditIcon
            role="button"
            onClick={edit}
            size={18}
            className="text-primary cursor-pointer"
            data-testid={
              editButtonTestId ||
              formatTestId('table-actions-edit-button', itemId)
            }
          />
        </Tooltip>
      )}

      {shouldShowButton('delete') && showButtons.includes('delete') && (
        <Tooltip title={deleteIconTitle} arrow>
          <DeleteIcon
            role="button"
            onClick={() => {
              if (deleteAction) {
                deleteAction()
              } else {
                openDeleteModal(true)
              }
            }}
            size={18}
            className="text-primary cursor-pointer"
            data-testid={
              deleteButtonTestId ||
              formatTestId('table-actions-delete-button', itemId)
            }
          />
        </Tooltip>
      )}

      {isPendingDeletion && (
        <IconLoader2 className="animate-spin mr-2 h-4 w-4" />
      )}
    </div>
  )
}