import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginFormData } from '../schemas/login.schema';
import { useAuthMutation } from '../../../mutations/useAuth.mutation';
import type { UseCasesUserLoginRequest } from '../../../../../client/src/index';
import { useAuth } from '../../../../../shared/hooks/useAuthContext.hook';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthMutation();
  const { refreshAuthStatus } = useAuth(); 

  const handleLogin = useCallback(async (data: LoginFormData): Promise<void> => {
    setIsLoading(true);
    
    const request: UseCasesUserLoginRequest = {
      email: data.email,
      password: data.password,
    };
    
    const loginResult = await login(request);
    
    if (loginResult) {
      await refreshAuthStatus();
      navigate('/home/dashboard');
    }
    
    setIsLoading(false);
  }, [login, navigate, refreshAuthStatus]); 

  return {
    handleLogin,
    isLoading,
  };
}