import styled from 'styled-components';
import { TextField } from '@mui/material';

// Styled TextField base
export const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin-bottom: 1rem; // Replaces @apply mb-4;

    .MuiInputBase-input::-webkit-search-cancel-button,
    .MuiInputBase-input::-webkit-clear-button,
    .MuiInputBase-input::-ms-clear {
      display: none;
      -webkit-appearance: none;
    }

    .MuiOutlinedInput-root {
      border-radius: 0.5rem; // Replaces @apply rounded-lg;
      background-color: var(--input-bg); // Replaces @apply bg-gray-100;
      color: var(--text-primary); // Replaces @apply text-gray-800;
      transition: all 0.3s ease-in-out; // Replaces @apply transition-all;
      box-shadow: var(--shadow-sm); // Replaces @apply shadow-sm;

      .MuiOutlinedInput-notchedOutline {
        border-color: var(--primary);
        border-width: 2px; // Replaces @apply border-2;
        opacity: 0.5; // Replaces @apply border-opacity-50;
      }

      &:hover:not(.Mui-focused) {
        .MuiOutlinedInput-notchedOutline {
          border-color: var(--primary);
          opacity: 0.7; // Replaces @apply border-opacity-70;
          box-shadow: var(--shadow-md); // Replaces @apply shadow-md;
        }
      }

      &.Mui-focused {
        background-color: var(--input-bg); // Replaces @apply bg-white;
        .MuiOutlinedInput-notchedOutline {
          border-color: var(--primary);
          border-width: 2px; // Replaces @apply border-2;
          opacity: 1; // Ensure full opacity on focus
          box-shadow: var(--shadow-lg); // Replaces @apply shadow-lg;
        }
      }

      &.Mui-error {
        .MuiOutlinedInput-notchedOutline {
          border-color: var(--error);
          box-shadow: var(--shadow-lg); // Replaces @apply shadow-lg;
        }
      }

      &.Mui-disabled {
        background-color: var(--background-tertiary); // Replaces @apply bg-gray-200;
        .MuiOutlinedInput-notchedOutline {
          border-color: var(--text-muted); 
        }
      }

      input {
        color: var(--text-primary); // Replaces @apply text-gray-800;

        &::placeholder {
          color: var(--input-placeholder); // Replaces @apply text-gray-400;
          opacity: 0.8; // Replaces @apply opacity-80;
        }
      }
    }

    .MuiInputLabel-root {
      color: var(--text-secondary); // Replaces @apply text-gray-600;
      font-weight: 500; // Replaces @apply font-medium;
      font-size: 0.875rem; // Replaces @apply text-sm;

      &.Mui-focused {
        color: var(--primary);
      }

      &.Mui-error {
        color: var(--error);
      }

      &.Mui-disabled {
        color: var(--text-muted);
      }
    }

    .MuiFormHelperText-root {
      margin-left: 0; // Replaces @apply ml-0;
      margin-top: 0.25rem; // Replaces @apply mt-1;
      font-size: 0.75rem; // Replaces @apply text-xs;
      font-weight: 500; // Replaces @apply font-medium;
      color: var(--text-muted); // Replaces @apply text-gray-400;

      &.Mui-error {
        color: var(--error);
      }
    }
  }
`;

// Variante pequena
export const StyledTextFieldSmall = styled(StyledTextField)`
  && {
    .MuiOutlinedInput-root {
      height: 2.5rem; // Replaces @apply h-10;
      font-size: 0.875rem; // Replaces @apply text-sm;
    }

    .MuiInputLabel-root {
      font-size: 0.875rem; // Replaces @apply text-sm;
    }
  }
`;

// Variante grande
export const StyledTextFieldLarge = styled(StyledTextField)`
  && {
    .MuiOutlinedInput-root {
      height: 3.5rem; // Replaces @apply h-14;
      font-size: 1rem; // Replaces @apply text-base;
    }

    .MuiInputLabel-root {
      font-size: 1rem; // Replaces @apply text-base;
    }
  }
`;

// Container para o input
export const InputContainer = styled.div<{ 
  isFocused?: boolean; 
  hasError?: boolean;
  isValid?: boolean;
}>`
  position: relative; // Replaces @apply relative;
  width: 100%; // Replaces @apply w-full;

  ${props => props.hasError && `
    animation: shake 0.3s ease-in-out;
  `}

  ${props => props.isValid === false && `
    .MuiOutlinedInput-root {
      .MuiOutlinedInput-notchedOutline {
        border-color: var(--error) !important;
      }
    }
  `}

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }
`;