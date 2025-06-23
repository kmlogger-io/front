export interface TokenPayload {
  email: string;
  nameid: string; 
  role?: string | string[]; 
  exp: number;
  iat?: number;
}

/**
 * Decodifica o payload do token JWT
 * @param token Token JWT
 * @returns Payload decodificado ou null se inválido
 */
export function decodeJwtPayload(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    const payload = parts[1];
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    const decodedPayload = atob(paddedPayload);
    return JSON.parse(decodedPayload) as TokenPayload;
  } catch (error) {
    console.error('Error decoding JWT payload:', error);
    return null;
  }
}

/**
 * Obtém as roles do token JWT atual
 * @returns Array de roles ou array vazio
 */
export function getUserRolesFromToken(): string[] {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return [];
    }

    const payload = decodeJwtPayload(token);
    if (!payload || !payload.role) {
      return [];
    }

    if (typeof payload.role === 'string') {
      return [payload.role];
    }

    return Array.isArray(payload.role) ? payload.role : [];
  } catch (error) {
    console.error('Error getting roles from token:', error);
    return [];
  }
}

/**
 * Verifica se o usuário tem uma role específica
 * @param role Role a verificar
 * @returns True se tem a role, false caso contrário
 */
export function hasRole(role: string): boolean {
  const userRoles = getUserRolesFromToken();
  return userRoles.includes(role);
}

/**
 * Verifica se o usuário é admin
 * @returns True se é admin, false caso contrário
 */
export function isAdmin(): boolean {
  return hasRole('admin') || hasRole('Admin') || hasRole('ADMIN');
}

/**
 * Verifica se o usuário tem qualquer uma das roles especificadas
 * @param roles Array de roles para verificar
 * @returns True se tem pelo menos uma role, false caso contrário
 */
export function hasAnyRole(roles: string[]): boolean {
  const userRoles = getUserRolesFromToken();
  return roles.some(role => userRoles.includes(role));
}

/**
 * Obtém informações do usuário do token
 * @returns Informações básicas do usuário ou null
 */
export function getUserInfoFromToken(): { email: string; id: string; roles: string[] } | null {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return null;
    }

    const payload = decodeJwtPayload(token);
    if (!payload) {
      return null;
    }

    return {
      email: payload.email,
      id: payload.nameid,
      roles: getUserRolesFromToken()
    };
  } catch (error) {
    console.error('Error getting user info from token:', error);
    return null;
  }
}