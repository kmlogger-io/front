'use client'
import type {
  Column,
  ColumnDef,
  ColumnMeta,
  PaginationState,
  RowData,
  TableOptions,
} from '@tanstack/react-table'
import type { CSSProperties } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { IconLoader3 } from '@tabler/icons-react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import classNames from 'classnames'
import { useEffect } from 'react'
import { BaseTable, BaseTableBody, BaseTableCell, BaseTableHead, BaseTableHeader, BaseTableRow } from '../../BaseTable'
import { Card } from '../../../card/card'
import BasicPagination from '../../../pagination/BasicPagination'
import type { PaginacaoTipo } from '../../../../hooks/usePagination.hook'

interface TabelaGenericaProps<T> {
  'dados': T[]
  'colunas': ColumnDef<T, any>[]
  'itensPorPagina'?: number
  'indicePagina'?: number
  'mostrarPaginacao'?: boolean
  'mensagemSemDados'?: string
  'className'?: string
  'tableClassName'?: string
  'data-testid'?: string
  'carregando'?: boolean
  'aoMudarPaginacao'?: (paginacao: PaginationState) => void
  'paginacaoManual'?: boolean
  'totalItens'?: number
  'deveRenderizarCompacto'?: boolean
  'paginacao'?: PaginacaoTipo & {
    aoMudarPaginacao?: (paginacao: PaginationState) => void
  }
}

type CustomColumnMeta = ColumnMeta<any, any> & {
  tipoDados?: 'numero' | 'data' | 'icone' | string
  alinhamento?: 'left' | 'right' | 'center'
}

function obterAlinhamentoPeloMeta(
  meta?: CustomColumnMeta
): 'left' | 'right' | 'center' {
  if (!meta) return 'left'

  const { tipoDados, alinhamento } = meta
  if (alinhamento) return alinhamento

  switch (tipoDados) {
    case 'numero':
      return 'right'
    case 'data':
      return 'center'
    case 'icone':
      return 'center'
    default:
      return 'left'
  }
}

function obterEstiloColuna(coluna: Column<any>): CSSProperties {
  const estaFixada = coluna.getIsPinned()
  const estaFixadaEsquerda =
    estaFixada === 'left' && coluna.getIsLastColumn('left')
  const estaFixadaDireita =
    estaFixada === 'right' && coluna.getIsFirstColumn('right')
  const ehPrimeiraColuna = coluna.getIsFirstColumn()
  const ehUltimaColuna = coluna.getIsLastColumn()
  const ehColunaAcoes = coluna.columnDef.header === 'Ações'
  const tamanhoColuna = ehColunaAcoes ? 80 : coluna.getSize()
  const tamanhoPadrao = 150
  const tamanhoMaximo =
    tamanhoColuna === tamanhoPadrao
      ? undefined
      : tamanhoColuna + (ehUltimaColuna || ehPrimeiraColuna ? 30 : 0)
  const alinhamento = estaFixada
    ? 'center'
    : obterAlinhamentoPeloMeta(coluna.columnDef.meta)

  return {
    boxShadow: estaFixadaEsquerda
      ? '-1px -1px 1px -1px gray inset'
      : estaFixadaDireita
        ? '1px 0 -1px -1px gray inset'
        : undefined,
    left: estaFixada === 'left' ? `${coluna.getStart('left')}px` : undefined,
    right: estaFixada === 'right' ? `${coluna.getAfter('right')}px` : undefined,
    position: estaFixada ? 'sticky' : 'relative',
    zIndex: estaFixada ? 1 : 0,
    width: tamanhoMaximo,
    minWidth: tamanhoColuna,
    maxWidth: tamanhoMaximo,
    paddingLeft: ehPrimeiraColuna ? '45px' : '1rem',
    paddingRight: ehUltimaColuna ? '45px' : '1rem',
    textAlign: alinhamento,
  }
}

const mensagemSemDadosPadrao = "Nenhum dado encontrado"

export function GenericTable<T>({
  paginacao,
  dados,
  colunas,
  indicePagina = paginacao?.indicePagina ?? 0,
  itensPorPagina = paginacao?.itensPorPagina ?? 10,
  totalItens = paginacao?.totalItens,
  mostrarPaginacao = true,
  mensagemSemDados = mensagemSemDadosPadrao,
  className,
  tableClassName,
  carregando = false,
  aoMudarPaginacao = paginacao?.aoMudarPaginacao,
  'data-testid': dataTestId,
  paginacaoManual = false,
  deveRenderizarCompacto = false,
}: TabelaGenericaProps<T>) {
  const ehMobile = useMediaQuery('(max-width: 768px)')

  const paginacaoManualOpcoes: Pick<
    TableOptions<RowData>,
    'onPaginationChange' | 'state' | 'manualPagination'
  > = {
    onPaginationChange: pagination =>
      aoMudarPaginacao?.(pagination as PaginationState),
    state: {
      pagination: { pageIndex: indicePagina, pageSize: itensPorPagina },
    },
    manualPagination: paginacaoManual,
  }

  const paginacaoAutomaticaOpcoes: Pick<
    TableOptions<RowData>,
    'initialState'
  > = {
    initialState: {
      pagination: {
        pageIndex: indicePagina,
        pageSize: itensPorPagina,
      },
    },
  }

  const tabela = useReactTable({
    data: dados,
    columns: colunas,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    rowCount: totalItens,
    columnResizeMode: 'onChange',
    ...(paginacaoManual ? paginacaoManualOpcoes : paginacaoAutomaticaOpcoes),
  })

  useEffect(() => {
    const colunasTabela = tabela.getAllColumns().filter(c => c.getIsVisible())
    colunasTabela.forEach(coluna => {
      if (coluna.columnDef.header === 'Ações') coluna.pin('right')
    })
  }, [tabela])

  if (ehMobile || deveRenderizarCompacto) {
    return (
      <Box
        data-testid={dataTestId}
        className={classNames('space-y-4', className)}
      >
        {tabela.getRowModel().rows.length > 0 ? (
          <>
            {tabela.getRowModel().rows.map(linha => (
              <Card key={linha.id} className="p-4">
                <Box className="space-y-2">
                  {linha.getVisibleCells().map(celula => {
                    const header = celula.column.columnDef.header
                    const headerContent =
                      typeof header === 'function' ? header({} as any) : header

                    return (
                      <Box key={celula.id} className="grid grid-cols-2 gap-2">
                        <Box className="text-sm font-medium text-gray-500">
                          {headerContent}
                        </Box>
                        <Box className="text-sm flex items-center justify-center">
                          {flexRender(
                            celula.column.columnDef.cell,
                            celula.getContext()
                          )}
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              </Card>
            ))}
          </>
        ) : (
          <Box className="text-center p-4">{mensagemSemDados}</Box>
        )}

        {mostrarPaginacao && (
          <Box className="flex justify-center py-4">
            <BasicPagination
              tabela={tabela}
              propsPaginacao={{
                size: 'small',
                classes: { ul: 'justify-center' },
              }}
            />
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Box
      data-testid={dataTestId}
      className={classNames('rounded-3xl border flex flex-col', className)}
    >
      <Box className="overflow-x-auto m-[3px]">
        <BaseTable
          className={classNames('h-full min-h-0 flex-shrink ', tableClassName)}
        >
          <BaseTableHeader>
            {tabela.getHeaderGroups().map(grupoCabecalho => (
              <BaseTableRow key={grupoCabecalho.id} className="group">
                {grupoCabecalho.headers.map(cabecalho => (
                  <BaseTableHead
                    key={cabecalho.id}
                    colSpan={cabecalho.colSpan}
                    style={{
                      ...(ehMobile ? {} : obterEstiloColuna(cabecalho.column)),
                    }}
                    className="group-hover:bg-muted bg-white"
                  >
                    {cabecalho.isPlaceholder
                      ? null
                      : flexRender(
                          cabecalho.column.columnDef.header,
                          cabecalho.getContext()
                        )}
                  </BaseTableHead>
                ))}
              </BaseTableRow>
            ))}
          </BaseTableHeader>
          <BaseTableBody>
            {carregando ? (
              <BaseTableRow>
                <BaseTableCell
                  colSpan={colunas.length}
                  className="h-24 text-center"
                >
                  <IconLoader3 className="animate-spin" size={24} />
                </BaseTableCell>
              </BaseTableRow>
            ) : tabela.getRowModel().rows.length > 0 ? (
              tabela.getRowModel().rows.map(linha => (
                <BaseTableRow
                  data-testid="linha-tabela"
                  key={linha.id}
                  className="group"
                >
                  {linha.getVisibleCells().map(celula => (
                    <BaseTableCell
                      key={celula.id}
                      style={{
                        ...(ehMobile ? {} : obterEstiloColuna(celula.column)),
                      }}
                      className="group-hover:bg-muted bg-white"
                    >
                      {flexRender(
                        celula.column.columnDef.cell,
                        celula.getContext()
                      )}
                    </BaseTableCell>
                  ))}
                </BaseTableRow>
              ))
            ) : (
              <BaseTableRow>
                <BaseTableCell
                  colSpan={colunas.length}
                  className="h-24 text-center"
                >
                  {mensagemSemDados}
                </BaseTableCell>
              </BaseTableRow>
            )}
          </BaseTableBody>
        </BaseTable>
      </Box>

      {mostrarPaginacao && (
        <Box className="flex flex-grow px-4">
          <BasicPagination
            tabela={tabela}
            propsPaginacao={{
              classes: { ul: 'justify-end' },
              className: 'py-4',
            }}
          />
        </Box>
      )}
    </Box>
  )
}
