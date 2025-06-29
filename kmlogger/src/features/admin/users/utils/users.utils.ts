import { either } from 'fp-ts';
import type { DomainRecordsDtosUserDto } from '../../../../client/dist/models';
import type { UseCasesUserRegisterRequest, UseCasesUserUpdateRequest } from '../../../../client/src';
import type { UserFormInput } from '../schemas/user.schema';
import { splitFullName } from '../schemas/user.schema';
import { createSafeFunction } from '../../../../shared/fp-ts/create-function-safe';

// Tipos para erros de mapeamento
export interface UserMappingError {
  type: 'USER_MAPPING_ERROR';
  message: string;
  originalData?: unknown;
}

/**
 * Função interna para converter dados da API para dados do formulário
 */
function _tryApiUserToFormInput(apiUser: DomainRecordsDtosUserDto): either.Either<UserMappingError, UserFormInput> {
  try {
    if (!apiUser) {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: 'Dados do usuário são nulos ou indefinidos',
        originalData: apiUser
      });
    }

    if (!apiUser.id) {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: 'ID do usuário é obrigatório',
        originalData: apiUser
      });
    }

    if (!apiUser.name || typeof apiUser.name !== 'string') {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: 'Nome do usuário é obrigatório e deve ser uma string',
        originalData: apiUser
      });
    }

    if (!apiUser.email || typeof apiUser.email !== 'string') {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: 'Email do usuário é obrigatório e deve ser uma string',
        originalData: apiUser
      });
    }

    // Conversão segura dos roles
    const roleIds: string[] = [];
    if (apiUser.roles && Array.isArray(apiUser.roles)) {
      for (const role of apiUser.roles) {
        if (role && role.id && typeof role.id === 'string') {
          roleIds.push(role.id);
        }
      }
    }

    const result: UserFormInput = {
      id: apiUser.id,
      name: apiUser.name.trim(), // API retorna nome completo
      email: apiUser.email.trim().toLowerCase(),
      active: Boolean(apiUser.active),
      roleIds
    };

    return either.right(result);
  } catch (error) {
    return either.left({
      type: 'USER_MAPPING_ERROR',
      message: `Erro inesperado no mapeamento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      originalData: apiUser
    });
  }
}

/**
 * Função interna para converter dados do formulário para requisição de criação
 */
function _tryFormInputToCreateRequest(formInput: UserFormInput): either.Either<UserMappingError, UseCasesUserRegisterRequest> {
  try {
    if (!formInput) {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: 'Dados do formulário são nulos ou indefinidos',
        originalData: formInput
      });
    }

    if (!formInput.name || typeof formInput.name !== 'string') {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: 'Nome é obrigatório para criação',
        originalData: formInput
      });
    }

    if (!formInput.email || typeof formInput.email !== 'string') {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: 'Email é obrigatório para criação',
        originalData: formInput
      });
    }

    if (!formInput.roleIds || !Array.isArray(formInput.roleIds) || formInput.roleIds.length === 0) {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: 'Pelo menos um perfil é obrigatório',
        originalData: formInput
      });
    }

    // Dividir nome completo em firstName e lastName
    const { firstName, lastName } = splitFullName(formInput.name);

    if (!firstName) {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: 'Primeiro nome é obrigatório',
        originalData: formInput
      });
    }

    // Mapear para a estrutura que a API espera
    const result: UseCasesUserRegisterRequest = {
      firstName: firstName,
      lastName: lastName || '', // Se não tiver lastName, enviar string vazia
      email: formInput.email.trim().toLowerCase(),
      rolesId: formInput.roleIds.filter(id => id && typeof id === 'string')
    };

    return either.right(result);
  } catch (error) {
    return either.left({
      type: 'USER_MAPPING_ERROR',
      message: `Erro inesperado na criação: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      originalData: formInput
    });
  }
}

/**
 * Função interna para converter dados do formulário para requisição de atualização
 */
function _tryFormInputToUpdateRequest(formInput: UserFormInput): either.Either<UserMappingError, UseCasesUserUpdateRequest> {
  try {
    if (!formInput) {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: 'Dados do formulário são nulos ou indefinidos',
        originalData: formInput
      });
    }

    if (!formInput.id) {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: 'ID é obrigatório para atualização',
        originalData: formInput
      });
    }

    const result: UseCasesUserUpdateRequest = {
        userId: formInput.id,
        rolesId: []
    };

    // Adicionar campos opcionais se fornecidos
    if (formInput.name && typeof formInput.name === 'string') {
      const { firstName, lastName } = splitFullName(formInput.name);
      if (firstName) {
        result.firstName = firstName;
        result.lastName = lastName || '';
      }
    }


    if (formInput.roleIds && formInput.roleIds.length > 0) {
      result.rolesId = formInput.roleIds.filter(id => id && typeof id === 'string');
    }

    return either.right(result);
  } catch (error) {
    return either.left({
      type: 'USER_MAPPING_ERROR',
      message: `Erro inesperado na atualização: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      originalData: formInput
    });
  }
}

/**
 * Função interna para converter lista de usuários da API
 */
function _tryApiUsersToFormInputList(apiUsers: DomainRecordsDtosUserDto[]): either.Either<UserMappingError, UserFormInput[]> {
  try {
    if (!apiUsers || !Array.isArray(apiUsers)) {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: 'Lista de usuários deve ser um array',
        originalData: apiUsers
      });
    }

    const results: UserFormInput[] = [];
    const errors: string[] = [];

    for (let i = 0; i < apiUsers.length; i++) {
      const userResult = _tryApiUserToFormInput(apiUsers[i]);
      
      if (either.isRight(userResult)) {
        results.push(userResult.right);
      } else {
        errors.push(`Usuário ${i}: ${userResult.left.message}`);
      }
    }

    if (errors.length > 0 && results.length === 0) {
      return either.left({
        type: 'USER_MAPPING_ERROR',
        message: `Falha ao converter todos os usuários: ${errors.join(', ')}`,
        originalData: apiUsers
      });
    }

    return either.right(results);
  } catch (error) {
    return either.left({
      type: 'USER_MAPPING_ERROR',
      message: `Erro inesperado na conversão da lista: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      originalData: apiUsers
    });
  }
}

export const tryApiUserToFormInput = createSafeFunction(_tryApiUserToFormInput);
export const tryFormInputToCreateRequest = createSafeFunction(_tryFormInputToCreateRequest);
export const tryFormInputToUpdateRequest = createSafeFunction(_tryFormInputToUpdateRequest);
export const tryApiUsersToFormInputList = createSafeFunction(_tryApiUsersToFormInputList);

export const defaultUserFormInput: UserFormInput = {
  id: '',
  name: '',
  email: '',
  active: true,
  roleIds: []
};

export const defaultCreateRequest: UseCasesUserRegisterRequest = {
  firstName: '',
  lastName: '',
  email: '',
  rolesId: []
};

export const defaultUpdateRequest: UseCasesUserUpdateRequest = {
  userId: '',
  firstName: '',
  lastName: '',
  rolesId: []
};

export const tryApiUserToFormInputWithDefault = (apiUser: DomainRecordsDtosUserDto) =>
  tryApiUserToFormInput(apiUser).or(defaultUserFormInput);

export const tryFormInputToCreateRequestWithDefault = (formInput: UserFormInput) =>
  tryFormInputToCreateRequest(formInput).or(defaultCreateRequest);

export const tryFormInputToUpdateRequestWithDefault = (formInput: UserFormInput) =>
  tryFormInputToUpdateRequest(formInput).or(defaultUpdateRequest);

export const tryApiUsersToFormInputListWithDefault = (apiUsers: DomainRecordsDtosUserDto[]) =>
  tryApiUsersToFormInputList(apiUsers).or([]);