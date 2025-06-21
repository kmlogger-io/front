import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginFormData } from '../schemas/login.schema';
import { useAuthMutation } from '../../../mutations/useAuth.mutation';
import type { UseCasesUserLoginRequest } from '../../../../../client/src/index';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const navigate = useNavigate();
  const { login } = useAuthMutation();

  const handleLogin = useCallback(async (data: LoginFormData): Promise<void> => {
    setIsLoading(true);

    const request: UseCasesUserLoginRequest = {
      email: data.email,
      password: data.password,
    };
    if (await login(request)) {
      navigate('/home/dashboard');
    }
    setIsLoading(false);
  }, [login, navigate]);

  return {
    handleLogin,
    isLoading,
  };
}