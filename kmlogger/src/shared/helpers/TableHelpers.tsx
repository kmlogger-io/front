import {
  IconButton,
  Tooltip,
  Chip,
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material'
import { useState } from 'react'
import type { ReactNode } from 'react'

interface TableActionsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  showView?: boolean
  showEdit?: boolean
  showDelete?: boolean
  isDeleting?: boolean
  additionalActions?: Array<{
    icon: ReactNode
    label: string
    onClick: () => void
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  }>
}

export function TableActions({
  onView,
  onEdit,
  onDelete,
  showView = true,
  showEdit = true,
  showDelete = true,
  isDeleting = false,
  additionalActions = [],
}: TableActionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const actions = [
    { show: showView, icon: <VisibilityIcon />, label: 'Visualizar', onClick: onView, color: 'primary' as const },
    { show: showEdit, icon: <EditIcon />, label: 'Editar', onClick: onEdit, color: 'primary' as const },
    { show: showDelete, icon: <DeleteIcon />, label: 'Excluir', onClick: onDelete, color: 'error' as const },
    ...additionalActions.map(action => ({ show: true, ...action })),
  ].filter(action => action.show && action.onClick)

  if (actions.length === 0) return null

  if (actions.length <= 3) {
    return (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {actions.map((action, index) => (
          <Tooltip key={index} title={action.label}>
            <IconButton
              size="small"
              onClick={action.onClick}
              color={action.color}
              disabled={isDeleting && action.label === 'Excluir'}
            >
              {action.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    )
  }

  return (
    <>
      <Tooltip title="Mais ações">
        <IconButton size="small" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: { minWidth: 160 },
        }}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.onClick?.()
              handleClose()
            }}
            disabled={isDeleting && action.label === 'Excluir'}
          >
            <ListItemIcon sx={{ color: `${action.color}.main` }}>
              {action.icon}
            </ListItemIcon>
            <ListItemText>{action.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

// Componente para exibir status com cores
interface StatusChipProps {
  status: boolean | string | number
  labels?: {
    true?: string
    false?: string
    [key: string]: string | undefined
  }
  colors?: {
    true?: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary'
    false?: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary'
    [key: string]: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary' | undefined
  }
  variant?: 'filled' | 'outlined'
  size?: 'small' | 'medium'
}

export function StatusChip({
  status,
  labels = { true: 'Ativo', false: 'Inativo' },
  colors = { true: 'success', false: 'error' },
  variant = 'filled',
  size = 'small',
}: StatusChipProps) {
  const statusKey = String(status)
  const label = labels[statusKey] || statusKey
  const color = colors[statusKey] || 'default'

  return (
    <Chip
      label={label}
      color={color}
      variant={variant}
      size={size}
      icon={status ? <CheckCircleIcon /> : <CancelIcon />}
    />
  )
}

// Componente para exibir roles/tags
interface RoleChipsProps {
  roles: Array<{ name?: string; id?: string; [key: string]: any }>
  maxVisible?: number
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
  variant?: 'filled' | 'outlined'
  size?: 'small' | 'medium'
}

export function RoleChips({
  roles = [],
  maxVisible = 3,
  color = 'primary',
  variant = 'outlined',
  size = 'small',
}: RoleChipsProps) {
  if (roles.length === 0) {
    return (
      <Typography variant="caption" color="text.secondary" fontStyle="italic">
        Nenhuma role atribuída
      </Typography>
    )
  }

  const visibleRoles = roles.slice(0, maxVisible)
  const remainingCount = roles.length - maxVisible

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {visibleRoles.map((role, index) => (
        <Chip
          key={role.id || index}
          label={role.name || 'Role'}
          color={color}
          variant={variant}
          size={size}
        />
      ))}
      {remainingCount > 0 && (
        <Tooltip title={roles.slice(maxVisible).map(r => r.name).join(', ')}>
          <Chip
            label={`+${remainingCount}`}
            color="default"
            variant="outlined"
            size={size}
          />
        </Tooltip>
      )}
    </Box>
  )
}

// Componente para exibir informações de usuário
interface UserCellProps {
  name?: string
  email?: string
  avatar?: string
  showAvatar?: boolean
  showEmail?: boolean
  maxNameLength?: number
  maxEmailLength?: number
}

export function UserCell({
  name = 'N/A',
  email = '',
  avatar,
  showAvatar = true,
  showEmail = true,
  maxNameLength = 30,
  maxEmailLength = 40,
}: UserCellProps) {
  const truncatedName = name.length > maxNameLength ? `${name.slice(0, maxNameLength)}...` : name
  const truncatedEmail = email.length > maxEmailLength ? `${email.slice(0, maxEmailLength)}...` : email

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
      {showAvatar && (
        <Avatar
          src={avatar}
          sx={{ width: 32, height: 32 }}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar>
      )}
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          variant="body2"
          fontWeight={600}
          noWrap
          title={name !== truncatedName ? name : undefined}
        >
          {truncatedName}
        </Typography>
        {showEmail && email && (
          <Typography
            variant="caption"
            color="text.secondary"
            noWrap
            title={email !== truncatedEmail ? email : undefined}
          >
            {truncatedEmail}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

// Componente para exibir números formatados
interface NumberCellProps {
  value: number | string | null | undefined
  format?: 'currency' | 'percentage' | 'decimal' | 'integer'
  currency?: string
  locale?: string
  precision?: number
  prefix?: string
  suffix?: string
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'inherit'
}

export function NumberCell({
  value,
  format = 'decimal',
  currency = 'BRL',
  locale = 'pt-BR',
  precision = 2,
  prefix = '',
  suffix = '',
  color = 'inherit',
}: NumberCellProps) {
  if (value === null || value === undefined || value === '') {
    return (
      <Typography variant="body2" color="text.secondary" fontStyle="italic">
        N/A
      </Typography>
    )
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(numValue)) {
    return (
      <Typography variant="body2" color="text.secondary">
        {value}
      </Typography>
    )
  }

  let formattedValue: string

  switch (format) {
    case 'currency':
      formattedValue = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(numValue)
      break
    case 'percentage':
      formattedValue = new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(numValue)
      break
    case 'integer':
      formattedValue = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(numValue)
      break
    default:
      formattedValue = new Intl.NumberFormat(locale, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(numValue)
  }

  return (
    <Typography
      variant="body2"
      color={color}
      sx={{ fontFamily: 'monospace', textAlign: 'right' }}
    >
      {prefix}{formattedValue}{suffix}
    </Typography>
  )
}

// Componente para exibir datas formatadas
interface DateCellProps {
  date: string | Date | null | undefined
  format?: 'date' | 'datetime' | 'time' | 'relative'
  locale?: string
  customFormat?: Intl.DateTimeFormatOptions
}

export function DateCell({
  date,
  format = 'date',
  locale = 'pt-BR',
  customFormat,
}: DateCellProps) {
  if (!date) {
    return (
      <Typography variant="body2" color="text.secondary" fontStyle="italic">
        N/A
      </Typography>
    )
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) {
    return (
      <Typography variant="body2" color="text.secondary">
        Data inválida
      </Typography>
    )
  }

  let formattedDate: string

  if (customFormat) {
    formattedDate = new Intl.DateTimeFormat(locale, customFormat).format(dateObj)
  } else {
    switch (format) {
      case 'datetime':
        formattedDate = new Intl.DateTimeFormat(locale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }).format(dateObj)
        break
      case 'time':
        formattedDate = new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
        }).format(dateObj)
        break
      case 'relative':
        const now = new Date()
        const diffInMs = now.getTime() - dateObj.getTime()
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
        
        if (diffInDays === 0) {
          formattedDate = 'Hoje'
        } else if (diffInDays === 1) {
          formattedDate = 'Ontem'
        } else if (diffInDays < 7) {
          formattedDate = `${diffInDays} dias atrás`
        } else if (diffInDays < 30) {
          const weeks = Math.floor(diffInDays / 7)
          formattedDate = weeks === 1 ? '1 semana atrás' : `${weeks} semanas atrás`
        } else {
          formattedDate = new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(dateObj)
        }
        break
      default:
        formattedDate = new Intl.DateTimeFormat(locale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(dateObj)
    }
  }

  return (
    <Typography
      variant="body2"
      sx={{ fontFamily: 'monospace' }}
      title={dateObj.toLocaleString(locale)}
    >
      {formattedDate}
    </Typography>
  )
}