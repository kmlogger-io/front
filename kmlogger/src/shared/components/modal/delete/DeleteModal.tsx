import { IconLoader, IconTrash } from '@tabler/icons-react'
import { Button } from '../../button/button'
import { ConfirmationModal, type ModalConfirmacaoProps } from '../confirmation/ConfirmationModal'

type Props = Pick<ModalConfirmacaoProps, 'modalOpen' | 'setModalOpen'> & {
  pendingDeletion: boolean
  delete: () => Promise<void> | void
  deleteButtonTestId?: string
  modalTestId?: string
}

export default function DeleteModal({
  delete: deleteAction,
  setModalOpen,
  modalOpen,
  pendingDeletion,
  deleteButtonTestId,
  modalTestId,
}: Props) {
  return (
    <ConfirmationModal
      data-testid={modalTestId}
      onContinue={() => {
        deleteAction()
        setModalOpen(false)
      }}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      backgroundColor="bg-extra-destructive"
      titleColor="text-extra-destructive"
      buttonVariant="destructive"
      titleIcon={<IconTrash size={52} className="text-secondary" />}
      title="Delete"
      description="Deletion is irreversible and may affect other services. Do you want to proceed with the delete action?"
      buttons={
        <Button
          variant="extraDestructive"
          data-testid={deleteButtonTestId}
          onClick={async () => {
            await deleteAction()
            setModalOpen(false)
          }}
          className="px-4 py-2"
        >
          {pendingDeletion && (
            <IconLoader className="animate-spin mr-2 h-4 w-4" />
          )}
          {!pendingDeletion && 'Confirm'}
        </Button>
      }
    />
  )
}