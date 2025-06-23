import { useMemo } from 'react';

/**
 * Hook para verificar roles do usuário a partir do token JWT
 */
export function useRoles() {
  const userRoles = useMemo(() => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return [];

      const payload = JSON.parse(atob(token.split('.')[1]));
      
      const roles = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 
                   payload.role || 
                   payload.roles || 
                   [];

      return Array.isArray(roles) ? roles : [roles];
    } catch (error) {
      console.error('Error parsing roles from token:', error);
      return [];
    }
  }, []);

  /**
   * Verifica se o usuário tem uma role específica
   */
  const hasRole = (roleName: string): boolean => {
    return userRoles.some(role => 
      role.toLowerCase() === roleName.toLowerCase()
    );
  };

  /**
   * Verifica se o usuário tem pelo menos uma das roles especificadas
   */
  const hasAnyRole = (roleNames: string[]): boolean => {
    return roleNames.some(roleName => hasRole(roleName));
  };

  /**
   * Verifica se o usuário tem todas as roles especificadas
   */
  const hasAllRoles = (roleNames: string[]): boolean => {
    return roleNames.every(roleName => hasRole(roleName));
  };

  /**
   * Verifica se é administrador
   */
  const isAdmin = (): boolean => {
    return hasAnyRole(['admin', 'administrator', 'Admin', 'Administrator']);
  };

  /**
   * Verifica se é usuário comum
   */
  const isUser = (): boolean => {
    return hasAnyRole(['user', 'User']);
  };

  return {
    roles: userRoles,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isAdmin,
    isUser,
  };
}