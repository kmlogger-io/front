import { IconLoader, IconTrash } from '@tabler/icons-react'
import { Button } from '../../button/button'
import { ConfirmationModal, type ModalConfirmacaoProps } from '../confirmation/ConfirmationModal'

type Props = Pick<ModalConfirmacaoProps, 'modalAberta' | 'setarModalAberta'> & {
  pendenteExclusao: boolean
  excluir: () => Promise<void> | void
  dataTestIdBotaoExcluir?: string
  dataTestIdModal?: string
}

export default function DeleteModal({
  excluir,
  setarModalAberta,
  modalAberta,
  pendenteExclusao,
  dataTestIdBotaoExcluir,
  dataTestIdModal,
}: Props) {
  return (
    <ConfirmationModal
      data-testid={dataTestIdModal}
      aoContinuar={excluir}
      modalAberta={modalAberta}
      setarModalAberta={setarModalAberta}
      corBackground="bg-extra-destructive"
      corTitulo="text-extra-destructive"
      varianteBotao="destructive"
      iconeTitulo={<IconTrash size={52} className="text-secondary" />}
      titulo="Excluir"
      descricao="A exclusão é irreversível e pode afetar outros serviços. Deseja prosseguir com a ação de excluir?"
      botoes={
        <Button
          variant="extraDestructive"
          data-testid={dataTestIdBotaoExcluir}
          onClick={async () => {
            await excluir()
            setarModalAberta(false)
          }}
          className="px-4 py-2"
        >
          {pendenteExclusao && (
            <IconLoader className="animate-spin mr-2 h-4 w-4" />
          )}
          {!pendenteExclusao && 'Confirmar'}
        </Button>
      }
    />
  )
}
