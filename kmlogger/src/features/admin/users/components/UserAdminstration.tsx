import { Box, Typography, Paper, Button } from '@mui/material';
import { 
  People as UsersIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon 
} from '@mui/icons-material';

export function UserAdministration() {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        mb: '2rem' 
      }}>
        <UsersIcon sx={{ 
          color: 'var(--primary)', 
          fontSize: '2rem' 
        }} />
        <Typography variant="h4" sx={{ 
          color: 'var(--text-primary)',
          fontWeight: 600 
        }}>
          User Administration
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        gap: '1rem',
        mb: '2rem' 
      }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: 'var(--primary)',
            '&:hover': {
              backgroundColor: 'var(--primary-hover)'
            }
          }}
        >
          Add New User
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
            '&:hover': {
              borderColor: 'var(--primary)',
              color: 'var(--primary)'
            }
          }}
        >
          Bulk Edit
        </Button>
      </Box>

      {/* ✅ Content */}
      <Paper sx={{
        p: '2rem',
        background: 'var(--background-card)',
        border: '1px solid var(--border)',
        borderRadius: '0.5rem'
      }}>
        <Typography variant="h6" sx={{ 
          color: 'var(--text-primary)',
          mb: '1rem' 
        }}>
          Users List
        </Typography>
        
        <Typography sx={{ 
          color: 'var(--text-secondary)' 
        }}>
          🎉 Parabéns! Você acessou a área de administração.
          <br />
          Aqui você pode gerenciar usuários, roles e configurações do sistema.
        </Typography>

        {/* ✅ Aqui você pode adicionar uma tabela, formulários, etc */}
        <Box sx={{ 
          mt: '2rem',
          p: '1rem',
          backgroundColor: 'var(--surface-hover)',
          borderRadius: '0.5rem'
        }}>
          <Typography variant="body2" sx={{ 
            color: 'var(--text-muted)',
            fontStyle: 'italic'
          }}>
            💡 Próximos passos: Implementar tabela de usuários, formulários de cadastro/edição, 
            gerenciamento de roles, etc.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}