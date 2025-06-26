import type { AccessorColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { useSnackbar } from '../../../../hooks/useSnackbar.hook'
import ButtonActions from '../components/ButtonActions'

interface UseTabelaProps<T extends { id: string }> {
  dados: T[]
  colunasExtras: AccessorColumnDef<T, any>[]
  excluirMutation: {
    mutateAsync: (params: { id: string }) => Promise<any>
    isPending: boolean
  }
  aoEditar?: (item: T) => void
  aoVisualizar?: (item: T) => void
  aoExcluir?: (id: string) => void
  aoExcluirSucesso?: () => void
  aoExcluirErro?: (error: any) => void
  tituloIconeExcluir?: string
  deveExibirItemMenu?: (id: string) => boolean
  mostrarBotoes?: ('editar' | 'excluir' | 'visualizar')[]
  botoesAdicionaisAcoesTabela?:
    | React.ReactNode
    | ((id: string | undefined) => React.ReactNode)
}

export function useTable<T extends { id: string }>({
  dados,
  colunasExtras,
  excluirMutation,
  aoEditar,
  aoVisualizar,
  aoExcluir,
  aoExcluirSucesso,
  aoExcluirErro,
  tituloIconeExcluir,
  botoesAdicionaisAcoesTabela,
  deveExibirItemMenu,
  mostrarBotoes = ['editar', 'excluir'],
}: UseTabelaProps<T>) {
  const snackbar = useSnackbar()

  // Estado
  const [modalAberta, setarModalAberta] = useState(false)
  const [idExclusao, setarIdExclusao] = useState<string | undefined>()

  async function visualizar(id: string) {
    const itemParaVisualizar = dados.find(item => item.id === id)
    if (!itemParaVisualizar) {
      console.error('Item para visualizar não encontrado')
      throw new Error('Item para visualizar não encontrado')
    }
    if (aoVisualizar) aoVisualizar(itemParaVisualizar)
  }

  async function editar(id: string) {
    const itemParaEditar = dados.find(item => item.id === id)
    if (!itemParaEditar) {
      throw new Error('Item para editar não encontrado')
    }
    if (aoEditar) aoEditar(itemParaEditar)
  }

  async function excluir(id: string) {
    try {
      await excluirMutation.mutateAsync({ id })
      setarModalAberta(false)
      setarIdExclusao(undefined)
      if (aoExcluir) aoExcluir(id)
      if (aoExcluirSucesso) aoExcluirSucesso()
    } catch (error) {
      if (aoExcluirErro) aoExcluirErro(error)
    }
  }

  function abrirModalExclusao(id: string) {
    setarIdExclusao(id)
    setarModalAberta(true)
  }

  const colunas: AccessorColumnDef<T, any>[] = [
    ...colunasExtras,
    {
      accessorKey: 'id',
      header: 'Ações',
      cell: info => {
        const id = info.getValue() as string

        return (
          <ButtonActions
            idItem={id}
            visualizar={() => {
              visualizar(id)
            }}
            editar={() => {
              editar(id)
            }}
            excluir={() => {
              abrirModalExclusao(id)
            }}
            estaPendenteExclusao={
              excluirMutation.isPending && idExclusao === id
            }
            abrirModalExclusao={() => abrirModalExclusao(id)}
            tituloIconeExcluir={tituloIconeExcluir}
            botoesAdicionaisAcoesTabela={botoesAdicionaisAcoesTabela}
            mostrarBotoes={mostrarBotoes}
            deveExibirItemMenu={
              deveExibirItemMenu ? () => deveExibirItemMenu(id) : undefined
            }
          />
        )
      },
    },
  ]

  return {
    dados,
    colunas,
    modalAberta,
    excluir,
    setarModalAberta,
    estaPendenteExcluir: excluirMutation.isPending,
  }
}
