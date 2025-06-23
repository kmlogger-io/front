import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { AdminPanelSettings as AdminIcon } from "@mui/icons-material";

export function AdminLayout() {
  return (
    <Box sx={{ 
      background: 'var(--background)',
      minHeight: '100vh'
    }}>
      <Box 
        component="header" 
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          px: '2rem',
          py: '1rem',
          borderBottom: '1px solid var(--border)',
          background: 'var(--background-card)',
        }}
      >
        <AdminIcon sx={{ 
          color: 'var(--warning)', 
          fontSize: '1.5rem' 
        }} />
        <Typography variant="h6" sx={{ 
          color: 'var(--text-primary)',
          fontWeight: 600 
        }}>
          Administration Panel
        </Typography>
        
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="body2" sx={{ 
            color: 'var(--text-secondary)' 
          }}>
            Admin Access Only
          </Typography>
        </Box>
      </Box>

      <Box 
        component="main" 
        sx={{ 
          flex: 1,
          p: '2rem',
          background: 'var(--background)',
          color: 'var(--text-primary)'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}