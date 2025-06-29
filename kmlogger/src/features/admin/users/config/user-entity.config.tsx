import React from 'react';
import { Chip, Avatar, Box, Typography } from '@mui/material';
import { AdminPanelSettings, Person, PersonOff } from '@mui/icons-material';
import type { RosterEntity } from '../../../../shared/components/table/roster/types/roster.types';
import type { DomainRecordsDtosRoleDto } from '../../../../client/src';
import { userFormSchema, type UserFormInput } from '../schemas/user.schema';

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Função para formatar data
const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const renderUserRoles = (userData: any) => {
  let roles: DomainRecordsDtosRoleDto[] = [];
  
  if (userData.roles && Array.isArray(userData.roles)) {
    roles = userData.roles;
  } else if (userData.roleIds && Array.isArray(userData.roleIds)) {
    return (
      <Box display="flex" gap={0.5} flexWrap="wrap">
        {userData.roleIds.map((roleId: string) => (
          <Chip
            key={roleId}
            label={`Role ${roleId.substring(0, 8)}...`}
            size="small"
            color="primary"
            icon={<Person />}
          />
        ))}
      </Box>
    );
  }

  if (!roles || roles.length === 0) {
    return <Chip label="Sem perfil" size="small" variant="outlined" />;
  }

  return (
    <Box display="flex" gap={0.5} flexWrap="wrap">
      {roles.map((role) => (
        <Chip
          key={role.id}
          label={role.name} 
          size="small"
          color={role.name.toLowerCase().includes('admin') ? 'error' : 'primary'}
          icon={role.name.toLowerCase().includes('admin') ? <AdminPanelSettings /> : <Person />}
        />
      ))}
    </Box>
  );
};

export const userEntity: RosterEntity<UserFormInput> = {
  idField: 'id',
  displayField: 'name',
  schema: userFormSchema,
  columns: [
    {
      field: 'name',
      headerName: 'Nome',
      type: 'string',
      width: 250,
      sortable: true,
      filterable: true,
      renderComponent: (value: string, row: UserFormInput) => (
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar 
            sx={{ 
              width: 32, 
              height: 32,
              bgcolor: row.active ? 'primary.main' : 'grey.400'
            }}
          >
            {getInitials(value)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {value} 
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 250,
      sortable: true,
      filterable: true
    },
    {
      field: 'active',
      headerName: 'Status',
      type: 'boolean',
      width: 120,
      sortable: true,
      filterable: true,
      renderComponent: (value: boolean) => (
        <Chip
          label={value ? 'Ativo' : 'Inativo'}
          color={value ? 'success' : 'default'}
          size="small"
          icon={value ? <Person /> : <PersonOff />}
        />
      )
    },
    {
      field: 'roles', 
      headerName: 'Perfis',
      type: 'custom',
      width: 200,
      sortable: false,
      filterable: false,
      renderComponent: (value: any, row: any) => renderUserRoles(row) 
    }
  ]
};

export const userDtoToFormInput = (user: any): UserFormInput & { roles?: DomainRecordsDtosRoleDto[] } => ({
  id: user.id,
  name: user.name,
  email: user.email,
  active: user.active,
  roleIds: user.roles?.map((role: DomainRecordsDtosRoleDto) => role.id) || [],
  roles: user.roles || [] 
});

export const formInputToCreateRequest = (formData: UserFormInput) => ({
  firstName: formData.name.split(' ')[0] || '',
  lastName: formData.name.split(' ').slice(1).join(' ') || '',
  email: formData.email,
  rolesId: formData.roleIds
});

export const formInputToUpdateRequest = (formData: UserFormInput) => ({
  id: formData.id,
  firstName: formData.name.split(' ')[0] || '',
  lastName: formData.name.split(' ').slice(1).join(' ') || '',
  email: formData.email,
  isActive: formData.active,
  rolesIds: formData.roleIds
});