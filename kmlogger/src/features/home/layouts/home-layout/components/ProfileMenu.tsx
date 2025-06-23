import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {
  AccountCircle as ProfileIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../shared/hooks/useAuthContext.hook';
import { useRoles } from '../../../../../shared/hooks/useRoles.hook';
import type { ReactElement } from 'react';

interface ProfileMenuItem {
  icon: ReactElement;
  text: string;
  path?: string;
  action?: () => void;
  divider?: boolean;
  adminOnly?: boolean; // ✅ Nova propriedade para itens apenas para admin
}

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export function ProfileMenu({ anchorEl, open, onClose }: ProfileMenuProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isAdmin } = useRoles(); // ✅ Hook para verificar roles

  const handleItemClick = (item: ProfileMenuItem) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
    onClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/auth/login', { replace: true });
    }
  };

  const allProfileMenuItems: ProfileMenuItem[] = [
    { icon: <ProfileIcon />, text: 'My Profile', path: '/profile' },
    { icon: <SettingsIcon />, text: 'Settings', path: '/settings' },
    { 
      icon: <AdminIcon />, 
      text: 'User Administration', 
      path: '/admin/users', 
      adminOnly: true, 
      divider: true 
    },
    { icon: <HelpIcon />, text: 'Help & Support', path: '/help' },
    { icon: <LogoutIcon />, text: 'Logout', action: handleLogout, divider: true }
  ];

  const profileMenuItems = allProfileMenuItems.filter(item => {
    if (item.adminOnly && !isAdmin()) {
      return false;
    }
    return true;
  });

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
            },
            '&.logout-item': {
              color: 'var(--error)',
              '&:hover': {
                backgroundColor: 'var(--error)',
                color: '#ffffff'
              }
            }
          },
          '& .MuiListItemIcon-root': {
            color: 'inherit',
            minWidth: '2.25rem'
          }
        }
      }}
    >
      {profileMenuItems.map((item, index) => (
        <div key={index}>
          {item.divider && <Divider sx={{ my: '0.5rem', borderColor: 'var(--border)' }} />}
          <MenuItem
            onClick={() => handleItemClick(item)}
            className={
              item.text === 'Logout' ? 'logout-item' : 
              item.adminOnly ? 'admin-item' : ''
            }
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        </div>
      ))}
    </Menu>
  );
}