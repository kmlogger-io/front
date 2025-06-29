import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  CircularProgress
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { RosterModalProps } from '../types/roster.types';
import { RosterFormField } from './RosterFormField';

export function RosterFormModal<T extends Record<string, any>>({
  open,
  action,
  data,
  entity,
  onClose,
  onSubmit,
  loading = false
}: RosterModalProps<T>) {
  const isReadOnly = action === 'view';
  const isEditing = action === 'edit';
  const isCreating = action === 'create';

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<T>({
    resolver: zodResolver(entity.schema),
    defaultValues: (data as import('react-hook-form').DefaultValues<T>) || ({} as import('react-hook-form').DefaultValues<T>),
    mode: 'onChange'
  });

  useEffect(() => {
    if (open) {
      reset(data || ({} as T));
    }
  }, [open, data, reset]);

  const getModalTitle = (): string => {
    const actions: Record<typeof action, string> = {
        create: 'Criar Novo',
        edit: 'Editar',
        view: 'Visualizar',
        delete: ''
    };
    return actions[action] ?? 'Modal';
  };

  const handleFormSubmit = async (formData: T) => {
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao submeter formulário:', error);
    }
  };

  const shouldShowSubmitButton = !isReadOnly;
  const submitButtonText = isCreating ? 'Criar' : 'Salvar';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { minHeight: '400px' }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            {getModalTitle()}
          </Typography>
          <IconButton
            aria-label="fechar"
            onClick={onClose}
            size="small"
            disabled={loading || isSubmitting}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            {entity.columns
              .filter(column => column.field !== entity.idField)
              .map((column) => (
                <Controller
                  key={column.field}
                  name={column.field as import('react-hook-form').Path<T>}
                  control={control}
                  render={({ field, fieldState }) => (
                    <RosterFormField
                      field={field}
                      fieldState={fieldState}
                      column={column}
                      disabled={isReadOnly || loading || isSubmitting}
                    />
                  )}
                />
              ))}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            disabled={loading || isSubmitting}
          >
            {isReadOnly ? 'Fechar' : 'Cancelar'}
          </Button>
          
          {shouldShowSubmitButton && (
            <Button
              type="submit"
              variant="contained"
              disabled={loading || isSubmitting || (isEditing && !isDirty)}
              startIcon={
                (loading || isSubmitting) && (
                  <CircularProgress size={16} />
                )
              }
            >
              {submitButtonText}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default RosterFormModal;