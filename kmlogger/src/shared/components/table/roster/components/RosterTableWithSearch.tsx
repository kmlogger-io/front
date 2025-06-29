import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Chip,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { RosterTable } from './RosterTable';
import type { RosterTableProps } from '../types/roster.types';
import RosterFormModal from './RosterFormModal';

interface RosterTableWithSearchProps<T> extends RosterTableProps<T> {
  searchPlaceholder?: string;
  onSearch?: (searchTerm: string) => void;
  searchValue?: string;
  extraFilters?: React.ReactNode;
}

export function RosterTableWithSearch<T extends Record<string, any>>({
  title,
  subtitle,
  searchPlaceholder = "Buscar...",
  onSearch,
  searchValue = "",
  extraFilters,
  permissions = {},
  mutations = {},
  modalCustomization,
  ...rosterProps
}: RosterTableWithSearchProps<T>) {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);
  
  // ✅ ESTADO DO MODAL MOVIDO PARA CÁ
  const [modalState, setModalState] = useState<{
    open: boolean;
    action: 'create' | 'edit' | 'view';
    data?: T;
  }>({ open: false, action: 'view' });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSearchValue(value);
    onSearch?.(value);
  };

  const handleClearSearch = () => {
    setLocalSearchValue("");
    onSearch?.("");
  };

  const { allowCreate } = permissions;

  const firstQueryResult = rosterProps.queryFunction({
    page: 0,
    pageSize: rosterProps.initialPageSize || 10
  });

  const { data: queryData, refetch } = firstQueryResult;
  const currentTotal = queryData?.totalCount || 0;

  // ✅ HANDLER PARA ABRIR MODAL
  const handleOpenCreateModal = () => {
    setModalState({ open: true, action: 'create', data: undefined });
  };

  const handleCloseModal = () => {
    setModalState({ open: false, action: 'view', data: undefined });
  };

  // ✅ HANDLER PARA SUBMIT DO MODAL
  const handleModalSubmit = async (data: T) => {
    try {
      if (modalState.action === 'create' && mutations.create) {
        await mutations.create(data);
      } else if (modalState.action === 'edit' && mutations.update && modalState.data) {
        const itemId = modalState.data[rosterProps.entity.idField];
        await mutations.update(itemId, data);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao submeter modal:', error);
    }
  };

  return (
    <Paper elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header com botão criar */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            {title && (
              <Typography variant="h6" component="h2" gutterBottom>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle} {currentTotal > 0 && `(${currentTotal} registros)`}
              </Typography>
            )}
          </Box>
          
          {/* ✅ BOTÃO CRIAR SEMPRE VISÍVEL */}
          <Box display="flex" gap={1}>
            <Tooltip title="Atualizar">
              <IconButton onClick={() => refetch()}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            
            {allowCreate && mutations.create && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenCreateModal} // ✅ FUNÇÃO PRÓPRIA
              >
                Novo
              </Button>
            )}
          </Box>
        </Box>

        {/* Barra de busca */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
          <TextField
            placeholder={searchPlaceholder}
            value={localSearchValue}
            onChange={handleSearchChange}
            size="small"
            sx={{ minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: localSearchValue && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="limpar busca"
                    onClick={handleClearSearch}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {extraFilters}
          
          {localSearchValue && (
            <Chip
              label={`Busca: "${localSearchValue}"`}
              onDelete={handleClearSearch}
              size="small"
              color="primary"
            />
          )}
        </Stack>
      </Box>

      {/* ✅ RosterTable SEM funcionalidade de modal (evita conflito) */}
      <Box sx={{ flexGrow: 1 }}>
        <RosterTable
          {...rosterProps}
          permissions={{ ...permissions, allowCreate: false }} // ✅ Desabilitar create no RosterTable
          mutations={{
            ...mutations,
            create: undefined // ✅ Remover create para evitar botão duplicado
          }}
          modalCustomization={modalCustomization}
          // Sem title para evitar header duplicado
        />
      </Box>

      {modalCustomization && (
        <RosterFormModal
          open={modalState.open}
          action={modalState.action}
          data={modalState.data}
          entity={rosterProps.entity}
          onClose={handleCloseModal}
          onSubmit={handleModalSubmit}
          modalCustomization={modalCustomization}
        />
      )}
    </Paper>
  );
}