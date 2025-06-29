import { z } from "zod";

export const userFormSchema = z.object({
  id: z.string().optional(),
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string()
    .email('Email inválido')
    .toLowerCase(),
  active: z.boolean(),
  roleIds: z.array(z.string()).min(1, 'Selecione pelo menos um perfil')
});

export const userCreateSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string()
    .email('Email inválido')
    .toLowerCase(),
  active: z.boolean().default(true),
  roleIds: z.array(z.string()).min(1, 'Selecione pelo menos um perfil')
});

export const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .optional(),
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .optional(),
  active: z.boolean().optional(),
  roleIds: z.array(z.string()).min(1, 'Selecione pelo menos um perfil').optional()
});

export type UserFormData = z.infer<typeof userFormSchema>;
export type UserCreateData = z.infer<typeof userCreateSchema>;
export type UserUpdateData = z.infer<typeof userUpdateSchema>;

export interface UserFormInput {
  id?: string;
  name: string;
  email: string;
  active: boolean;
  roleIds: string[];
}

export const splitFullName = (fullName: string): { firstName: string; lastName: string } => {
  const trimmedName = fullName.trim();
  const nameParts = trimmedName.split(' ');
  
  if (nameParts.length === 1) {
    return {
      firstName: nameParts[0],
      lastName: ''
    };
  }
  
  return {
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(' ')
  };
};

export const joinFullName = (firstName: string, lastName: string): string => {
  const first = firstName?.trim() || '';
  const last = lastName?.trim() || '';
  
  if (!first && !last) return '';
  if (!first) return last;
  if (!last) return first;
  
  return `${first} ${last}`;
};

export const createDefaultUserFormData = (): UserFormInput => ({
  name: '',
  email: '',
  active: true,
  roleIds: []
});

export const validateUserFormData = (data: unknown): UserFormData => {
  return userFormSchema.parse(data);
};

export const prepareUserCreateData = (formData: UserFormInput): UserCreateData => {
  const { id, ...dataWithoutId } = formData;
  return userCreateSchema.parse(dataWithoutId);
};

export const prepareUserUpdateData = (formData: UserFormInput): UserUpdateData => {
  return userUpdateSchema.parse(formData);
};