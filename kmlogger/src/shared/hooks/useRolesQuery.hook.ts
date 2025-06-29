import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../enums/query-keys.enums';
import { apiClient } from '../services/apiService';
import { useSnackbar } from './useSnackbar.hook';
import type { BaseResponsePaginatedResultDomainRecordsDtosRoleDto } from '../../client/src';

export function useRolesQuery() {
  const { showError } = useSnackbar();

  return useQuery({
    queryKey: [QueryKeys.ROLES], 
    queryFn: async () => {
      const response = await apiClient.callAuthenticatedComplete(
        (client) => client.roleGetAll({
            page: 0, 
            pageSize: 1000, 
            search: '', 
            sortBy: 'name', 
            sortOrder: 'asc', 
        }),
        {
          showMessages: false,
          showError,
        }
      ) as BaseResponsePaginatedResultDomainRecordsDtosRoleDto;

      if (response && response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      
      if (Array.isArray(response)) {
        return response;
      }

      return [];
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}