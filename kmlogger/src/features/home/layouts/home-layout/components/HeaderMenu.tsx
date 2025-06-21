import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { 
  Apps as AppsIcon, 
  Category as CategoryIcon, 
  Psychology as AiIcon,
  Settings,
  Analytics,
  Computer,
  Cloud,
  Memory
} from '@mui/icons-material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import DangerousIcon from '@mui/icons-material/Dangerous';
import type { ReactElement } from 'react';

interface MenuItem {
  icon: ReactElement;
  text: string;
  path: string;
}

interface MenuItems {
  applications: MenuItem[];
  categories: MenuItem[];
  environments:MenuItem[];
  ai: MenuItem[];
}

interface HeaderMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  type: keyof MenuItems;
}

export function HeaderMenu({ anchorEl, open, onClose, type }: HeaderMenuProps) {
  const menuItems: MenuItems = {
    applications: [
      { icon: <ErrorIcon />, text: 'Alerts', path: '/alerts' },
      { icon: <WarningIcon />, text: 'Warnings', path: '/warnings' },
      { icon: <InfoIcon />, text: 'Infos', path: '/informations' },
      { icon: <DangerousIcon />, text: 'Critical', path: '/critical' },
    ],
    environments: [
      { icon: <ErrorIcon />, text: 'Alerts', path: '/alerts' },
      { icon: <WarningIcon />, text: 'Warnings', path: '/warnings' },
      { icon: <InfoIcon />, text: 'Infos', path: '/informations' },
      { icon: <DangerousIcon />, text: 'Critical', path: '/critical' },
    ],
    categories: [
      { icon: <Computer />, text: 'Apis', path: '/apis' },
      { icon: <Cloud />, text: 'Cloud Services', path: '/cloud-services' },
      { icon: <Memory />, text: 'Development', path: '/dev' }
    ],
    ai: [
      { icon: <AiIcon />, text: 'AI Assistant', path: '/km-ai' },
    ]
  };

  const items = menuItems[type] || [];

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        sx: {
          mt: '0.5rem',
          minWidth: '12.5rem',
          background: 'var(--background-card)',
          border: '1px solid var(--border)',
          borderRadius: '0.5rem',
          boxShadow: 'var(--shadow-md)',
          '& .MuiMenuItem-root': {
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            py: '0.75rem',
            px: '1rem',
            '&:hover': {
              backgroundColor: 'var(--surface-hover)',
              color: 'var(--primary)'
            }
          },
          '& .MuiListItemIcon-root': {
            color: 'var(--text-secondary)',
            minWidth: '2.25rem'
          }
        }
      }}
    >
      {items.map((item: MenuItem, index: number) => (
        <MenuItem 
          key={index} 
          onClick={onClose}
        >
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </MenuItem>
      ))}
    </Menu>
  );
}