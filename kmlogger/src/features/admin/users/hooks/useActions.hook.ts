// hooks/useActions.hook.ts
import React from 'react';
import { 
  Visibility, 
  Edit, 
  Delete, 
  PersonOff, 
  PersonAdd,
  Lock,
  LockOpen,
} from '@mui/icons-material';
import type { TableAction } from '../contexts/TableContext';

/**
 * Configurações para as ações
 */
interface ActionsConfig {
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showToggleStatus?: boolean;
  showPermissions?: boolean;
  customActions?: TableAction[];
  
  // Callbacks
  onView?: (user: any) => void;
  onEdit?: (user: any) => void;
  onDelete?: (user: any) => void;
  onToggleStatus?: (user: any) => void;
  onPermissions?: (user: any) => void;
  
  // Configurações de permissão
  canEdit?: (user: any) => boolean;
  canDelete?: (user// hooks/useActions.hook.ts
import React from 'react';
import { 
  Visibility, 
  Edit, 
  Delete, 
  PersonOff, 
  PersonAdd,
  Lock,
  LockOpen,
} from '@mui/icons-material';
import type { TableAction } from '../contexts/TableContext';

/**
 * Configurações para as ações
 */
interface ActionsConfig {
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showToggleStatus?: boolean;
  showPermissions?: boolean;
  customActions?: TableAction[];
  
  // Callbacks
  onView?: (user: any) => void;
  onEdit?: (user: any) => void;
  onDelete?: (user: any) => void;
  onToggleStatus?: (user: any) => void;
  onPermissions?: (user: any) => void;
  
  // Configurações de permissão
  canEdit?: (user: any) => boolean;
  canDelete?: (user: any) => boolean;
  canToggleStatus?: (user: any) => boolean;
}

/**
 * Hook para configurar ações de usuários
 */
export function useActions(config: ActionsConfig = {}) {
  const {
    showView = true,
    showEdit = true,
    showDelete = true,
    showToggleStatus = true,
    showPermissions = false,
    customActions = [],
    onView,
    onEdit,
    onDelete,
    onToggleStatus,
    onPermissions,
    canEdit = () => true,
    canDelete = (user) => !(user.active && user.roleSlug === 'admin'),
    canToggleStatus = () => true,
  } = config;

  // Ação de visualizar
  const viewAction: TableAction = {
    label: 'Visualizar',
    icon: <Visibility />,
    onClick: (user: any) => {
      console.log('Visualizar usuário:', user);
      onView?.(user);
    },
    color: 'info',
    size: 'small',
  };

  // Ação de editar
  const editAction: TableAction = {
    label: 'Editar',
    icon: <Edit />,
    onClick: (user: any) => {
      console.log('Editar usuário:', user);
      onEdit?.(user);
    },
    color: 'primary',
    size: 'small',
    disabled: (user: any) => !canEdit(user),
  };

  // Ação de alternar status
  const toggleStatusAction: TableAction = {
    label: (user: any) => user.status === 'Ativo' ? 'Desativar' : 'Ativar',
    icon: (user: any) => user.status === 'Ativo' ? <PersonOff /> : <PersonAdd />,
    onClick: (user: any) => {
      const action = user.status === 'Ativo' ? 'desativar' : 'ativar';
      const confirmMessage = `Tem certeza que deseja ${action} o usuário "${user.name}"?`;
      
      if (window.confirm(confirmMessage)) {
        console.log(`${action} usuário:`, user);
        onToggleStatus?.(user);
      }
    },
    color: (user: any) => user.status === 'Ativo' ? 'warning' : 'success',
    size: 'small',
    disabled: (user: any) => !canToggleStatus(user),
  };

  // Ação de permissões
  const permissionsAction: TableAction = {
    label: 'Permissões',
    icon: (user: any) => user.roleSlug === 'admin' ? <Lock /> : <LockOpen />,
    onClick: (user: any) => {
      console.log('Gerenciar permissões:', user);
      onPermissions?.(user);
    },
    color: 'secondary',
    size: 'small',
  };

  // Ação de deletar
  const deleteAction: TableAction = {
    label: 'Deletar',
    icon: <Delete />,
    onClick: (user: any) => {
      const confirmMessage = `Tem certeza que deseja deletar o usuário "${user.name}"?\n\nEsta ação não pode ser desfeita.`;
      
      if (window.confirm(confirmMessage)) {
        console.log('Deletar usuário:', user);
        onDelete?.(user);
      }
    },
    color: 'error',
    size: 'small',
    disabled: (user: any) => !canDelete(user),
  };

  // Construir array de ações baseado na configuração
  const buildActions = (): TableAction[] => {
    const actions: TableAction[] = [];

    if (showView) actions.push(viewAction);
    if (showEdit) actions.push(editAction);
    if (showToggleStatus) actions.push(toggleStatusAction);
    if (showPermissions) actions.push(permissionsAction);
    if (showDelete) actions.push(deleteAction);

    // Adicionar ações customizadas
    actions.push(...customActions);

    return actions;
  };

  // Função para deletar em lote
  const handleBulkDelete = (selectedIds: readonly string[]) => {
    const count = selectedIds.length;
    const confirmMessage = `Tem certeza que deseja deletar ${count} usuário${count > 1 ? 's' : ''} selecionado${count > 1 ? 's' : ''}?\n\nEsta ação não pode ser desfeita.`;
    
    if (window.confirm(confirmMessage)) {
      console.log('Deletar usuários em lote:', selectedIds);
      // Aqui você chamaria sua função de delete em lote
      // bulkDeleteUsers([...selectedIds]);
    }
  };

  // Função para ações em lote customizadas
  const handleBulkAction = (
    selectedIds: readonly string[], 
    actionType: 'activate' | 'deactivate' | 'changeRole',
    actionData?: any
  ) => {
    const count = selectedIds.length;
    let confirmMessage = '';
    
    switch (actionType) {
      case 'activate':
        confirmMessage = `Ativar ${count} usuário${count > 1 ? 's' : ''}?`;
        break;
      case 'deactivate':
        confirmMessage = `Desativar ${count} usuário${count > 1 ? 's' : ''}?`;
        break;
      case 'changeRole':
        confirmMessage = `Alterar função de ${count} usuário${count > 1 ? 's' : ''} para "${actionData?.roleName}"?`;
        break;
    }
    
    if (window.confirm(confirmMessage)) {
      console.log(`Ação em lote (${actionType}):`, selectedIds, actionData);
      // Implementar ações em lote
    }
  };

  // Métodos utilitários
  const getActionByLabel = (label: string) => {
    return buildActions().find(action => 
      typeof action.label === 'string' ? action.label === label : false
    );
  };

  const getVisibleActions = (user: any) => {
    return buildActions().filter(action => {
      if (action.visible) {
        return typeof action.visible === 'function' ? action.visible(user) : action.visible;
      }
      return true;
    });
  };

  const getEnabledActions = (user: any) => {
    return buildActions().filter(action => {
      if (action.disabled) {
        return !action.disabled(user);
      }
      return true;
    });
  };

  return {
    // Ações principais
    actions: buildActions(),
    
    // Ações individuais para uso avançado
    viewAction,
    editAction,
    toggleStatusAction,
    permissionsAction,
    deleteAction,
    
    // Handlers de ações em lote
    handleBulkDelete,
    handleBulkAction,
    
    // Métodos utilitários
    getActionByLabel,
    getVisibleActions,
    getEnabledActions,
    
    // Configuração atual
    config,
  };
}