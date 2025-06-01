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
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: var(--button-primary);
    color: var(--button-primary-text);
    box-shadow: var(--shadow-md);
    border: none;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      transition: left 0.6s ease;
    }
    
    &:hover:not(:disabled) {
      background: var(--button-primary-hover);
      box-shadow: var(--shadow-primary-lg);
      transform: translateY(-2px);
      
      &::before {
        left: 100%;
      }
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
            &::before {
              display: none;
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
      box-shadow: var(--shadow-xs);
      transform: none;
      
      &::before {
        display: none;
      }
    }
    
    &:focus {
      outline: none;
      box-shadow: var(--shadow-primary-lg), var(--input-shadow-focus);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: var(--shadow-sm);
    }
    
    .MuiLoadingButton-loadingIndicator {
      color: white;
    }
    
    .MuiCircularProgress-root {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;
