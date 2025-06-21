import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {
  AccountCircle as ProfileIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';

interface ProfileMenuItem {
  icon: ReactElement;
  text: string;
  path?: string;
  action?: () => void;
  divider?: boolean;
}

interface ProfileMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export function ProfileMenu({ anchorEl, open, onClose }: ProfileMenuProps) {
  const navigate = useNavigate();

  const handleItemClick = (item: ProfileMenuItem) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
    onClose();
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const profileMenuItems: ProfileMenuItem[] = [
    { icon: <ProfileIcon />, text: 'My Profile', path: '/profile' },
    { icon: <SettingsIcon />, text: 'Settings', path: '/settings' },
    { icon: <HelpIcon />, text: 'Help & Support', path: '/help' },
    { icon: <LogoutIcon />, text: 'Logout', action: handleLogout, divider: true }
  ];

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
            className={item.text === 'Logout' ? 'logout-item' : ''}
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