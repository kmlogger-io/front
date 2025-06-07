// contexts/SnackbarContext.tsx
import React, { createContext, useState, type ReactNode } from 'react';
import type { ShowSnackbarOptions, SnackbarType } from '../hooks/useSnackbar.hook';
import { Alert, Snackbar, type AlertProps } from '@mui/material';

interface SnackbarState {
  open: boolean;
  message: string;
  type: SnackbarType;
  duration: number;
}

interface SnackbarContextType {
  showSnackbar: (options: ShowSnackbarOptions) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    type: 'info',
    duration: 4000,
  });

  const showSnackbar = ({ message, type = 'info', duration = 4000 }: ShowSnackbarOptions) => {
    setSnackbar({
      open: true,
      message,
      type,
      duration,
    });
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const getSeverity = (type: SnackbarType): AlertProps['severity'] => {
    const severityMap: Record<SnackbarType, AlertProps['severity']> = {
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'info',
    };
    return severityMap[type];
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={getSeverity(snackbar.type)}
          variant="filled"
          sx={{
            width: '100%',
            fontWeight: 500,
            '& .MuiAlert-icon': {
              fontSize: '1.2rem',
            },
            '& .MuiAlert-message': {
              fontSize: '0.95rem',
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};