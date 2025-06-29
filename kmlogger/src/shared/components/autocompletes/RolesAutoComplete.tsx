import React from 'react';
import {
  Autocomplete,
  TextField,
  Chip,
  Box,
  CircularProgress,
  FormHelperText
} from '@mui/material';
import { AdminPanelSettings, Person } from '@mui/icons-material';
import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import type { DomainRecordsDtosRoleDto } from '../../../client/src';

interface RolesAutocompleteProps {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  roles: DomainRecordsDtosRoleDto[];
  loading?: boolean;
  disabled?: boolean;
}

export const RolesAutocomplete: React.FC<RolesAutocompleteProps> = ({
  field,
  fieldState,
  roles,
  loading = false,
  disabled = false
}) => {
  const { error } = fieldState;
  const { value = [], onChange } = field;

  const selectedRoles = roles.filter(role => value.includes(role.id));

  const handleChange = (_: any, newValue: DomainRecordsDtosRoleDto[]) => {
    const newRoleIds = newValue.map(role => role.id);
    onChange(newRoleIds);
  };

  return (
    <Box>
      <Autocomplete
        multiple
        value={selectedRoles}
        onChange={handleChange}
        options={roles}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        disabled={disabled || loading}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Perfis do Usuário *"
            placeholder="Selecione os perfis..."
            error={!!error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              key={option.id}
              size="small"
              color={option.name.toLowerCase().includes('admin') ? 'error' : 'primary'}
              icon={option.name.toLowerCase().includes('admin') ? <AdminPanelSettings /> : <Person />}
            />
          ))
        }
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.id}>
            <Box display="flex" alignItems="center" gap={1}>
              {option.name.toLowerCase().includes('admin') ? (
                <AdminPanelSettings color="error" fontSize="small" />
              ) : (
                <Person color="primary" fontSize="small" />
              )}
              <Box>
                <div>{option.name}</div>
                <div style={{ fontSize: '0.8em', color: 'gray' }}>
                  {option.slug}
                </div>
              </Box>
            </Box>
          </Box>
        )}
        sx={{
          '& .MuiAutocomplete-tag': {
            margin: '2px'
          }
        }}
        noOptionsText="Nenhum perfil encontrado"
        loadingText="Carregando perfis..."
      />
      {error && (
        <FormHelperText error sx={{ ml: 2 }}>
          {error.message}
        </FormHelperText>
      )}
    </Box>
  );
};
