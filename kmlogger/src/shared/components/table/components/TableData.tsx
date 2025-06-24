import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useTableStore, type TableData } from '../stores/useTableStore.store';
import { useTableContext } from '../contexts/TableContext';
import TableToolbar from './TableToolBar';
import TableFilters from './TableFilters';
import TableHeader from './TableHeader';
import TableRowComponent from './TableRow';

interface DataTableProps {
  data: TableData[];
  onDataChange?: (data: TableData[]) => void;
  onBulkDelete?: (selectedIds: readonly string[]) => void;
}

const DataTable: React.FC<DataTableProps> = ({ 
  data, 
  onDataChange, 
  onBulkDelete 
}) => {
  const { 
    filteredData, 
    page, 
    rowsPerPage, 
    loading,
    selected,
    setData,
    setPage,
    setRowsPerPage
  } = useTableStore();
  
  useEffect(() => {
    if (data) {
      setData(data);
      onDataChange?.(data);
    }
  }, [data, setData, onDataChange]);
  
  const { 
    dense, 
    stickyHeader, 
    maxHeight, 
    showPagination 
  } = useTableContext();
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  
  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;
  
  const visibleRows = React.useMemo(
    () => filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [filteredData, page, rowsPerPage],
  );
  
  if (loading) {
    return (
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar onBulkDelete={onBulkDelete} />
        <TableFilters />
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableToolbar onBulkDelete={onBulkDelete} />
      <TableFilters />
      
      <TableContainer sx={{ maxHeight: maxHeight }}>
        <Table
          stickyHeader={stickyHeader}
          size={dense ? 'small' : 'medium'}
          aria-labelledby="tableTitle"
        >
          <TableHeader />
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(String(row.id));
              const labelId = `enhanced-table-checkbox-${index}`;
              
              return (
                <TableRowComponent
                  key={row.id || index}
                  row={row}
                  index={page * rowsPerPage + index}
                  isItemSelected={isItemSelected}
                  labelId={labelId}
                />
              );
            })}
            
            {emptyRows > 0 && (
              <TableRowComponent
                key="empty"
                row={{}}
                index={-1}
                isItemSelected={false}
                labelId=""
              />
            )}
          </TableBody>
        </Table>
        
        {visibleRows.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              Nenhum registro encontrado
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tente ajustar os filtros ou adicionar novos dados
            </Typography>
          </Box>
        )}
      </TableContainer>
      
      {showPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
        />
      )}
    </Paper>
  );
};

export default DataTable;