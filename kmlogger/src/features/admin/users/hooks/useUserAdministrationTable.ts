import { useState, useMemo } from 'react'
import { userTableColumns } from '../config/columns.config'
import { useUserMutations } from '../../mutations/useUserMutations'
import type { UserAdministrationFilters } from '../components/UserAdministrationFilters'
import type { DomainRecordsDtosUserDto } from '../../../../client/src/models'
import { useQueryUserAdm } from './useUsersQuery.hook'

export function useUserAdministrationTable() {
  const [filters, setFilters] = useState<UserAdministrationFilters>({})
  
  const query = useQueryUserAdm()
  const mutations = useUserMutations()
  
  const filteredData = useMemo(() => {
    if (!query.data) return []
    
    return query.data.filter(user => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          (user.name?.toLowerCase().includes(searchLower)) ||
          (user.email?.toLowerCase().includes(searchLower))
        if (!matchesSearch) return false
      }
      
      if (filters.active !== undefined && user.active !== filters.active) {
        return false
      }
      if (filters.role && user.roles) {
        const hasRole = user.roles.some(role =>
          role?.name?.toLowerCase().includes(filters.role!.toLowerCase())
        )
        if (!hasRole) return false
      }
      
      return true
    })
  }, [query.data, filters])

  const handleViewUser = (user: DomainRecordsDtosUserDto) => {
    console.log('View user:', user)
  }

  // Handler para deletar (será chamado pelo BasicTable)
  const handleDeleteUser = async (userId: string) => {
    await mutations.deleteUser.mutateAsync({ id: userId })
  }

  return {
    data: filteredData,
    columns: userTableColumns,
    
    query: query, 
    
    filters,
    setFilters,
    
    handleViewUser,
    handleDeleteUser,
    
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isDeleting: mutations.deleteUser.isPending,
    
    deleteMutation: [
      {
        mutationFn: async ({ id }: { id: string }) => {
          return await mutations.deleteUser.mutateAsync({ id })
        },
      }
    ] as Parameters<typeof import('@tanstack/react-query').useMutation>
  }
}
