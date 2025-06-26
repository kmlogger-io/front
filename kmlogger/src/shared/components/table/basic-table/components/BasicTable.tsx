import type { useQuery } from '@tanstack/react-query'
import type { AccessorColumnDef } from '@tanstack/react-table'
import { useMutation } from '@tanstack/react-query'
import LoadingQueryBoundary from '../../../query-loading/components/LoadingQueryBoundary'
import { useTable } from '../hooks/useTable'
import { usePaginacaoTabela } from '../../../../hooks/usePagination.hook'
import { GenericTable } from './GenericTable'
import DeleteModal from '../../../modal/delete/DeleteModal'

interface BaseProps<T extends { id: string }> {
  'data-testid'?: string
  'dados': T[]
  'aoEditar'?: (item: T) => void
  'aoVisualizar'?: (item: T) => void
  'colunasExtras': AccessorColumnDef<T, any>[]
  'query': ReturnType<typeof useQuery>
  'tituloIconeExcluir'?: string
  'botoesAdicionaisAcoesTabela'?:
    | React.ReactNode
    | ((id: string | undefined) => React.ReactNode)
  'mostrarBotoes'?: ('editar' | 'excluir' | 'visualizar')[]
  'carregandoQueryClassName'?: string
  'carregandoQueryContainerClassName'?: string
  'deveExibirItemMenu'?: (id: string) => boolean
}

interface PropsComExcluirMutation<T extends { id: string }>
  extends BaseProps<T> {
  excluirMutation: Parameters<typeof useMutation<any, any, any, unknown>>
  aoExcluir?: (id: string) => void
}

interface PropsComAoExcluir<T extends { id: string }> extends BaseProps<T> {
  excluirMutation?: undefined
  aoExcluir: (id: string) => void
}

type Props<T extends { id: string }> =
  | PropsComExcluirMutation<T>
  | PropsComAoExcluir<T>

const excluirMutationPadrao = [{}] as Parameters<
  typeof useMutation<any, any, any, unknown>
>

export function BasicTable<T extends { id: string }>({
  'data-testid': dataTestId,
  carregandoQueryClassName,
  aoEditar,
  aoVisualizar,
  aoExcluir,
  colunasExtras,
  'dados': dadosProps,
  excluirMutation = excluirMutationPadrao,
  query,
  tituloIconeExcluir,
  botoesAdicionaisAcoesTabela,
  carregandoQueryContainerClassName,
  mostrarBotoes,
  deveExibirItemMenu,
}: Props<T>) {
  const {
    dados,
    colunas,
    modalAberta,
    excluir,
    setarModalAberta,
    estaPendenteExcluir,
  } = useTable({
    aoEditar: aoEditar
      ? item => {
          aoEditar(item)
        }
      : undefined,
    aoVisualizar: aoVisualizar
      ? item => {
          aoVisualizar(item)
        }
      : undefined,
    aoExcluir,
    dados: dadosProps,
    excluirMutation: useMutation(...excluirMutation),
    colunasExtras,
    tituloIconeExcluir,
    botoesAdicionaisAcoesTabela,
    mostrarBotoes,
    deveExibirItemMenu,
  })

  const paginacao = usePaginacaoTabela()

  return (
    <LoadingQueryBoundary
      className={carregandoQueryClassName}
      containerClassName={carregandoQueryContainerClassName}
      estaCarregando={query.isPending}
      estaComErro={query.isError}
      erro={query.error as Error}
    >
      <GenericTable
        data-testid={dataTestId}
        className="w-full h-full min-h-0 min-w-0 overflow-y-auto scrollbar-hide sm:scrollbar-show"
        colunas={colunas}
        dados={dados}
        paginacaoManual
        paginacao={paginacao}
      />
      <DeleteModal
        pendenteExclusao={estaPendenteExcluir}
        excluir={excluir}
        modalAberta={modalAberta}
        setarModalAberta={setarModalAberta}
        dataTestIdBotaoExcluir="confirmar-excluir"
      />
    </LoadingQueryBoundary>
  )
}
