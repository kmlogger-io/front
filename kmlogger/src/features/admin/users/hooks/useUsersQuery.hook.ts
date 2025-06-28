import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../../../shared/enums/query-keys.enums'
import { apiClient } from '../../../../shared/services/apiService'
import { useSnackbar } from '../../../../shared/hooks/useSnackbar.hook'
import { tryConvertApiToTable } from '../../../../shared/functions/api-to-table'
import type { DomainRecordsDtosUserDto } from '../../../../client/dist/models'

export function useQueryUserAdm() {
  const { showSuccess, showError } = useSnackbar()

  return useQuery({
    queryFn: async () => {
      return await apiClient.callAuthenticatedComplete(
        (client) => client.userGetAll(),
        {
          showMessages: true,
          showSuccess,
          showError,
        }
      )
    },
    queryKey: [QueryKeys.USERS_ADM],
    select: (data) => {
      const typedData = data as any
      return tryConvertApiToTable<DomainRecordsDtosUserDto>()(typedData).or([])
    }
  })
}