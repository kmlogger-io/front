import { Plus } from 'lucide-react'
import { UserAdministrationFilters } from './UserAdministrationFilters'
import { useUserAdministrationTable } from '../hooks/useUserAdministrationTable'
import { Button } from '../../../../shared/components/button/button'
import { BasicTable } from '../../../../shared/components/table/basic-table/components/BasicTable'
import type { DomainRecordsDtosUserDto } from '../../../../client/src/models'
import Box from '@mui/material/Box'
import { PaginationProvider } from '../../../../shared/contexts/PaginationContext'

export function UserAdministration() {
  const {
    data,
    columns,
    query,
    filters,
    setFilters,
    handleViewUser,
    handleDeleteUser,
    deleteMutation
  } = useUserAdministrationTable()

  return (
    <PaginationProvider initialState={{ pageIndex: 0, itemsPerPage: 20 }}>
    <Box className="space-y-6">
      <Box className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">User Administration</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </Box>

      <UserAdministrationFilters
        filters={filters}
        onFiltersChange={setFilters}
      />
      
      <BasicTable<DomainRecordsDtosUserDto>
        data-testid="user-administration-table"
        data={data}
        extraColumns={columns}
        query={query}
        onView={handleViewUser}
        onDelete={handleDeleteUser}
        deleteMutation={deleteMutation}
        showButtons={['view', 'delete']} 
        deleteIconTitle="Delete User"
        className="w-full"
        loadingQueryClassName="min-h-[400px]"
        showPagination={true}
        shouldRenderCompact={false}
      />
    </Box>
     </PaginationProvider>
    
  )
}