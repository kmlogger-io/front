import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z, ZodTypeAny } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseTextField } from '../../inputs/BaseTextField';
import GenericButton from '../../buttons/generic/GenericButton';

interface FormBuilderProps<T extends ZodTypeAny> {
  schema: T;
  onSubmit: (values: z.infer<T>) => void;
  textSubmit?: string;
  loadingText?: string;
}

const FormBuilder = <T extends ZodTypeAny>({ schema, onSubmit, textSubmit, loadingText } : FormBuilderProps<T>) => {
  const { control, handleSubmit, formState, reset } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (formState.isSubmitted) {
      reset();
    }
  }, [formState.isSubmitted, reset]);

  const shape = (schema as any)._def.shape();
  const fields = Object.keys(shape);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => {
        const zodField = shape[field];
        return (
          <BaseTextField
            key={field}
            name={field as import('react-hook-form').Path<z.infer<T>>}
            control={control}
            zodField={zodField}
            fullWidth
          />
        );
      })}
      <GenericButton
        onClick={handleSubmit(onSubmit)}
        text={textSubmit || 'Submit'}
        loadingText={loadingText || 'Loading...'}
        isLoading={formState.isSubmitting}
        isSuccess={!!formState.isSubmitSuccessful}
        isError={!!formState.errors && Object.keys(formState.errors).length > 0 && formState.isSubmitted}
        disabled={!formState.isValid || formState.isSubmitting}
        className="mt-4"
      />
    </form>
  );
};

export default FormBuilder;
