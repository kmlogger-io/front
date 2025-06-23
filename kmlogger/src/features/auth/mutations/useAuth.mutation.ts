import { apiClient } from '../../../shared/services/apiService';
import { useSnackbar } from '../../../shared/hooks/useSnackbar.hook';
import type { 
  UseCasesUserLoginRequest, 
  UserLoginResponse,
} from '../../../client/src';

/**
 * Authentication mutation hook providing login, logout and refresh token functionality
 * Uses the complete response pattern for full access to API response data
 */
export const useAuthMutation = () => {
  const { showSuccess, showError } = useSnackbar();

  /**
   * Handles user login with credentials
   * @param credentials User login credentials
   * @returns Promise with complete login response or null
   */
  const login = async (credentials: UseCasesUserLoginRequest): Promise<UserLoginResponse | null> => {
    try {
      const result = await apiClient.callPublicComplete<UserLoginResponse>(
        (client) => client.userLogin({ body: credentials }),
        {
          showMessages: true,
          showError,
          onSuccess: (response: UserLoginResponse) => {
            if (response?.data?.token) {
              apiClient.saveAuthData(
                response?.data?.token,
                response?.data?.user || {},
                response?.data?.refreshToken
              );
            }
          },
        }
      );
      return result;
    } catch (error) {
      console.error('Unexpected error during login', error);
      throw error;
    }
  };

  /**
   * Handles user logout
   * @returns Promise with logout response or null
   */
  const logout = async (): Promise<any> => {
    
    try {
      const result = await apiClient.callAuthenticatedComplete(
        (client) => client.userLogout(),
        {
          showMessages: true,
          showSuccess,
          showError,
        }
      );
      apiClient.removeAuthentication();
      return result;
      
    } catch (error) {
      apiClient.removeAuthentication();
      throw error;
    }
  };

  return {
    login,
    logout,
  };
};

export type AuthMutationHook = ReturnType<typeof useAuthMutation>;
export type LoginFunction = AuthMutationHook['login'];
export type LogoutFunction = AuthMutationHook['logout'];