import type { ReactElement } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import classNames from 'classnames'
import type { ButtonProps } from '../../button/button'
import Modal from '../Modal'
import VisuallyHide from '../../visually-hidden/VisualyHide'
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../../dialog/Dialog'

interface Props {
  'modalOpen': boolean
  'setModalOpen': (val: boolean) => void
  'description': string
  'title': string
  'onContinue': () => void
  'backgroundColor'?: string
  'titleColor'?: string
  'iconColor'?: string
  'buttonVariant'?: ButtonProps['variant']
  'buttons'?: ReactElement<any>
  'titleIcon'?: ReactElement<any>
  'data-testid'?: string
}

export type ModalConfirmacaoProps = Props

export function ConfirmationModal({
  titleIcon,
  buttons,
  iconColor,
  titleColor,
  modalOpen,
  setModalOpen,
  description,
  title,
  onContinue,
  backgroundColor,
  buttonVariant,
  'data-testid': dataTestid,
}: Props) {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent
        data-testid={dataTestid}
        className={classNames(
          'overflow-visible [&>button]:hidden',
          'z-modalPopoverAlert'
        )}
      >
        <VisuallyHide>
          <DialogTitle></DialogTitle>
        </VisuallyHide>
        <Modal
          description={<div className="text-center font-light">{description}</div>}
          titleIcon={titleIcon}
          title={title}
          backgroundColor={backgroundColor}
          iconColor={iconColor}
          titleColor={titleColor}
          buttonVariant={buttonVariant}
          buttons={buttons}
          onContinue={onContinue}
          onClose={() => {
            setModalOpen(false)
          }}
        />
        <DialogFooter>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}