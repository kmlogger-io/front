import React from 'react';
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Box,
  alpha
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useTableStore } from '../stores/useTableStore.store';
import { useTableContext } from '../contexts/TableContext';

const TableToolbar = () => {
  const { selected } = useTableStore();
  const { title, subtitle, showSelection } = useTableContext();
  
  const numSelected = selected.length;
  
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selecionado(s)
        </Typography>
      ) : (
        <Box sx={{ flex: '1 1 100%' }}>
          {title && (
            <Typography
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
    </Toolbar>
  );
};

export default TableToolbar;