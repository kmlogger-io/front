import type { ReactElement } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import classNames from 'classnames'
import type { ButtonProps } from '../../button/button'
import Modal from '../Modal'
import VisuallyHide from '../../visually-hidden/VisualyHide'
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../../dialog/Dialog'

interface Props {
  'modalAberta': boolean
  'setarModalAberta': (val: boolean) => void
  'descricao': string
  'titulo': string
  'aoContinuar': () => void
  'corBackground'?: string
  'corTitulo'?: string
  'corIcone'?: string
  'varianteBotao'?: ButtonProps['variant']
  'botoes'?: ReactElement<any>
  'iconeTitulo'?: ReactElement<any>
  'data-testid'?: string
}

export type ModalConfirmacaoProps = Props

export function ConfirmationModal({
  iconeTitulo,
  botoes,
  corIcone,
  corTitulo,
  modalAberta,
  setarModalAberta,
  descricao,
  titulo,
  aoContinuar,
  corBackground,
  varianteBotao,
  'data-testid': dataTestid,
}: Props) {
  return (
    <Dialog open={modalAberta} onOpenChange={setarModalAberta}>
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
          descricao={<div className="text-center font-light">{descricao}</div>}
          iconeTitulo={iconeTitulo}
          titulo={titulo}
          corBackground={corBackground}
          corIcone={corIcone}
          corTitulo={corTitulo}
          varianteBotao={varianteBotao}
          botoes={botoes}
          aoContinuar={aoContinuar}
          aoFechar={() => {
            setarModalAberta(false)
          }}
        />
        <DialogFooter>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
