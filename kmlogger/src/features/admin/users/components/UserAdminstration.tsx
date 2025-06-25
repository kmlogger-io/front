import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Chip, 
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  People as UsersIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Lock as LockIcon,
  LockOpen as UnlockIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  AdminPanelSettings as AdminIcon,
  SupervisorAccount as ManagerIcon,
  Person as UserIcon
} from '@mui/icons-material';
import type { TableData } from '../../../../shared/components/table/stores/useTableStore.store';
import type { TableAction, TableColumn } from '../../../../shared/components/table/contexts/TableContext';
import GenericTable from '../../../../shared/components/table/components/GenericTable';

interface User extends TableData {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Manager' | 'User' | 'Guest';
  status: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
  avatar?: string;
  lastLogin: string;
  createdAt: string;
  department: string;
  isLocked: boolean;
}

export function UserAdministration() {

  const columns: TableColumn[] = [
    {
      key: 'avatar',
      label: '',
      width: 60,
      align: 'center',
      render: (item: TableData) => {
        const user = item as User;
        const roleIcons = {
          Admin: <AdminIcon fontSize="small" />,
          Manager: <ManagerIcon fontSize="small" />,
          User: <UserIcon fontSize="small" />,
          Guest: <UserIcon fontSize="small" />
        };
        
        return (
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40,
              bgcolor: user.role === 'Admin' ? 'error.main' : 
                      user.role === 'Manager' ? 'warning.main' : 'primary.main'
            }}
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              roleIcons[user.role]
            )}
          </Avatar>
        );
      }
    },
    {
      key: 'name',
      label: 'Nome',
      minWidth: 180,
      sortable: true,
      filterable: true,
      render: (item: TableData) => {
        const user = item as User;
        return (
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.department}
            </Typography>
          </Box>
        );
      }
    },
    {
      key: 'email',
      label: 'Contato',
      minWidth: 220,
      sortable: true,
      filterable: true,
      render: (item: TableData) => {
        const user = item as User;
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2">
                {user.email}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PhoneIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {user.phone}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      key: 'role',
      label: 'Função',
      width: 120,
      align: 'center',
      sortable: true,
      filterable: true,
      render: (item: TableData) => {
        const user = item as User;
        const colorMap = {
          Admin: 'error',
          Manager: 'warning',
          User: 'primary',
          Guest: 'secondary'
        } as const;

        return (
          <Chip
            label={user.role}
            color={colorMap[user.role]}
            size="small"
            variant="outlined"
          />
        );
      }
    },
    {
      key: 'status',
      label: 'Status',
      width: 110,
      align: 'center',
      sortable: true,
      filterable: true,
      render: (item: TableData) => {
        const user = item as User;
        const statusConfig = {
          Active: { color: 'success', label: 'Ativo' },
          Inactive: { color: 'default', label: 'Inativo' },
          Suspended: { color: 'error', label: 'Suspenso' },
          Pending: { color: 'warning', label: 'Pendente' }
        } as const;

        const config = statusConfig[user.status];
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Chip
              label={config.label}
              color={config.color}
              size="small"
            />
            {user.isLocked && (
              <Tooltip title="Conta bloqueada">
                <LockIcon fontSize="small" color="error" />
              </Tooltip>
            )}
          </Box>
        );
      }
    },
    {
      key: 'lastLogin',
      label: 'Último Acesso',
      width: 140,
      sortable: true,
      render: (item: TableData) => {
        const user = item as User;
        return (
          <Typography variant="body2" color="text.secondary">
            {formatDate(user.lastLogin)}
          </Typography>
        );
      }
    },
    {
      key: 'createdAt',
      label: 'Criado em',
      width: 130,
      sortable: true,
      render: (item: TableData) => {
        const user = item as User;
        return (
          <Typography variant="body2" color="text.secondary">
            {formatDate(user.createdAt)}
          </Typography>
        );
      }
    }
  ];

  const actions: TableAction[] = [
    {
      label: 'Visualizar',
      icon: <ViewIcon />,
      color: 'info',
      onClick: (item: TableData) => {
        const user = item as User;
        console.log('Visualizando usuário:', user);
        alert(`Visualizando perfil de ${user.name}`);
      }
    },
    {
      label: 'Editar',
      icon: <EditIcon />,
      color: 'primary',
      onClick: (item: TableData) => {
        const user = item as User;
        console.log('Editando usuário:', user);
        alert(`Editando ${user.name}`);
      },
      disabled: (item: TableData) => {
        const user = item as User;
        return user.status === 'Suspended';
      }
    },
    {
      label: 'Bloquear/Desbloquear',
      icon: (item: TableData) => {
        const user = item as User;
        return user.isLocked ? <UnlockIcon /> : <LockIcon />;
      },
      color: 'warning',
      onClick: (item: TableData) => {
        const user = item as User;
        const action = user.isLocked ? 'desbloquear' : 'bloquear';
        console.log(`${action} usuário:`, user);
        alert(`${action.charAt(0).toUpperCase() + action.slice(1)} ${user.name}?`);
      },
      disabled: (item: TableData) => {
        const user = item as User;
        return user.role === 'Admin';
      }
    },
    {
      label: 'Deletar',
      icon: <DeleteIcon />,
      color: 'error',
      onClick: (item: TableData) => {
        const user = item as User;
        console.log('Deletando usuário:', user);
        if (confirm(`Tem certeza que deseja deletar ${user.name}?\nEsta ação não pode ser desfeita.`)) {
          alert(`${user.name} foi removido do sistema!`);
        }
      },
      disabled: (item: TableData) => {
        const user = item as User;
        return user.role === 'Admin' || user.id === 1; // Proteger admin principal
      }
    }
  ];



  const handleDataChange = (data: TableData[]) => {
    console.log('Dados da tabela de usuários alterados:', data);
  };

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 2 }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        mb: '2rem'
      }}>
        <UsersIcon sx={{
          color: 'var(--primary)',
          fontSize: '2rem'
        }} />
        <Typography variant="h4" sx={{
          color: 'var(--text-primary)',
          fontWeight: 600
        }}>
          User Administration
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        gap: '1rem',
        mb: '2rem'
      }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: 'var(--primary)',
            '&:hover': {
              backgroundColor: 'var(--primary-hover)'
            }
          }}
          onClick={() => alert('Abrir formulário de novo usuário')}
        >
          Add New User
        </Button>

        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
            '&:hover': {
              borderColor: 'var(--primary)',
              color: 'var(--primary)'
            }
          }}
          onClick={() => alert('Função de edição em massa')}
        >
          Bulk Edit
        </Button>
      </Box>

      <GenericTable
        data={users}
        columns={columns}
        actions={actions}
        title="Usuários do Sistema"
        subtitle={`Gerencie todos os ${users.length} usuários cadastrados na plataforma`}
        showFilters={true}
        showSelection={true}
        showPagination={true}
        dense={false}
        stickyHeader={true}
        maxHeight={700}
        onDataChange={handleDataChange}
      />
    </Box>
  );
}