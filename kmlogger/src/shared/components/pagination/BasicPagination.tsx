import type { PaginationProps, SelectChangeEvent } from '@mui/material'
import type { Table } from '@tanstack/react-table'
import { Box, MenuItem, Pagination, Select } from '@mui/material'
import { isFinite } from 'lodash'
import { useCallback, useEffect } from 'react'

interface Props<T> {
  tabela: Table<T>
  className?: string
  propsPaginacao: PaginationProps
  itensPorPaginaOpcoes?: number[]
}

const opcoesPadroes = [5, 10, 25, 50]

export default function BasicPagination<T>({
  tabela,
  propsPaginacao,
  itensPorPaginaOpcoes = opcoesPadroes,
}: Props<T>) {
  const totalItens = tabela.getRowCount()
  const itensPorPagina = tabela.getState().pagination.pageSize
  const totalPaginas = tabela.getPageCount()
  const indicePagina = tabela.getState().pagination.pageIndex

  const aoMudarPagina = useCallback(
    (_: unknown, page: number) => {
      tabela.setPageIndex(page - 1)
    },
    [tabela]
  )

  useEffect(() => {
    if (!(indicePagina * itensPorPagina >= totalItens)) return

    tabela.setPageIndex(0)
  }, [indicePagina, itensPorPagina, tabela, totalItens])

  const aoMudarItensPorPagina = useCallback(
    (event: SelectChangeEvent) => {
      const { value } = event.target
      const novoValor = Number(value)
      tabela.setPageSize(novoValor)
    },
    [tabela]
  )

  const formatarTextoIndicePaginacao = useCallback(() => {
    if (
      ![totalItens, indicePagina, itensPorPagina, totalPaginas].some(
        valor => !isFinite(valor)
      )
    ) {
      return `${indicePagina * itensPorPagina + 1}-${Math.min(
        (indicePagina + 1) * itensPorPagina,
        totalItens
      )} de ${totalItens}`
    }

    return '0-0 de 0'
  }, [totalItens, indicePagina, itensPorPagina, totalPaginas])

  return (
    <Box className="flex sm:flex-row flex-col items-center justify-between w-full">
      <Box className="flex gap-2 items-center">
        <span className="mr-1">Itens por página</span>
        <Select
          data-testid="itens-por-pagina"
          id="itens-por-pagina"
          value={String(itensPorPagina) as ''}
          onChange={aoMudarItensPorPagina}
          variant="outlined"
          size="small"
        >
          {itensPorPaginaOpcoes.map(opcao => (
            <MenuItem key={opcao} value={String(opcao)}>
              {opcao}
            </MenuItem>
          ))}
        </Select>
        <Box data-testid="total-itens">{formatarTextoIndicePaginacao()}</Box>
      </Box>
      <Pagination
        {...propsPaginacao}
        data-testid="paginacao"
        count={tabela.getPageCount()}
        page={tabela.getState().pagination.pageIndex + 1}
        onChange={(_, pagina) => {
          aoMudarPagina(_, pagina)
        }}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>
  )
}
