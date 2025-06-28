import type { AccessorColumnDef } from '@tanstack/react-table'
import type { DomainRecordsDtosUserDto } from '../../../../client/dist/models'
import Box from '@mui/material/Box'

const Badge = ({ 
  children, 
  variant = 'default' 
}: { 
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'destructive' 
}) => {
  const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800", 
    destructive: "bg-red-100 text-red-800"
  }
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}

export const userTableColumns: AccessorColumnDef<DomainRecordsDtosUserDto, any>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    meta: { dataType: 'string', alignment: 'left' },
    cell: ({ getValue }) => (
      <Box className="font-medium">{getValue() as string || 'N/A'}</Box>
    )
  },
  {
    accessorKey: 'email',
    header: 'Email',
    meta: { dataType: 'string', alignment: 'left' },
    cell: ({ getValue }) => (
      <Box className="text-gray-600">{getValue() as string || 'N/A'}</Box>
    )
  },
  {
    accessorKey: 'roles',
    header: 'Roles',
    meta: { dataType: 'string', alignment: 'center' },
    cell: ({ getValue }) => {
      const roles = getValue() as DomainRecordsDtosUserDto['roles'] || []
      return (
        <Box className="flex flex-wrap gap-1 justify-center">
          {roles.length > 0 ? (
            roles.map((role, index) => (
              <Badge key={index} variant="secondary">
                {role?.name || 'Unknown'}
              </Badge>
            ))
          ) : (
            <span className="text-gray-400">No roles</span>
          )}
        </Box>
      )
    }
  },
  {
    accessorKey: 'active',
    header: 'Status',
    meta: { dataType: 'string', alignment: 'center' },
    cell: ({ getValue }) => {
      const isActive = getValue() as boolean
      return (
        <Badge variant={isActive ? "default" : "destructive"}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    }
  }
]