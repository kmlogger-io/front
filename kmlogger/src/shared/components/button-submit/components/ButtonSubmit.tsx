import { forwardRef, useImperativeHandle } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import LoginIcon from '@mui/icons-material/Login';
import { Box, Fade } from '@mui/material';
import { useButtonSubmit } from '../hooks/useButtonSubmit';
import { StyledButton } from '../styles/styles';

interface ButtonSubmitProps {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface ButtonSubmitRef {
  setLoading: () => void;
  setSuccess: () => void;
  setError: () => void;
  reset: () => void;
}

export const ButtonSubmit = forwardRef<ButtonSubmitRef, ButtonSubmitProps>(
  ({ 
    children, 
    onClick, 
    disabled = false, 
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    className 
  }, ref) => {
    const { state, setLoading, setSuccess, setError, reset, isLoading } = useButtonSubmit();

    useImperativeHandle(ref, () => ({
      setLoading,
      setSuccess,
      setError,
      reset
    }));    
    
    const handleClick = async () => {
      if (disabled || isLoading) return;
      
      if (onClick) {
        try {
          setLoading();
          await onClick();
          setSuccess();
        } catch {
          setError();
        }
      }
    };

    const getIcon = () => {
      switch (state) {
        case 'success':
          return (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              animation: 'successPulse 0.6s ease-out',
              '@keyframes successPulse': {
                '0%': { transform: 'scale(0)', opacity: 0 },
                '50%': { transform: 'scale(1.2)', opacity: 1 },
                '100%': { transform: 'scale(1)', opacity: 1 }
              }
            }}>
              <CheckCircleIcon sx={{ fontSize: 20 }} />
            </Box>
          );
        case 'error':
          return (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              animation: 'errorShake 0.5s ease-out',
              '@keyframes errorShake': {
                '0%, 100%': { transform: 'translateX(0)' },
                '25%': { transform: 'translateX(-3px)' },
                '75%': { transform: 'translateX(3px)' }
              }
            }}>
              <ErrorIcon sx={{ fontSize: 20 }} />
            </Box>
          );
        case 'idle':
          return (
            <Fade in={true} timeout={300}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LoginIcon sx={{ fontSize: 20 }} />
              </Box>
            </Fade>
          );
        default:
          return null;
      }
    };

    const getButtonText = () => {
      switch (state) {
        case 'loading':
          return 'Entrando...';
        case 'success':
          return 'Sucesso!';
        case 'error':
          return 'Erro! Tente novamente';
        default:
          return children;
      }
    };    
    
    return (
      <StyledButton
        onClick={handleClick}
        disabled={disabled}
        type='submit'
        loading={isLoading}
        variant={variant}
        color={color}
        size={size}
        className={className}
        startIcon={getIcon()}
        $state={state}
      >
        {getButtonText()}
      </StyledButton>
    );
  }
);

ButtonSubmit.displayName = 'ButtonSubmit';
