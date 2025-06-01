import { useForm } from 'react-hook-form';
import type { UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema } from 'zod';

export interface UseFormBuilderProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void | Promise<void>;
}

export interface UseFormBuilderReturn<T extends FieldValues> extends UseFormReturn<T> {
  onSubmitHandler: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  isValid: boolean;
}

export function useFormBuilder<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit
}: UseFormBuilderProps<T>): UseFormBuilderReturn<T> {

    //Cria instância  do hook useForm com validação Zod
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',   

  });

  // Extrai métodos e estados necessários do form
  const {
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = form;


  // Define o manipulador de envio do formulário
  const onSubmitHandler = handleSubmit(async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  });

  return {
    ...form,
    onSubmitHandler,
    isSubmitting,
    isValid
  };
}