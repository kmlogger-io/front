// components/Table/TableRowComponent.tsx
import React from 'react';
import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Button,
  Stack,
  Tooltip
} from '@mui/material';
import { useTableStore, type TableData } from '../stores/useTableStore.store';
import { useTableContext, type TableColumn } from '../contexts/TableContext';

interface TableRowComponentProps {
  row: TableData;
  index: number;
  isItemSelected: boolean;
  labelId: string;
}

const TableRowComponent: React.FC<TableRowComponentProps> = ({
  row,
  index,
  isItemSelected,
  labelId
}) => {
  const { columns, actions, showSelection } = useTableContext();
  const { selectOne } = useTableStore();
  
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    if (showSelection) {
      selectOne(id, !isItemSelected);
    }
  };
  
  const renderCellContent = (column: TableColumn, row: TableData) => {
    if (column.render) {
      return column.render(row, index);
    }
    
    const value = row[column.key];
    
    if (column.format) {
      return column.format(value);
    }
    
    return value;
  };
  
  return (
    <TableRow
      hover
      onClick={showSelection ? (event) => handleClick(event, String(row.id)) : undefined}
      role={showSelection ? "checkbox" : undefined}
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
      sx={{ cursor: showSelection ? 'pointer' : 'default' }}
    >
      {showSelection && (
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>
      )}
      
      {columns.map((column) => (
        <TableCell
          key={column.key}
          align={column.align}
          style={{ 
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
            width: column.width 
          }}
        >
          {renderCellContent(column, row)}
        </TableCell>
      ))}
      
      {actions && actions.length > 0 && (
        <TableCell align="center">
          <Stack direction="row" spacing={1} justifyContent="center">
            {actions.map((action, actionIndex) => (
              <Tooltip key={actionIndex} title={action.label}>
                {action.icon ? (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick(row, index);
                    }}
                    color={action.color || 'primary'}
                    size={action.size || 'small'}
                    disabled={action.disabled?.(row)}
                  >
                    {action.icon}
                  </IconButton>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick(row, index);
                    }}
                    color={action.color || 'primary'}
                    variant={action.variant || 'text'}
                    size={action.size || 'small'}
                    disabled={action.disabled?.(row)}
                  >
                    {action.label}
                  </Button>
                )}
              </Tooltip>
            ))}
          </Stack>
        </TableCell>
      )}
    </TableRow>
  );
};

export default TableRowComponent;