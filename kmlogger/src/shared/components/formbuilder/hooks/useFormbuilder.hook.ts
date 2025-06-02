import { useForm } from 'react-hook-form';
import type { UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema } from 'zod';
import { useNavigate } from 'react-router-dom';

export interface UseFormBuilderProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void | Promise<void>;
}

export interface UseFormBuilderReturn<T extends FieldValues> extends UseFormReturn<T> {
  onSubmitHandler: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  isValid: boolean;
  handleNavigation: (path: string) => void;
}

export function useFormBuilder<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit
}: UseFormBuilderProps<T>): UseFormBuilderReturn<T> {
  const navigate = useNavigate();

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

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return {
    ...form,
    onSubmitHandler,
    isSubmitting,
    isValid,
    handleNavigation
  };
}