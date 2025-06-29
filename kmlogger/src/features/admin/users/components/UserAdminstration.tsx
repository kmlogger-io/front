import React from 'react';
import {
  Container,
  Box,
  Breadcrumbs,
  Link,
  Typography
} from '@mui/material';
import { Home, People } from '@mui/icons-material';
import { RosterProvider } from '../../../../shared/components/table/roster';
import { userEntity } from '../config/user-entity.config';
import type { ModalCustomization } from '../../../../shared/components/table/roster/types/roster.types';
import type { UserFormInput } from '../schemas/user.schema';
import { useUserManagementComplete } from '../hooks/useUserManagmentComplete';
import { UserFormField } from './UserFormField';
import { RosterTableWithSearch } from '../../../../shared/components/table/roster/components/RosterTableWithSearch';

export const UserManagementPageComplete: React.FC = () => {
  const {
    queryFunction,
    mutations,
    search
  } = useUserManagementComplete();

  const permissions = {
    allowView: true,
    allowEdit: true,
    allowCreate: true,
    allowDelete: true,
    showDeleteModal: true
  };

  const customUserEntity = {
    ...userEntity,
    columns: userEntity.columns.filter(col =>
      col.field !== 'id'
    )
  };

  const modalCustomization: ModalCustomization<UserFormInput> = {
    customFieldRenderer: (field, fieldState, column, disabled) => {
      return (
        <UserFormField
          field={field}
          fieldState={fieldState}
          column={column}
          disabled={disabled}
        />
      );
    },
    additionalFields: [
      {
        name: 'roleIds',
        label: 'Perfis do Usuário',
        required: true,
        type: 'custom'
      }
    ],
    fieldsToExclude: [],
    modalTitles: {
      create: 'Criar Novo Usuário',
      edit: 'Editar Usuário',
      view: 'Visualizar Usuário'
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/"
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Início
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
          >
            <People sx={{ mr: 0.5 }} fontSize="inherit" />
            Gerenciamento de Usuários
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gerenciamento de Usuários
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie usuários, perfis e permissões do sistema
        </Typography>
      </Box>
      <RosterProvider>
        <Box sx={{ height: '70vh' }}>
          <RosterTableWithSearch
            entity={customUserEntity}
            queryFunction={queryFunction}
            permissions={permissions}
            mutations={mutations}
            modalCustomization={modalCustomization}
            title="Lista de Usuários"
            subtitle="Gerencie todos os usuários do sistema"
            searchPlaceholder="Buscar por nome ou email..."
            onSearch={search.handleSearchChange}
            searchValue={search.searchTerm}
            initialPageSize={25}
          />
        </Box>
      </RosterProvider>
    </Container>
  );
};