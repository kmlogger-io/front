import { 
  Input, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  InputAdornment,
  IconButton,
  Box
} from '@mui/material'
import { Search, Clear } from '@mui/icons-material'
import { Button } from '../../../../shared/components/button/button'

export interface UserAdministrationFilters {
  search?: string
  active?: boolean
  role?: string
}

interface Props {
  filters: UserAdministrationFilters
  onFiltersChange: (filters: UserAdministrationFilters) => void
}

export function UserAdministrationFilters({ filters, onFiltersChange }: Props) {
  const clearFilters = () => onFiltersChange({})
  const hasActiveFilters = Object.values(filters).some(Boolean)

  return (
    <Box className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
      <Box className="flex-1">
        <FormControl fullWidth variant="outlined" size="small">
          <Input
            placeholder="Search by name or email..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            startAdornment={
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            }
            endAdornment={
              filters.search && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => onFiltersChange({ ...filters, search: '' })}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </FormControl>
      </Box>
      
      <FormControl variant="outlined" size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.active === undefined ? 'all' : filters.active.toString()}
          onChange={(e) => 
            onFiltersChange({ 
              ...filters, 
              active: e.target.value === 'all' ? undefined : e.target.value === 'true' 
            })
          }
          label="Status"
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="true">Active</MenuItem>
          <MenuItem value="false">Inactive</MenuItem>
        </Select>
      </FormControl>
      
      {/* Filtro de role */}
      <Box className="w-40">
        <FormControl fullWidth variant="outlined" size="small">
          <Input
            placeholder="Filter by role..."
            value={filters.role || ''}
            onChange={(e) => onFiltersChange({ ...filters, role: e.target.value })}
            endAdornment={
              filters.role && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => onFiltersChange({ ...filters, role: '' })}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        </FormControl>
      </Box>
      
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Clear fontSize="small" />
          Clear All
        </Button>
      )}
    </Box>
  )
}