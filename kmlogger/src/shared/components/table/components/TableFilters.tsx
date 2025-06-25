import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Collapse,
  IconButton,
  Box
} from '@mui/material';
import { ExpandMore, ExpandLess, FilterList } from '@mui/icons-material';
import { useTableContext } from '../contexts/TableContext';
import { useTableStore } from '../stores/useTableStore.store';

const TableFilters: React.FC = () => {
  const { columns, showFilters } = useTableContext();
  const { filters, setFilters } = useTableStore();
  const [expanded, setExpanded] = React.useState(false);
  
  if (!showFilters) return null;
  
  const filterableColumns = columns.filter(col => col.filterable);
  
  if (filterableColumns.length === 0) return null;
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };
  
  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const hasActiveFilters = Object.values(filters).some(value => value);
  
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderBottom: expanded ? 1 : 0,
          borderColor: 'divider'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList color={hasActiveFilters ? 'primary' : 'inherit'} />
          <Typography variant="subtitle2" color={hasActiveFilters ? 'primary' : 'inherit'}>
            Filtros {hasActiveFilters && `(${Object.values(filters).filter(Boolean).length} ativos)`}
          </Typography>
        </Box>
        
        <IconButton
          onClick={handleToggleExpand}
          aria-expanded={expanded}
          aria-label="show filters"
          size="small"
        >
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: 2
            }}
          >
            {filterableColumns.map((column) => (
              <TextField
                key={column.key}
                fullWidth
                size="small"
                label={`Filtrar por ${column.label}`}
                value={filters[column.key] || ''}
                onChange={(e) => handleFilterChange(column.key, e.target.value)}
                placeholder={`Digite ${column.label.toLowerCase()}...`}
                variant="outlined"
              />
            ))}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default TableFilters;