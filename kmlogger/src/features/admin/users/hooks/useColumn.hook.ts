import React from 'react';
import { Avatar, Box, Typography, Chip } from '@mui/material';
import { Email, Person } from '@mui/icons-material';
import type { TableColumn } from '../../../../shared/components/table/contexts/TableContext';

interface ColumnConfig {
  showAvatar?: boolean;
  showEmail?: boolean;
  showRole?: boolean;
  showStatus?: boolean;
  showCreatedAt?: boolean;
  customColumns?: TableColumn[];
}

export function useColumn(config: ColumnConfig = {}) {
  const {
    showAvatar = true,
    showEmail = true,
    showRole = true,
    showStatus = true,
    showCreatedAt = true,
    customColumns = [],
  } = config;

  const userColumn: TableColumn = {
    key: 'name',
    label: 'Usuário',
    sortable: true,
    filterable: true,
    minWidth: 250,
    render: (user: any) => (
      React.createElement(
        Box,
        { sx: { display: 'flex', alignItems: 'center', gap: 2 } },
        showAvatar &&
          React.createElement(
            Avatar,
            {
              src: user.avatar,
              sx: {
                width: 40,
                height: 40,
                bgcolor: 'var(--primary)',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 600,
              },
            },
            user.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
          ),
        React.createElement(
          Box,
          null,
          React.createElement(
            Typography,
            {
              variant: "subtitle2",
              sx: {
                color: 'var(--text-primary)',
                fontWeight: 600,
                mb: showEmail ? 0.5 : 0,
              },
            },
            user.name
          ),
          showEmail &&
            React.createElement(
              Box,
              { sx: { display: 'flex', alignItems: 'center', gap: 0.5 } },
              React.createElement(Email, { sx: { fontSize: '14px', color: 'var(--text-secondary)' } }),
              React.createElement(
                Typography,
                { variant: "caption", sx: { color: 'var(--text-secondary)' } },
                user.email
              )
            )
        )
      )
    ),
  };

  const roleColumn: TableColumn = {
    key: 'role',
    label: 'Função',
    sortable: true,
    filterable: true,
    align: 'center',
    width: 150,
    render: (user: any) => {
      const getRoleColor = (roleSlug: string) => {
        const roleMap: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> = {
          'admin': 'error',
          'user': 'primary',
          'moderator': 'warning',
          'guest': 'secondary',
          'manager': 'info',
          'developer': 'success',
        };
        return roleMap[roleSlug] || 'primary';
      };

      return React.createElement(
        Chip,
        {
          label: user.role,
          size: "small",
          color: getRoleColor(user.roleSlug),
          variant: "filled",
          icon: React.createElement(Person, { sx: { fontSize: '14px !important' } }),
          sx: {
            fontWeight: 500,
            fontSize: '0.75rem',
            minWidth: '80px',
          },
        }
      );
    },
  };

  const statusColumn: TableColumn = {
    key: 'status',
    label: 'Status',
    sortable: true,
    filterable: true,
    align: 'center',
    width: 120,
    render: (user: any) => React.createElement(
      Chip,
      {
        label: user.status,
        size: "small",
        color: user.status === 'Ativo' ? 'success' : 'error',
        variant: "filled",
        sx: {
          fontWeight: 500,
          fontSize: '0.75rem',
          minWidth: '70px',
        },
      }
    ),
  };

  const createdAtColumn: TableColumn = {
    key: 'formattedCreatedAt',
    label: 'Criado em',
    sortable: true,
    filterable: false,
    align: 'center',
    minWidth: 180,
    render: (user: any) => {
      const [datePart, timePart] = user.formattedCreatedAt?.split(', ') || ['', ''];
      
      return React.createElement(
        Box,
        null,
        React.createElement(
          Typography,
          { 
            variant: "body2", 
            sx: { color: 'var(--text-primary)' }
          },
          datePart
        ),
        timePart && React.createElement(
          Typography,
          { 
            variant: "caption", 
            sx: { color: 'var(--text-secondary)' }
          },
          timePart
        )
      );
    },
  };

  const buildColumns = (): TableColumn[] => {
    const columns: TableColumn[] = [];
    columns.push(userColumn);
    if (showRole) columns.push(roleColumn);
    if (showStatus) columns.push(statusColumn);
    if (showCreatedAt) columns.push(createdAtColumn);
    columns.push(...customColumns);
    return columns;
  };

  const getFilterableColumns = () => {
    return buildColumns().filter(col => col.filterable);
  };

  const getSortableColumns = () => {
    return buildColumns().filter(col => col.sortable);
  };

  const getColumnKeys = () => {
    return buildColumns().map(col => col.key);
  };

  const getColumnByKey = (key: string) => {
    return buildColumns().find(col => col.key === key);
  };

  const getResponsiveConfig = () => {
    return {
      xs: buildColumns().slice(0, 2), 
      sm: buildColumns().slice(0, 3), 
      md: buildColumns(), 
    };
  };

  return {
    columns: buildColumns(),
    userColumn,
    roleColumn,
    statusColumn,
    createdAtColumn,
    getFilterableColumns,
    getSortableColumns,
    getColumnKeys,
    getColumnByKey,
    getResponsiveConfig,
    config,
  };
}