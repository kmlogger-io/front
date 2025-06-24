// context/TableContext.tsx
import React, { createContext, useContext, type ReactNode } from 'react';
import type { TableData } from '../stores/useTableStore.store';

interface TableColumn {
  key: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  filterable?: boolean;
  format?: (value: any) => string | number;
  render?: (item: TableData, index: number) => React.ReactNode;
}

interface TableAction {
  label: string;
  icon?: React.ReactNode | ((item: TableData) => React.ReactNode);
  onClick: (item: TableData, rowIndex: number) => void;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: (item: TableData) => boolean;
  size?: 'small' | 'medium' | 'large';
}

interface TableConfig {
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
}

interface TableProviderProps {
  children: ReactNode;
  config: TableConfig;
}

const TableContext = createContext<TableConfig | undefined>(undefined);

export const TableProvider: React.FC<TableProviderProps> = ({ children, config }) => {
  return (
    <TableContext.Provider value={config}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = (): TableConfig => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within TableProvider');
  }
  return context;
};

export type { TableColumn, TableAction, TableConfig, TableProviderProps };