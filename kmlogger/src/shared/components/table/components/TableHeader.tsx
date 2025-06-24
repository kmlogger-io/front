// components/Table/TableHeader.tsx
import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
  Box
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useTableStore } from '../stores/useTableStore.store';
import { useTableContext } from '../contexts/TableContext';

const TableHeader: React.FC = () => {
  const { columns, showSelection, actions } = useTableContext();
  const { 
    sortColumn, 
    sortDirection, 
    setSorting, 
    selected, 
    filteredData, 
    toggleSelectAll 
  } = useTableStore();
  
  const allIds = filteredData.map(item => String(item.id)).filter(Boolean);
  const isAllSelected = allIds.length > 0 && allIds.every(id => selected.includes(id));
  const isIndeterminate = selected.length > 0 && !isAllSelected;
  
  const createSortHandler = (property: string) => () => {
    setSorting(property);
  };
  
  return (
    <TableHead>
      <TableRow>
        {showSelection && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={isIndeterminate}
              checked={isAllSelected}
              onChange={toggleSelectAll}
              inputProps={{
                'aria-label': 'select all items',
              }}
            />
          </TableCell>
        )}
        
        {columns.map((column) => (
          <TableCell
            key={column.key}
            align={column.align}
            padding="normal"
            sortDirection={sortColumn === column.key ? sortDirection : false}
            style={{ 
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
              width: column.width 
            }}
          >
            {column.sortable ? (
              <TableSortLabel
                active={sortColumn === column.key}
                direction={sortColumn === column.key ? sortDirection : 'asc'}
                onClick={createSortHandler(column.key)}
              >
                {column.label}
                {sortColumn === column.key ? (
                  <Box component="span" sx={visuallyHidden}>
                    {sortDirection === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
        
        {actions && actions.length > 0 && (
          <TableCell align="center">
            Ações
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;