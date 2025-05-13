import { useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, InputAdornment, IconButton, TextFieldProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputMask from 'react-input-mask';

interface BaseTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  mask?: string;
  disabled?: boolean;
  readOnly?: boolean;
  helperText?: string;
  rules?: any;
  fullWidth?: boolean;
  variant?: TextFieldProps['variant'];
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  multiline?: boolean;
  rows?: number;
  InputProps?: TextFieldProps['InputProps'];
  [key: string]: any;
}

export function BaseTextField<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  mask,
  disabled = false,
  readOnly = false,
  helperText,
  rules,
  fullWidth = true,
  variant = 'outlined',
  placeholder,
  autoComplete,
  autoFocus,
  multiline,
  rows,
  InputProps,
  ...rest
}: BaseTextFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) =>
        mask ? (
          <InputMask mask={mask} value={field.value || ''} onChange={field.onChange}>
            {(inputProps: any) => (
              <TextField
                {...inputProps}
                label={label}
                variant={variant}
                fullWidth={fullWidth}
                disabled={disabled}
                InputProps={{
                  readOnly,
                  ...InputProps,
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message || helperText}
                placeholder={placeholder}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                multiline={multiline}
                rows={rows}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'var(--cor-primaria)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--cor-primaria)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--cor-primaria)',
                    },
                  },
                }}
                {...rest}
              />
            )}
          </InputMask>
        ) : (
          <TextField
            {...field}
            type={inputType}
            label={label}
            variant={variant}
            fullWidth={fullWidth}
            disabled={disabled}
            InputProps={{
              readOnly,
              endAdornment:
                type === 'password' ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : null,
              ...InputProps,
            }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message || helperText}
            placeholder={placeholder}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            multiline={multiline}
            rows={rows}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--cor-primaria)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--cor-primaria)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--cor-primaria)',
                },
              },
            }}
            {...rest}
          />
        )
      }
    />
  );
}
