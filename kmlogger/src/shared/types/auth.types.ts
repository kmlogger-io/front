// shared/types/auth.types.ts

/**
 * User information interface
 */
export interface UserInfo {
  id: string;
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
  [key: string]: any;
}

/**
 * Authentication context interface
 */
export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserInfo | null;
  logout: () => void;
  refreshAuthStatus: () => Promise<void>;
}
