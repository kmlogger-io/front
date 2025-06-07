import { useContext } from 'react';
import { SnackbarContext } from '../contexts/SnackbarContext.tsx';

export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export interface ShowSnackbarOptions {
  message: string;
  type?: SnackbarType;
  duration?: number;
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  
  if (!context) {
    throw new Error('useSnackbar deve ser usado dentro de um SnackbarProvider');
  }

  const { showSnackbar: show } = context;

  // Funções específicas para cada tipo
  const showSuccess = (message: string, duration?: number) => {
    show({ message, type: 'success', duration });
  };

  const showError = (message: string, duration?: number) => {
    show({ message, type: 'error', duration });
  };

  const showWarning = (message: string, duration?: number) => {
    show({ message, type: 'warning', duration });
  };

  const showInfo = (message: string, duration?: number) => {
    show({ message, type: 'info', duration });
  };

  const showSnackbar = (options: ShowSnackbarOptions) => {
    show(options);
  };

  return {
    showSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};