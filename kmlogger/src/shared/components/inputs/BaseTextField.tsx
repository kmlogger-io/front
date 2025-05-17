import { useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { TextField, InputAdornment, IconButton, TextFieldProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputMask from 'react-input-mask';

interface BaseTextFieldProps<T = any> {
  name: Path<T>;
  control: any; 
  label?: string;
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
  zodField?: any; 
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
  zodField,
  ...rest
}: BaseTextFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  let inputPropsFromSchema: any = {};
  if (zodField) {
    if (zodField._def.mask) {
      rest.mask = zodField._def.mask;
    }
    if (zodField._def.checks) {
      const max = zodField._def.checks.find((c: any) => c.kind === 'max');
      if (max) inputPropsFromSchema.maxLength = max.value;
      const pattern = zodField._def.checks.find((c: any) => c.kind === 'regex');
      if (pattern) inputPropsFromSchema.pattern = pattern.regex.source;
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) =>
        rest.mask ? (
          <InputMask mask={rest.mask} value={field.value || ''} onChange={field.onChange}>
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
                inputProps={{
                  ...inputPropsFromSchema,
                  ...rest.inputProps,
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
            inputProps={{
              ...inputPropsFromSchema,
              ...rest.inputProps,
            }}
            {...rest}
          />
        )
      }
    />
  );
}
