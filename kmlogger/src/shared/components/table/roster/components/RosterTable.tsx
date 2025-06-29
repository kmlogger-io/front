import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
  type GridRowParams
} from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useRoster } from '../contexts/RosterContext';
import type { QueryParams, RosterAction, RosterTableProps } from '../types/roster.types';
import { RosterFormModal } from './RosterFormModal';
import RosterDeleteModal from './RosterDeleteConfirmationModal';

export function RosterTable<T extends Record<string, any>>({
  entity,
  queryFunction,
  permissions = {},
  mutations = {},
  title,
  subtitle,
  initialPage = 0,
  initialPageSize = 10,
  modalCustomization 
}: RosterTableProps<T>) {
  const { pagination: contextPagination, setPagination } = useRoster();
  
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: initialPage,
    pageSize: initialPageSize
  });

  const isFirstRender = useRef(true);
  const lastQueryData = useRef<any>(null);

  const [modalState, setModalState] = useState<{
    open: boolean;
    action: RosterAction;
    data?: T;
  }>({ open: false, action: 'view' });
  
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    item?: T;
  }>({ open: false });

  const [actionLoading, setActionLoading] = useState(false);

  const {
    allowView = true,
    allowEdit = true,
    allowCreate = true,
    allowDelete = true,
    showDeleteModal = true
  } = permissions;

  const queryResult = queryFunction(queryParams);
  const { data: queryData, isLoading, isError, error, refetch } = queryResult;

  useEffect(() => {
    if (queryData && queryData !== lastQueryData.current) {
      lastQueryData.current = queryData;
      
      const newPagination = {
        page: queryData.page,
        pageSize: queryData.pageSize,
        total: queryData.totalCount
      };
      
      if (
        contextPagination.page !== newPagination.page ||
        contextPagination.pageSize !== newPagination.pageSize ||
        contextPagination.total !== newPagination.total
      ) {
        setPagination(newPagination);
      }
    }
  }, [queryData, setPagination, contextPagination.page, contextPagination.pageSize, contextPagination.total]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      
      if (contextPagination.page !== initialPage || contextPagination.pageSize !== initialPageSize) {
        setQueryParams({
          page: contextPagination.page,
          pageSize: contextPagination.pageSize
        });
      }
    }
  }, []);

  const columns: GridColDef[] = useMemo(() => {
    const baseColumns: GridColDef[] = entity.columns.map((column) => ({
      field: column.field,
      headerName: column.headerName,
      width: column.width || 150,
      sortable: column.sortable ?? true,
      filterable: column.filterable ?? true,
      renderCell: column.renderCell || ((params) => {
        if (column.renderComponent) {
          return column.renderComponent(params.value, params.row);
        }
        
        if (column.type === 'boolean') {
          return (
            <Chip
              label={params.value ? 'Sim' : 'Não'}
              color={params.value ? 'success' : 'default'}
              size="small"
            />
          );
        }
        
        if (column.type === 'date' && params.value) {
          return new Date(params.value).toLocaleDateString('pt-BR');
        }
        
        return params.value;
      })
    }));

    const hasActions = allowView || allowEdit || allowDelete;
    if (hasActions) {
      baseColumns.push({
        field: 'actions',
        type: 'actions',
        headerName: 'Ações',
        width: 120,
        getActions: (params: GridRowParams<T>) => {
          const actions = [];

          if (allowView) {
            actions.push(
              <GridActionsCellItem
                icon={<Tooltip title="Visualizar"><ViewIcon /></Tooltip>}
                label="Visualizar"
                onClick={() => handleOpenModal('view', params.row)}
              />
            );
          }

          if (allowEdit) {
            actions.push(
              <GridActionsCellItem
                icon={<Tooltip title="Editar"><EditIcon /></Tooltip>}
                label="Editar"
                onClick={() => handleOpenModal('edit', params.row)}
              />
            );
          }

          if (allowDelete) {
            actions.push(
              <GridActionsCellItem
                icon={<Tooltip title="Excluir"><DeleteIcon /></Tooltip>}
                label="Excluir"
                onClick={() => handleDelete(params.row)}
                showInMenu
              />
            );
          }

          return actions;
        }
      });
    }

    return baseColumns;
  }, [entity, allowView, allowEdit, allowDelete]);

  const handleOpenModal = (action: RosterAction, data?: T) => {
    setModalState({ open: true, action, data });
  };

  const handleCloseModal = () => {
    setModalState({ open: false, action: 'view' });
  };

  const handleDelete = (item: T) => {
    if (showDeleteModal) {
      setDeleteModal({ open: true, item });
    } else {
      confirmDelete(item);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({ open: false });
  };

  const confirmDelete = async (item?: T) => {
    if (!item || !mutations.delete) return;

    setActionLoading(true);
    try {
      const itemId = item[entity.idField];
      await mutations.delete(itemId);
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmit = async (data: T) => {
    const { action } = modalState;
    setActionLoading(true);

    try {
      if (action === 'create' && mutations.create) {
        await mutations.create(data);
      } else if (action === 'edit' && mutations.update && modalState.data) {
        const itemId = modalState.data[entity.idField];
        await mutations.update(itemId, data);
      }
    } catch (error) {
      console.error('Erro ao submeter formulário:', error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  };

  const handlePaginationModelChange = (paginationModel: { page: number; pageSize: number }) => {
    const newParams = {
      ...queryParams,
      page: paginationModel.page,
      pageSize: paginationModel.pageSize
    };
    
    if (queryParams.page !== newParams.page || queryParams.pageSize !== newParams.pageSize) {
      setQueryParams(newParams);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const getItemDisplayName = (item: T): string => {
    if (entity.displayField) {
      return String(item[entity.displayField]);
    }
    return String(item[entity.idField]);
  };

  if (isError) {
    return (
      <Paper elevation={1} sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          action={
            <Button onClick={handleRefresh} size="small">
              Tentar Novamente
            </Button>
          }
        >
          Erro ao carregar dados: {error?.message || 'Erro desconhecido'}
        </Alert>
      </Paper>
    );
  }

  const currentData = queryData?.data || [];
  const currentTotal = queryData?.totalCount || 0;

  return (
    <Paper elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* ✅ Header condicional - só mostra se tiver title */}
      {title && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" component="h2" gutterBottom>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle} {currentTotal > 0 && `(${currentTotal} registros)`}
                </Typography>
              )}
            </Box>
            
            <Box display="flex" gap={1}>
              <Tooltip title="Atualizar">
                <IconButton onClick={handleRefresh} disabled={isLoading}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              
              {allowCreate && mutations.create && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenModal('create')}
                  disabled={isLoading}
                >
                  Novo
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      )}

      {/* DataGrid */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <DataGrid
          rows={currentData}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row[entity.idField]}
          paginationMode="server"
          paginationModel={{
            page: queryParams.page,
            pageSize: queryParams.pageSize
          }}
          onPaginationModelChange={handlePaginationModelChange}
          rowCount={currentTotal}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none'
            }
          }}
        />
      </Box>

      <RosterFormModal
        open={modalState.open}
        action={modalState.action}
        data={modalState.data}
        entity={entity}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        loading={actionLoading}
        modalCustomization={modalCustomization} 
      />

      <RosterDeleteModal
        open={deleteModal.open}
        itemName={deleteModal.item ? getItemDisplayName(deleteModal.item) : ''}
        onClose={handleCloseDeleteModal}
        onConfirm={() => confirmDelete(deleteModal.item)}
        loading={actionLoading}
      />
    </Paper>
  );
}