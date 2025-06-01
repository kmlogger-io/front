import styled from 'styled-components';
import { TextField } from '@mui/material';

// Styled TextField base
export const StyledTextField = styled(TextField)`
  && {
    @apply w-full mb-4; /* Tailwind classes for width and margin-bottom */

    /* Remove o "X" do campo de input */
    .MuiInputBase-input::-webkit-search-cancel-button,
    .MuiInputBase-input::-webkit-clear-button,
    .MuiInputBase-input::-ms-clear {
      display: none;
      -webkit-appearance: none;
    }

    .MuiOutlinedInput-root {
      @apply rounded-lg bg-gray-100 text-gray-800 transition-all shadow-sm; /* Tailwind classes for border-radius, background, text color, and shadow */

      .MuiOutlinedInput-notchedOutline {
        @apply border-primary border-opacity-50 border-2; /* Tailwind classes for border color, opacity, and width */
      }

      &:hover:not(.Mui-focused) {
        .MuiOutlinedInput-notchedOutline {
          @apply border-primary border-opacity-70 shadow-md; /* Tailwind classes for hover state */
        }
      }

      &.Mui-focused {
        @apply bg-white; /* Tailwind class for focused background */
        .MuiOutlinedInput-notchedOutline {
          @apply border-primary border-2 shadow-lg; /* Tailwind classes for focused state */
        }
      }

      &.Mui-error {
        .MuiOutlinedInput-notchedOutline {
          @apply border-red-500 shadow-lg; /* Tailwind classes for error state */
        }
      }

      &.Mui-disabled {
        @apply bg-gray-200; /* Tailwind class for disabled background */
        .MuiOutlinedInput-notchedOutline {
          @apply border-gray-400; /* Tailwind class for disabled border */
        }
      }

      input {
        @apply text-gray-800; /* Tailwind class for input text color */

        &::placeholder {
          @apply text-gray-400 opacity-80; /* Tailwind classes for placeholder text */
        }
      }
    }

    .MuiInputLabel-root {
      @apply text-gray-600 font-medium text-sm; /* Tailwind classes for label */

      &.Mui-focused {
        @apply text-primary; /* Tailwind class for focused label */
      }

      &.Mui-error {
        @apply text-red-500; /* Tailwind class for error label */
      }

      &.Mui-disabled {
        @apply text-gray-400; /* Tailwind class for disabled label */
      }
    }

    .MuiFormHelperText-root {
      @apply ml-0 mt-1 text-xs font-medium text-gray-400; /* Tailwind classes for helper text */

      &.Mui-error {
        @apply text-red-500; /* Tailwind class for error helper text */
      }
    }
  }
`;

// Variante pequena
export const StyledTextFieldSmall = styled(StyledTextField)`
  && {
    .MuiOutlinedInput-root {
      @apply h-10 text-sm; /* Tailwind classes for height and font size */
    }

    .MuiInputLabel-root {
      @apply text-sm; /* Tailwind class for label font size */
    }
  }
`;

// Variante grande
export const StyledTextFieldLarge = styled(StyledTextField)`
  && {
    .MuiOutlinedInput-root {
      @apply h-14 text-base; /* Tailwind classes for height and font size */
    }

    .MuiInputLabel-root {
      @apply text-base; /* Tailwind class for label font size */
    }
  }
`;

// Container para o input
export const InputContainer = styled.div<{ 
  isFocused?: boolean; 
  hasError?: boolean;
  isValid?: boolean;
}>`
  @apply relative w-full; /* Tailwind classes for container */

  ${props => props.isFocused && `
    @apply scale-105 transition-transform ease-in-out; /* Tailwind classes for focus state */
  `}

  ${props => props.hasError && `
    animation: shake 0.3s ease-in-out;
  `}

  ${props => props.isValid === false && `
    .MuiOutlinedInput-root {
      .MuiOutlinedInput-notchedOutline {
        @apply border-red-500 !important; /* Tailwind class for invalid state */
      }
    }
  `}

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }
`;

// Contador de caracteres
export const CharacterCounter = styled.span<{ 
  isOverLimit?: boolean;
  isNearLimit?: boolean;
}>`
  @apply absolute bottom-[-20px] right-0 text-xs font-medium; /* Tailwind classes for position and text */
  color: ${props => {
    if (props.isOverLimit) return '#d32f2f';
    if (props.isNearLimit) return '#ff9800';
    return '#666';
  }};

  @apply transition-colors ease-in-out; /* Tailwind class for color transition */
`;