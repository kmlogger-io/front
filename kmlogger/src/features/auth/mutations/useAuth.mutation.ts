import { useSnackbar } from '../../../shared/hooks/useSnackbar.hook';
import { apiClient } from '../../../shared/services/apiService';
import type { UseCasesUserLoginRequest } from '../../../client/src';

export const useAuthMutation = () => {
  const { showSuccess, showError } = useSnackbar();
const login = async (credentials: UseCasesUserLoginRequest) => {
  const result = await apiClient.callPublic(
    (client) => {
      return client.userLogin({ body: credentials });
    },
    {
      showMessages: true,
      showSuccess,
      showError,
    }
  );
  return result;
};

  const logout = async () => {
    const result = await apiClient.callAuthenticated(
      (client) => client.userLogout(),
      {
        showMessages: true,
        showSuccess,
        showError,
      }
    );
    
    if (result) {
      apiClient.removeAuthentication();
    }
    return result;
  };

  const refreshToken = async (refreshTokenData: { accessToken: string; refreshToken: string }) => {
    const result = await apiClient.callPublic(
      (client) => client.userRefreshToken({ body: refreshTokenData }),
      {
        showMessages: true,
        showSuccess,
        showError,
      }
    );
    
    if (result?.data?.token) {
      apiClient.saveAuthData(result.data.token, result.data?.user, result.data?.refreshToken);
    }
    
    return result;
  };

  return {
    login,
    logout,
    refreshToken,
  };
};