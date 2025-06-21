import { Modal, Box, IconButton, InputBase } from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import { useHeaderStore } from '../stores/HeaderStore.store';

export function SearchModal() {
  const { searchModalOpen, closeSearchModal } = useHeaderStore();

  return (
    <Modal
      open={searchModalOpen}
      onClose={closeSearchModal}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        pt: '5rem'
      }}
    >
      <Box sx={{
        width: { xs: '90%', sm: '37.5rem' },
        background: 'var(--background-card)',
        borderRadius: '0.75rem',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)',
        p: 0,
        outline: 'none'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          p: '1rem',
          borderBottom: '1px solid var(--border)'
        }}>
          <SearchIcon sx={{ 
            color: 'var(--text-secondary)', 
            mr: '1rem',
            fontSize: '1.25rem'
          }} />
          <InputBase
            placeholder="Search for anything..."
            autoFocus
            sx={{ 
              flex: 1, 
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
              '& .MuiInputBase-input::placeholder': {
                color: 'var(--input-placeholder)',
                opacity: 1
              }
            }}
          />
          <IconButton 
            onClick={closeSearchModal} 
            size="small"
            sx={{
              color: 'var(--text-secondary)',
              '&:hover': {
                backgroundColor: 'var(--surface-hover)',
                color: 'var(--primary)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ 
          p: '2rem', 
          minHeight: '12.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Box sx={{ 
            color: 'var(--text-secondary)', 
            textAlign: 'center',
            fontSize: '0.875rem'
          }}>
            Start typing to search...
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}