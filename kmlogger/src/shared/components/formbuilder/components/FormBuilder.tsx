import React from 'react';
import { FormProvider } from 'react-hook-form';
import type { FieldValues, DefaultValues } from 'react-hook-form';
import type { ZodSchema } from 'zod';
import { useFormBuilder } from '../hooks/useFormbuilder.hook';
import { Box, Typography } from '@mui/material';
import { ButtonSubmit } from '../../button-submit/components/ButtonSubmit';
import { Logo } from '../../logo/components/Logo';
import { FormContainer, HeaderSection, LogoContainer, FormCard, ExtraLinks } from '../styles/styles';

interface FormBuilderProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  onSubmit: (data: T) => void | Promise<void>;
  defaultValues?: DefaultValues<T>;
  children: React.ReactNode;
  submitButtonText?: string;
  showSubmitButton?: boolean;
  extralinks?: string[];
  className?: string;
  title?: string;
  subTitle?: string;
}

export function FormBuilder<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  children,
  submitButtonText = 'Enviar',
  showSubmitButton = true,
  extralinks,
  className,
  title = 'Formulário',
  subTitle = 'Preencha os campos abaixo',
}: FormBuilderProps<T>) {
  //Chama o hook useFormBuilder para gerenciar o formulário
  const formMethods = useFormBuilder({
    schema,
    defaultValues,
    onSubmit,
  });

  const { onSubmitHandler, isValid } = formMethods;

  return (
    <FormContainer>
      <HeaderSection>
        <LogoContainer>
          <Logo />
        </LogoContainer>

        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'var(--text-primary)',
              fontSize: { xs: '2rem', sm: '2.5rem' },
              letterSpacing: '-0.02em',
              mb: 1,
              background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--primary-light) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              fontWeight: 400,
              maxWidth: 300,
              lineHeight: 1.6,
            }}
          >
           {subTitle}
          </Typography>
        </Box>
      </HeaderSection>

      <FormProvider {...formMethods}>
        <FormCard as="form" onSubmit={onSubmitHandler} className={className}>
          {children}
          {showSubmitButton && (
            <Box sx={{ mt: 2, pt: 1, width: '100%' }}>
              <ButtonSubmit
                disabled={!isValid}
                size="large"
                variant="contained"
                className="w-full h-14 text-lg font-semibold"
              >
                {submitButtonText}
              </ButtonSubmit>
            </Box>
          )}

          {extralinks && (
            <ExtraLinks>
              {extralinks.map((link: string, index: number) => (
                <Typography
                  key={index}
                  component="a"
                  href="#"
                  variant="body2"
                >
                  {link}
                </Typography>
              ))}
            </ExtraLinks>
          )}
        </FormCard>
      </FormProvider>
    </FormContainer>
  );
}

export type { FormBuilderProps };