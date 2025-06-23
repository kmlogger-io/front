import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { apiClient } from '../services/apiService';
import React from 'react';
import { autoRefresh } from '../interceptors/auto-refresh.interceptor';
import { useAuthMutation } from '../../features/auth/mutations/useAuth.mutation';
import { getUserRolesFromToken, hasRole, isAdmin, getUserInfoFromToken } from '../utils/token.utils';
import type { UserInfo } from '../types/auth.types';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserInfo | null;
  userRoles: string[]; // ✅ Adicionar roles
  hasRole: (role: string) => boolean; // ✅ Função para verificar role
  isAdmin: () => boolean; // ✅ Função para verificar admin
  logout: () => Promise<void>;
  refreshAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication provider with automatic token management
 * ✅ Agora inclui funcionalidades de roles
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]); // ✅ Estado das roles
 
  const { logout: logoutMutation } = useAuthMutation();

  /**
   *  Função para verificar se usuário tem role específica
   */
  const checkHasRole = (role: string): boolean => {
    return hasRole(role);
  };

  /**
   * Função para verificar se usuário é admin
   */
  const checkIsAdmin = (): boolean => {
    return isAdmin();
  };

  /**
   * Checks and refreshes authentication status
   */
  const refreshAuthStatus = async (): Promise<void> => {
    try {
      setIsLoading(true);
     
      const token = localStorage.getItem('authToken');
      const storedUser = apiClient.getCurrentUser() as UserInfo | null;
     
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setUserRoles([]); 
        return;
      }
     
      const isValid = await autoRefresh.ensureValidToken();
      if (isValid) {
        apiClient.updateClientWithToken();
        setIsAuthenticated(true);
        setUser(storedUser);
        
        const roles = getUserRolesFromToken();
        setUserRoles(roles);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserRoles([]); 
      }
     
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
      setUserRoles([]); 
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 1. Chama mutation do servidor
   * 2. Limpa dados locais
   * 3. Atualiza estado
   * 4. Redireciona automaticamente (via interceptor)
   */
  const logout = async (): Promise<void> => {
    try {
      await logoutMutation();
    } catch (error) {
      console.error('⚠️ Server logout failed, proceeding with local cleanup:', error);
    } finally {
      apiClient.removeAuthentication();
      setIsAuthenticated(false);
      setUser(null);
      setUserRoles([]); 
    }
  };

  useEffect(() => {
    refreshAuthStatus();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    userRoles, 
    hasRole: checkHasRole, 
    isAdmin: checkIsAdmin, 
    logout,
    refreshAuthStatus,
  };

  return React.createElement(
    AuthContext.Provider,
    { value },
    children
  );
}

/**
 * Hook to access authentication context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
 
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
 
  return context;
}

/**
 * Hook for protecting routes that require authentication
 */
export function useProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
 
  return { isAuthenticated, isLoading };
}

/**
 * Hook para proteger rotas que requerem roles específicas
 */
export function useRoleProtection(requiredRoles: string[]) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  
  const hasRequiredRole = requiredRoles.some(role => hasRole(role));
  
  return { 
    isAuthenticated, 
    isLoading, 
    hasRequiredRole,
    canAccess: isAuthenticated && hasRequiredRole
  };
}