import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import type { TableData } from '../stores/useTableStore.store';
import { TableProvider, type TableAction, type TableColumn } from '../contexts/TableContext';
import DataTable from './TableData';
import { customTableTheme } from '../../../../styles/overrides/table-styles';

interface GenericTableProps {
  data: TableData[];
  columns: TableColumn[];
  actions?: TableAction[];
  showFilters?: boolean;
  showSelection?: boolean;
  showPagination?: boolean;
  dense?: boolean;
  stickyHeader?: boolean;
  maxHeight?: number | string;
  title?: string;
  subtitle?: string;
  onDataChange?: (data: TableData[]) => void;
}

const GenericTable: React.FC<GenericTableProps> = ({
  data,
  columns,
  actions,
  showFilters = true,
  showSelection = false,
  showPagination = true,
  dense = false,
  stickyHeader = false,
  maxHeight,
  title,
  subtitle,
  onDataChange,
}) => {
  const config = {
    columns,
    actions,
    showFilters,
    showSelection,
    showPagination,
    dense,
    stickyHeader,
    maxHeight,
    title,
    subtitle
  };

  return (
    <ThemeProvider theme={customTableTheme}>
      <CssBaseline />
      <TableProvider config={config}>
        <DataTable
          data={data}
          onDataChange={onDataChange}
        />
      </TableProvider>
    </ThemeProvider>
  );
};

export default GenericTable;