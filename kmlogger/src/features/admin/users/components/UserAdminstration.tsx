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

// Interface para os dados do usuário
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
  const [users] = useState<User[]>([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@empresa.com',
      phone: '(11) 99999-0001',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-06-24T10:30:00Z',
      createdAt: '2024-01-15T08:00:00Z',
      department: 'TI',
      isLocked: false
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@empresa.com',
      phone: '(11) 99999-0002',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2024-06-24T09:15:00Z',
      createdAt: '2024-02-20T09:30:00Z',
      department: 'Vendas',
      isLocked: false
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro.costa@empresa.com',
      phone: '(11) 99999-0003',
      role: 'User',
      status: 'Inactive',
      lastLogin: '2024-06-20T14:22:00Z',
      createdAt: '2024-01-10T11:15:00Z',
      department: 'Marketing',
      isLocked: true
    },
    {
      id: 4,
      name: 'Ana Oliveira',
      email: 'ana.oliveira@empresa.com',
      phone: '(11) 99999-0004',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2024-06-24T08:45:00Z',
      createdAt: '2024-03-05T07:20:00Z',
      department: 'RH',
      isLocked: false
    },
    {
      id: 5,
      name: 'Carlos Souza',
      email: 'carlos.souza@empresa.com',
      phone: '(11) 99999-0005',
      role: 'User',
      status: 'Suspended',
      lastLogin: '2024-06-18T16:30:00Z',
      createdAt: '2024-02-28T10:45:00Z',
      department: 'Financeiro',
      isLocked: false
    },
    {
      id: 6,
      name: 'Fernanda Lima',
      email: 'fernanda.lima@empresa.com',
      phone: '(11) 99999-0006',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-06-24T11:20:00Z',
      createdAt: '2024-01-25T13:10:00Z',
      department: 'Operações',
      isLocked: false
    },
    {
      id: 7,
      name: 'Roberto Alves',
      email: 'roberto.alves@empresa.com',
      phone: '(11) 99999-0007',
      role: 'Guest',
      status: 'Pending',
      lastLogin: '',
      createdAt: '2024-06-22T15:30:00Z',
      department: 'Terceirizado',
      isLocked: false
    },
    {
      id: 8,
      name: 'Julia Mendes',
      email: 'julia.mendes@empresa.com',
      phone: '(11) 99999-0008',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-06-24T12:05:00Z',
      createdAt: '2024-02-15T09:00:00Z',
      department: 'Jurídico',
      isLocked: false
    },
    {
      id: 9,
      name: 'Lucas Pereira',
      email: 'lucas.pereira@empresa.com',
      phone: '(11) 99999-0009',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-06-24T07:30:00Z',
      createdAt: '2024-01-08T08:15:00Z',
      department: 'TI',
      isLocked: false
    },
    {
      id: 10,
      name: 'Camila Rodrigues',
      email: 'camila.rodrigues@empresa.com',
      phone: '(11) 99999-0010',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2024-06-24T13:15:00Z',
      createdAt: '2024-03-12T14:20:00Z',
      department: 'Produtos',
      isLocked: false
    },
  ]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  const handleBulkDelete = (selectedIds: readonly string[]) => {
    console.log('Deletando usuários em massa:', selectedIds);
    const count = selectedIds.length;
    if (confirm(`Tem certeza que deseja deletar ${count} usuário(s) selecionado(s)?\nEsta ação não pode ser desfeita.`)) {
      alert(`${count} usuário(s) foram removidos do sistema!`);
    }
  };

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
        onBulkDelete={handleBulkDelete}
      />

      <Box sx={{ mt: 3 }}>
        <Paper sx={{
          p: 2,
          background: 'var(--background-card)',
          border: '1px solid var(--border)',
          borderRadius: '0.5rem'
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'var(--text-primary)' }}>
            📊 Estatísticas Rápidas
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 2 
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {users.filter(u => u.status === 'Active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Usuários Ativos
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main">
                {users.filter(u => u.role === 'Admin').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Administradores
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error.main">
                {users.filter(u => u.status === 'Suspended' || u.isLocked).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bloqueados/Suspensos
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main">
                {users.filter(u => u.status === 'Pending').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aguardando Aprovação
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}