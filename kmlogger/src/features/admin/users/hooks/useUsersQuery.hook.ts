/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../../../shared/enums/query-keys.enums';
import { apiClient } from '../../../../shared/services/apiService';
import { useSnackbar } from '../../../../shared/hooks/useSnackbar.hook';
import type { QueryParams, QueryResult } from '../../../../shared/components/table/roster';
import type { UserFormInput } from '../schemas/user.schema';
import { tryApiUsersToFormInputListWithDefault } from '../utils/users.utils';
import type { BaseResponsePaginatedResultDomainRecordsDtosUserDto } from '../../../../client/src';



export function useQueryUserAdm() {
  const { showError } = useSnackbar();

  return (params: QueryParams) => {
    return useQuery({
      queryFn: async (): Promise<QueryResult<UserFormInput>> => {
        try {
          const response = await apiClient.callAuthenticatedComplete(
            (client) => client.userGetAll({
              page: params.page + 1, 
              pageSize: params.pageSize,
              search: params.search,
              sortBy: params.sortBy,
              sortOrder: params.sortOrder
            }),
            {
              showMessages: false,
              showError,
            }
          ) as BaseResponsePaginatedResultDomainRecordsDtosUserDto;

          if (response && response.data && Array.isArray(response.data.data)) {
            const safeUsers = tryApiUsersToFormInputListWithDefault(response.data.data);
            const result = {
              data: safeUsers,
              totalCount: response.data.totalCount || 0,
              page: params.page, 
              pageSize: response.data.pageSize || params.pageSize
            };
            return result;
          }
          return {
            data: [],
            totalCount: 0,
            page: params.page,
            pageSize: params.pageSize
          };
        } catch (error) {
          console.error('Erro na query de usuários:', error);
          return {
            data: [],
            totalCount: 0,
            page: params.page,
            pageSize: params.pageSize
          };
        }
      },
      queryKey: [
        QueryKeys.USERS_ADM,
        params.page,
        params.pageSize,
        params.search,
        params.sortBy,
        params.sortOrder
      ],
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });
  };
}