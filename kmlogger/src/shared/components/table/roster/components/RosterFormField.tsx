import React from 'react';
import {
  TextField,
  FormControl,
  FormLabel,
  Switch,
  FormControlLabel,
  Box,
  FormHelperText
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import DatePicker from '@mui/lab/DatePicker';
import type { RosterColumnConfig } from '../types/roster.types';
import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';

interface RosterFormFieldProps {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  column: RosterColumnConfig;
  disabled?: boolean;
}

export const RosterFormField: React.FC<RosterFormFieldProps> = ({
  field,
  fieldState,
  column,
  disabled = false
}) => {
  const { error } = fieldState;
  const { value, onChange, name } = field;

  const renderField = () => {
    switch (column.type) {
      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(value)}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                name={name}
              />
            }
            label={column.headerName}
          />
        );

      case 'date':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label={column.headerName}
              value={value ? new Date(value) : null}
              onChange={(newValue: any) => onChange(newValue)}
              disabled={disabled}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message
                }
              }}
            />
          </LocalizationProvider>
        );

      case 'number':
        return (
          <TextField
            {...field}
            type="number"
            label={column.headerName}
            fullWidth
            error={!!error}
            helperText={error?.message}
            disabled={disabled}
            InputProps={{
              inputProps: {
                step: column.field.includes('decimal') || column.field.includes('price') ? '0.01' : '1'
              }
            }}
          />
        );

      case 'custom':
        if (column.renderComponent) {
          return (
            <Box>
              <FormLabel component="legend">{column.headerName}</FormLabel>
              {column.renderComponent(value, { [name]: value })}
              {error && (
                <FormHelperText error>{error.message}</FormHelperText>
              )}
            </Box>
          );
        }
        return (
          <TextField
            {...field}
            label={column.headerName}
            fullWidth
            error={!!error}
            helperText={error?.message}
            disabled={disabled}
          />
        );

      default:
        return (
          <TextField
            {...field}
            label={column.headerName}
            fullWidth
            error={!!error}
            helperText={error?.message}
            disabled={disabled}
            multiline={column.field.includes('description') || column.field.includes('comment')}
            rows={column.field.includes('description') || column.field.includes('comment') ? 3 : 1}
          />
        );
    }
  };

  return (
    <FormControl fullWidth error={!!error}>
      {renderField()}
    </FormControl>
  );
};

export default RosterFormField;