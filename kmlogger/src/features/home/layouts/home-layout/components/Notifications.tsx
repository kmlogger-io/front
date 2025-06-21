import { Menu, MenuItem, ListItemIcon, ListItemText, Divider, Typography, Box } from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  MarkAsUnread as UnreadIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';

interface NotificationItem {
  icon: ReactElement;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
  path?: string;
}

interface NotificationsMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export function NotificationsMenu({ anchorEl, open, onClose }: NotificationsMenuProps) {
  const navigate = useNavigate();

  const handleNotificationClick = (item: NotificationItem) => {
    if (item.path) {
      navigate(item.path);
    }
    onClose();
  };

  const notifications: NotificationItem[] = [
    {
      icon: <WarningIcon sx={{ color: 'var(--warning)' }} />,
      title: 'System Alert',
      message: 'High CPU usage detected',
      time: '2 min ago',
      unread: true,
      path: '/alerts'
    },
    {
      icon: <InfoIcon sx={{ color: 'var(--info)' }} />,
      title: 'Update Available',
      message: 'New version 2.1.0 is ready',
      time: '1 hour ago',
      unread: true,
      path: '/updates'
    },
    {
      icon: <SuccessIcon sx={{ color: 'var(--success)' }} />,
      title: 'Backup Complete',
      message: 'Daily backup finished successfully',
      time: '3 hours ago',
      unread: false,
      path: '/backups'
    }
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
          width: '20rem',
          maxHeight: '25rem',
          background: 'var(--background-card)',
          border: '1px solid var(--border)',
          borderRadius: '0.5rem',
          boxShadow: 'var(--shadow-md)',
          '& .MuiMenuItem-root': {
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            py: '0.75rem',
            px: '1rem',
            alignItems: 'flex-start',
            '&:hover': {
              backgroundColor: 'var(--surface-hover)',
            },
            '&.unread': {
              backgroundColor: 'var(--primary-subtle)',
              borderLeft: '3px solid var(--primary)'
            }
          },
          '& .MuiListItemIcon-root': {
            color: 'inherit',
            minWidth: '2.5rem',
            marginTop: '0.25rem'
          }
        }
      }}
    >
      <Box sx={{ 
        px: '1rem', 
        py: '0.75rem', 
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <NotificationsIcon sx={{ fontSize: '1.25rem', color: 'var(--primary)' }} />
        <Typography variant="h6" sx={{ 
          fontSize: '1rem', 
          fontWeight: 600,
          color: 'var(--text-primary)'
        }}>
          Notifications
        </Typography>
      </Box>
      
      {notifications.map((item, index) => (
        <MenuItem
          key={index}
          onClick={() => handleNotificationClick(item)}
          className={item.unread ? 'unread' : ''}
          sx={{ 
            flexDirection: 'column',
            alignItems: 'stretch !important',
            minHeight: '4rem'
          }}
        >
          <Box sx={{ display: 'flex', width: '100%', gap: '0.75rem' }}>
            <Box sx={{ flexShrink: 0, mt: '0.25rem' }}>
              {item.icon}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: '0.25rem'
              }}>
                <Typography variant="subtitle2" sx={{
                  fontWeight: item.unread ? 600 : 500,
                  color: item.unread ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontSize: '0.875rem'
                }}>
                  {item.title}
                </Typography>
                {item.unread && (
                  <UnreadIcon sx={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--primary)',
                    ml: '0.5rem'
                  }} />
                )}
              </Box>
              <Typography variant="body2" sx={{
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                lineHeight: 1.3,
                mb: '0.25rem'
              }}>
                {item.message}
              </Typography>
              <Typography variant="caption" sx={{
                color: 'var(--text-muted)',
                fontSize: '0.75rem'
              }}>
                {item.time}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
      ))}
      
      <Divider sx={{ borderColor: 'var(--border)' }} />
      
      <MenuItem 
        onClick={() => {
          navigate('/notifications');
          onClose();
        }}
        sx={{ 
          justifyContent: 'center',
          py: '0.75rem',
          color: 'var(--primary) !important',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: 'var(--primary-subtle)',
          }
        }}
      >
        View All Notifications
      </MenuItem>
    </Menu>
  );
}