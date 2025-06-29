import { useState } from 'react';
import { useQueryUserAdm } from './useUsersQuery.hook';
import { useSearchUserAdm } from './useSearchUserAdm';
import type { QueryParams } from '../../../../shared/components/table/roster/types/roster.types';
import { useUserMutations } from '../../mutations/useUserMutations';

export function useUserManagementComplete() {
  const queryFunction = useQueryUserAdm(); 
  const mutations = useUserMutations();     
  const search = useSearchUserAdm();
  
  const [sortState, setSortState] = useState<{
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }>({});

  const enhancedQueryFunction = (params: QueryParams) => {
    const enhancedParams = {
      ...params,
      search: search.debouncedSearchTerm || undefined,
      sortBy: sortState.sortBy,
      sortOrder: sortState.sortOrder
    };
    
    return queryFunction(enhancedParams);
  };

  const handleSort = (field: string) => {
    setSortState(prev => ({
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  return {
    queryFunction: enhancedQueryFunction,
    mutations,
    search,
    sort: {
      ...sortState,
      handleSort
    }
  };
}