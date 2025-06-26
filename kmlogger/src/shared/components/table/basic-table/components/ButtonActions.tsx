import { Menu, MenuItem, Tooltip } from '@mui/material'
import {
  IconDotsVertical,
  IconEye,
  IconLoader2,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'
import { useMenu } from '../../../../hooks/useMenu.hook'

type TipoBotao = 'visualizar' | 'editar' | 'excluir'

const BOTOES_PADRAO_MUTAVEL: TipoBotao[] = ['visualizar', 'editar', 'excluir']

function formatarDataTestId(baseTestId: string, idItem?: string): string {
  return idItem ? `${baseTestId}-${idItem}` : baseTestId
}

interface Props {
  idItem?: string
  visualizar?: () => void
  editar?: () => void
  excluir?: () => void
  estaPendenteExclusao: boolean
  abrirModalExclusao: (val: boolean) => void
  botaoVisualizarTestId?: string
  botaoEditarTestId?: string
  botaoExcluirTestId?: string
  mostrarBotoes?: TipoBotao[]
  iconeVisualizar?: React.ComponentType<any>
  iconeEditar?: React.ComponentType<any>
  iconeExcluir?: React.ComponentType<any>
  tituloIconeVisualizar?: string
  tituloIconeEditar?: string
  tituloIconeExcluir?: string
  botoesAdicionaisAcoesTabela?:
    | React.ReactNode
    | ((id: string | undefined) => React.ReactNode)
  deveExibirItemMenu?: () => boolean
}

export default function ButtonActions({
  idItem,
  visualizar,
  editar,
  excluir,
  estaPendenteExclusao,
  abrirModalExclusao,
  botaoVisualizarTestId,
  botaoEditarTestId,
  botaoExcluirTestId,
  mostrarBotoes = BOTOES_PADRAO_MUTAVEL,
  iconeVisualizar: IconeVisualizar = IconEye,
  iconeEditar: IconeEditar = IconPencil,
  iconeExcluir: IconeExcluir = IconTrash,
  tituloIconeVisualizar = 'Visualizar',
  tituloIconeEditar = 'Editar',
  tituloIconeExcluir = 'Excluir',
  botoesAdicionaisAcoesTabela,
  deveExibirItemMenu,
}: Props) {
  const { menuAncora, aoAbrirMenu, aoFecharMenu } = useMenu()

  const menuAberto = menuAncora?.id === idItem

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (idItem) {
      aoAbrirMenu(event, idItem)
    }
  }

  const handleMenuItemClick = (acao: () => void) => {
    acao()
    aoFecharMenu()
  }

  const deveExibirBotao = (botao: TipoBotao): boolean => {
    if (deveExibirItemMenu && !deveExibirItemMenu()) {
      return false
    }

    switch (botao) {
      case 'visualizar':
        return !!visualizar
      case 'editar':
        return !!editar && !estaPendenteExclusao
      case 'excluir':
        return !estaPendenteExclusao
      default:
        return true
    }
  }

  const botoesVisiveis = mostrarBotoes.filter(deveExibirBotao)
  const totalBotoes =
    botoesVisiveis.length + (botoesAdicionaisAcoesTabela ? 1 : 0)
  const usarMenuDropdown = totalBotoes >= 3

  if (usarMenuDropdown) {
    return (
      <div className="flex items-center gap-2 justify-center">
        {estaPendenteExclusao ? (
          <IconLoader2 className="animate-spin mr-2 h-4 w-4" />
        ) : (
          <>
            <Tooltip title="Mais ações" arrow>
              <IconDotsVertical
                role="button"
                size={18}
                className="cursor-pointer"
                onClick={handleClick}
                data-testid={formatarDataTestId(
                  'botao-opcoes-acoes-tabela',
                  idItem
                )}
              />
            </Tooltip>

            {menuAncora?.element && (
              <Menu
                anchorEl={menuAncora.element as HTMLElement}
                open={menuAberto}
                onClose={aoFecharMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {botoesAdicionaisAcoesTabela && (
                  <div className="px-2 py-1">
                    {typeof botoesAdicionaisAcoesTabela === 'function'
                      ? botoesAdicionaisAcoesTabela(idItem)
                      : botoesAdicionaisAcoesTabela}
                  </div>
                )}

                {deveExibirBotao('visualizar') &&
                  mostrarBotoes.includes('visualizar') && (
                    <MenuItem
                      onClick={() => handleMenuItemClick(visualizar!)}
                      data-testid={
                        botaoVisualizarTestId ||
                        formatarDataTestId('menu-item-visualizar', idItem)
                      }
                    >
                      <IconeVisualizar size={16} className="mr-2" />
                      {tituloIconeVisualizar}
                    </MenuItem>
                  )}

                {deveExibirBotao('editar') &&
                  mostrarBotoes.includes('editar') && (
                    <MenuItem
                      onClick={() => handleMenuItemClick(editar!)}
                      data-testid={
                        botaoEditarTestId ||
                        formatarDataTestId('menu-item-editar', idItem)
                      }
                    >
                      <IconeEditar size={16} className="mr-2" />
                      {tituloIconeEditar}
                    </MenuItem>
                  )}

                {deveExibirBotao('excluir') &&
                  mostrarBotoes.includes('excluir') && (
                    <MenuItem
                      onClick={() =>
                        handleMenuItemClick(() => {
                          if (excluir) {
                            excluir()
                          } else {
                            abrirModalExclusao(true)
                          }
                        })
                      }
                      data-testid={
                        botaoExcluirTestId ||
                        formatarDataTestId('menu-item-excluir', idItem)
                      }
                    >
                      <IconeExcluir size={16} className="mr-2" />
                      {tituloIconeExcluir}
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
      {typeof botoesAdicionaisAcoesTabela === 'function'
        ? botoesAdicionaisAcoesTabela(idItem)
        : botoesAdicionaisAcoesTabela}

      {deveExibirBotao('editar') && mostrarBotoes.includes('editar') && (
        <Tooltip title={tituloIconeEditar} arrow>
          <IconeEditar
            role="button"
            onClick={editar}
            size={18}
            className="text-primary cursor-pointer"
            data-testid={
              botaoEditarTestId ||
              formatarDataTestId('botao-acoes-tabela-editar', idItem)
            }
          />
        </Tooltip>
      )}

      {deveExibirBotao('excluir') && mostrarBotoes.includes('excluir') && (
        <Tooltip title={tituloIconeExcluir} arrow>
          <IconeExcluir
            role="button"
            onClick={() => {
              if (excluir) {
                excluir()
              } else {
                abrirModalExclusao(true)
              }
            }}
            size={18}
            className="text-primary cursor-pointer"
            data-testid={
              botaoExcluirTestId ||
              formatarDataTestId('botao-acoes-tabela-excluir', idItem)
            }
          />
        </Tooltip>
      )}

      {estaPendenteExclusao && (
        <IconLoader2 className="animate-spin mr-2 h-4 w-4" />
      )}
    </div>
  )
}
