import { createTheme } from '@mui/material/styles';

export const customTableTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#AB47BC',
      light: '#AB47BC',
      dark: '#9E17B6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#AB47BC',
      light: '#AB47BC',
      dark: '#9E17B6',
    },
    background: {
      default: 'rgb(30, 30, 32)',
      paper: '#1e1e20',
    },
    surface: {
      main: '#252527',
    },
    text: {
      primary: '#AB47BC',
      secondary: '#b3b3b3',
      disabled: '#666666',
    },
    divider: '#3d3d42',
    action: {
      active: '#AB47BC',
      hover: 'rgba(171, 71, 188, 0.08)',
      selected: 'rgba(171, 71, 188, 0.12)',
      disabled: '#666666',
      disabledBackground: '#3d3d42',
    },
    success: {
      main: '#4caf50',
      light: '#c8e6c9',
      dark: '#388e3c',
    },
    error: {
      main: '#f44336',
      light: '#ffcdd2',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
      light: '#ffe0b2',
    },
    info: {
      main: '#2196f3',
      light: '#bbdefb',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e20',
          backgroundImage: 'none',
          border: '1px solid #3d3d42',
        },
        outlined: {
          backgroundColor: '#252527',
          border: '1px solid #4d4d52',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#2d2d30',
          borderBottom: '2px solid #AB47BC',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #3d3d42',
          color: '#b3b3b3',
          padding: '12px 16px',
        },
        head: {
          backgroundColor: '#2d2d30',
          color: '#AB47BC',
          fontWeight: 600,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          borderBottom: '2px solid #AB47BC',
        },
        body: {
          color: '#b3b3b3',
          '&:hover': {
            backgroundColor: 'rgba(171, 71, 188, 0.05)',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: 'rgba(45, 45, 48, 0.3)',
          },
          '&:hover': {
            backgroundColor: 'rgba(171, 71, 188, 0.08) !important',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(171, 71, 188, 0.12) !important',
            '&:hover': {
              backgroundColor: 'rgba(171, 71, 188, 0.16) !important',
            },
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#2d2d30',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#AB47BC',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#9E17B6',
            },
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: '#252527',
          borderTop: '1px solid #3d3d42',
          color: '#b3b3b3',
        },
        toolbar: {
          paddingLeft: '16px',
          paddingRight: '8px',
        },
        selectLabel: {
          color: '#b3b3b3',
        },
        displayedRows: {
          color: '#b3b3b3',
        },
        select: {
          color: '#AB47BC',
        },
        actions: {
          '& .MuiIconButton-root': {
            color: '#AB47BC',
            '&:hover': {
              backgroundColor: 'rgba(171, 71, 188, 0.08)',
            },
            '&.Mui-disabled': {
              color: '#666666',
            },
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: '#252527',
          color: '#AB47BC',
          borderBottom: '1px solid #3d3d42',
          minHeight: '64px !important',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#2a2a2c',
            color: '#AB47BC',
            '& fieldset': {
              borderColor: '#3d3d42',
            },
            '&:hover fieldset': {
              borderColor: '#4d4d52',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#AB47BC',
              boxShadow: '0 0 0 3px rgba(171, 71, 188, 0.15)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#888888',
            '&.Mui-focused': {
              color: '#AB47BC',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: '#AB47BC',
            '&::placeholder': {
              color: '#888888',
              opacity: 1,
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#AB47BC',
          '&:hover': {
            backgroundColor: 'rgba(171, 71, 188, 0.08)',
          },
          '&.Mui-disabled': {
            color: '#666666',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '6px',
        },
        contained: {
          backgroundColor: '#AB47BC',
          color: '#ffffff',
          boxShadow: '0 4px 20px rgba(171, 71, 188, 0.3)',
          '&:hover': {
            backgroundColor: '#9E17B6',
            boxShadow: '0 8px 40px rgba(171, 71, 188, 0.2)',
          },
          '&:disabled': {
            backgroundColor: '#3d3d42',
            color: '#666666',
            boxShadow: 'none',
          },
        },
        outlined: {
          borderColor: '#AB47BC',
          color: '#AB47BC',
          '&:hover': {
            backgroundColor: 'rgba(171, 71, 188, 0.08)',
            borderColor: '#AB47BC',
          },
        },
        text: {
          color: '#AB47BC',
          '&:hover': {
            backgroundColor: 'rgba(171, 71, 188, 0.08)',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#3d3d42',
          '&.Mui-checked': {
            color: '#AB47BC',
          },
          '&.MuiCheckbox-indeterminate': {
            color: '#AB47BC',
          },
          '&:hover': {
            backgroundColor: 'rgba(171, 71, 188, 0.08)',
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: '#AB47BC !important',
          '&:hover': {
            color: '#9E17B6 !important',
          },
          '&.Mui-active': {
            color: '#AB47BC !important',
            '& .MuiTableSortLabel-icon': {
              color: '#AB47BC !important',
            },
          },
        },
        icon: {
          color: '#AB47BC !important',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#2d2d30',
          color: '#AB47BC',
          border: '1px solid #3d3d42',
        },
        filled: {
          '&.MuiChip-colorPrimary': {
            backgroundColor: 'rgba(171, 71, 188, 0.15)',
            color: '#AB47BC',
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: 'rgba(76, 175, 80, 0.15)',
            color: '#4caf50',
          },
          '&.MuiChip-colorError': {
            backgroundColor: 'rgba(244, 67, 54, 0.15)',
            color: '#f44336',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#2d2d30',
          color: '#AB47BC',
          border: '1px solid #3d3d42',
          fontSize: '0.75rem',
        },
        arrow: {
          color: '#2d2d30',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#252527',
          border: '1px solid #3d3d42',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiCollapse: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#AB47BC',
        },
      },
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h6: {
      color: '#AB47BC',
      fontWeight: 600,
    },
    subtitle1: {
      color: '#AB47BC',
      fontWeight: 500,
    },
    subtitle2: {
      color: '#AB47BC',
      fontWeight: 500,
    },
    body1: {
      color: '#b3b3b3',
    },
    body2: {
      color: '#b3b3b3',
    },
  },
});

// Adicione estas declarações de módulo para estender o tema
declare module '@mui/material/styles' {
  interface Palette {
    surface: {
      main: string;
    };
  }

  interface PaletteOptions {
    surface?: {
      main: string;
    };
  }
}