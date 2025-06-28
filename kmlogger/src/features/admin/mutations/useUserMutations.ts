import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from '../../../shared/enums/query-keys.enums'
import { apiClient } from '../../../shared/services/apiService'
import { useSnackbar } from '../../../shared/hooks/useSnackbar.hook'

export function useUserMutations() {
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useSnackbar()

  const deleteUser = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await apiClient.callAuthenticatedComplete(
        (client) => client.userDelete({ id }),
        {
          showMessages: true,
          showSuccess,
          showError,
        }
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS_ADM] })
    }
  })
  return {
    deleteUser,
  }
}