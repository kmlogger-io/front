import styled from 'styled-components';
import { LoadingButton } from '@mui/lab';

interface StyledButtonProps {
  $state: 'idle' | 'loading' | 'success' | 'error';
}

export const StyledButton = styled(LoadingButton)<StyledButtonProps>`
  &.MuiButton-root {
    padding: 16px 32px;
    min-width: 160px;
    min-height: 56px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    text-transform: none;
    letter-spacing: 0.5px;
    background: var(--button-primary);
    color: var(--button-primary-text);
    box-shadow: var(--shadow-md);
    border: none;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
   
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      transition: left 0.3s ease;
    }

    &.w-full {
      width: 100%;
      min-width: unset;
    }
   
    &:hover:not(:disabled) {
      background: var(--button-primary-hover);
      box-shadow: var(--shadow-primary-lg);
      transform: translateY(-1px);
    }
   
    ${({ $state }) => {
      switch ($state) {
        case 'success':
          return `
            background: var(--success);
            color: white;
            box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
            &:hover {
              background: var(--success-dark);
              box-shadow: 0 8px 40px rgba(76, 175, 80, 0.4);
            }
          `;
        case 'error':
          return `
            background: var(--error);
            color: white;
            box-shadow: 0 4px 20px rgba(244, 67, 54, 0.3);
            &:hover {
              background: var(--error-dark);
              box-shadow: 0 8px 40px rgba(244, 67, 54, 0.4);
            }
          `;
        case 'loading':
          return `
            background: var(--primary-dark);
            cursor: wait;
            transform: none;
            position: relative;
            
            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.1),
                transparent
              );
              animation: shimmer 1.5s infinite;
            }
            
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            
            &:hover {
              background: var(--primary-dark);
              transform: none;
            }
          `;
        default:
          return '';
      }
    }}
   
    &:disabled {
      background: var(--button-disabled);
      color: var(--button-disabled-text);
      opacity: 0.8;
      cursor: not-allowed;
      transform: none;
     
      &::before {
        display: none;
      }
      
      &:hover {
        background: var(--button-disabled);
        transform: none;
      }
    }
   
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: var(--shadow-sm);
    }
   
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.2);
    }
   
    .MuiLoadingButton-loadingIndicator {
      color: rgba(255, 255, 255, 0.8);
      position: absolute;
    }
   
    .MuiCircularProgress-root {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;
