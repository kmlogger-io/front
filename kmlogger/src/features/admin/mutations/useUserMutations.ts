import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '../../../shared/enums/query-keys.enums';
import { apiClient } from '../../../shared/services/apiService';
import { useSnackbar } from '../../../shared/hooks/useSnackbar.hook';
import type { UseCasesUserRegisterRequest, UseCasesUserUpdateRequest } from '../../../client/src';
import type { RosterMutations } from '../../../shared/components/table/roster';
import type { UserFormInput } from '../users/schemas/user.schema';
import { defaultUserFormInput, tryApiUserToFormInputWithDefault, tryFormInputToCreateRequestWithDefault, tryFormInputToUpdateRequestWithDefault } from '../users/utils/users.utils';

export function useUserMutations(): RosterMutations<UserFormInput> {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useSnackbar();

  const deleteUserMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await apiClient.callAuthenticatedComplete(
        (client) => client.userDelete({ id }),
        {
          showMessages: true,
          showSuccess,
          showError,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS_ADM] });
    },
    onError: (error) => {
      console.error('Erro ao deletar usuário:', error);
      showError('Erro ao deletar usuário');
    }
  });

  const createUserMutation = useMutation({
    mutationFn: async (data: UseCasesUserRegisterRequest) => {
      return await apiClient.callAuthenticatedComplete(
        (client) => client.userRegister({ body: data }),
        {
          showMessages: true,
          showSuccess,
          showError,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS_ADM] });
    },
    onError: (error) => {
      console.error('Erro ao criar usuário:', error);
      showError('Erro ao criar usuário');
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: UseCasesUserUpdateRequest) => {
      return await apiClient.callAuthenticatedComplete(
        (client) => client.userUpdate({ body: data }),
        {
          showMessages: true,
          showSuccess,
          showError,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS_ADM] });
    },
    onError: (error) => {
      console.error('Erro ao atualizar usuário:', error);
      showError('Erro ao atualizar usuário');
    }
  });

  return {
    create: async (formInput: UserFormInput): Promise<UserFormInput> => {
      try {
        const createRequest = tryFormInputToCreateRequestWithDefault(formInput);
        const result = await createUserMutation.mutateAsync(createRequest);
        
        if (result && typeof result === 'object' && 'id' in result) {
          return tryApiUserToFormInputWithDefault(result as any);
        }
        
        return { ...formInput, id: Date.now().toString() };
      } catch (error) {
        console.error('Erro na criação do usuário:', error);
        return { ...defaultUserFormInput, ...formInput };
      }
    },

    update: async (id: string | number, formInput: Partial<UserFormInput>): Promise<UserFormInput> => {
      try {
        const completeFormInput = { id: String(id), ...formInput } as UserFormInput;
        const updateRequest = tryFormInputToUpdateRequestWithDefault(completeFormInput);
        const result = await updateUserMutation.mutateAsync(updateRequest);
        
        if (result && typeof result === 'object' && 'id' in result) {
          return tryApiUserToFormInputWithDefault(result as any);
        }
        
        return completeFormInput;
      } catch (error) {
        console.error('Erro na atualização do usuário:', error);
        return { ...defaultUserFormInput, id: String(id), ...formInput };
      }
    },

    delete: async (id: string | number): Promise<void> => {
      try {
        await deleteUserMutation.mutateAsync({ id: String(id) });
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
      }
    }
  };
}
