import { useController } from 'react-hook-form';
import type { FieldPath, FieldValues, Control } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material';
import { Input } from '../../input/components/Input';
import type { CharacterLimit, FormattingMode, InputSize, InputType } from '../../input/types/input.types';

interface FormFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'error'> {
  name: FieldPath<T>;
  control?: Control<T>;
  InputType?: InputType;
  FormattingMode?: FormattingMode
  InputSize?: InputSize
  CharacterLimit?: CharacterLimit
  onFocus?: () => void; 
}

export function FormField<T extends FieldValues>({
  name,
  control,
  ...textFieldProps
}: FormFieldProps<T>) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error }
  } = useController({
    name,
    control
  });
  return (
    <>
    <Input
      {...textFieldProps}
      label={name}
      value={value || ''}
      onInput={onChange}
      tabIndex={0}
      onBlur={onBlur}
      error={!!error}
      onFocus={textFieldProps.onFocus}
      InputType={textFieldProps.InputType}
      InputSize={textFieldProps.InputSize}
      CharacterLimit={textFieldProps.CharacterLimit}
      FormattingMode={textFieldProps.FormattingMode}
      disabled={textFieldProps.disabled}
      className={textFieldProps.className || ''}
      helperText={error?.message}
    />
    </>
  );
}

export type { FormFieldProps };
