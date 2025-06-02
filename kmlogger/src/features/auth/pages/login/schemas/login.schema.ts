import { z } from 'zod';
import { createValidationMessage } from '../../../../../shared/types/errors-validation.types';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, createValidationMessage('Email').required)
    .max(100, createValidationMessage('Email').maxLength(100))
    .email(createValidationMessage('Email').invalidEmail),
  password: z
    .string()
    .min(1, createValidationMessage('Password').required)
    .min(6, createValidationMessage('Password').minLength(6))
    .max(50, createValidationMessage('Password').maxLength(50))
});

export type LoginFormData = z.infer<typeof loginSchema>;
