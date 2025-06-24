import React from 'react';
import type { TableData } from '../stores/useTableStore.store';
import { TableProvider, type TableAction, type TableColumn } from '../contexts/TableContext';
import DataTable from './TableData';

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
  onBulkDelete?: (selectedIds: readonly string[]) => void;
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
  onBulkDelete
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
    <TableProvider config={config}>
      <DataTable 
        data={data} 
        onDataChange={onDataChange}
        onBulkDelete={onBulkDelete}
      />
    </TableProvider>
  );
};

export default GenericTable;