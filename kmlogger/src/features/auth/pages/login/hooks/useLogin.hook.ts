import { useState } from 'react';
import type { LoginFormData } from '../schemas/login.schema';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulando uma chamada de API
      console.log('Dados do login:', data);
      
      // Simula demora da API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você faria a chamada real para sua API
      // const response = await loginAPI(data);
      
      alert('Login realizado com sucesso!');
      
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error('Erro no login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
    error
  };
}
