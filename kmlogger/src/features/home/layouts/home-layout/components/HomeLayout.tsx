import { Outlet } from "react-router-dom";
import { Box, IconButton, Button, Badge, ClickAwayListener } from "@mui/material";
import { 
AccountCircle as AccountCircleIcon,
Search as SearchIcon,
Notifications as NotificationsIcon,
Apps as AppsIcon,
Category as CategoryIcon,
Psychology as AiIcon,
CloudQueue as EnvironmentsIcon
} from "@mui/icons-material";
import { useRef } from "react";
import { useHeaderStore } from "../stores/HeaderStore.store";
import { LogoEye } from "../../../../../shared/components/logo-eye/LogoEye";
import { Copyright } from "../../../../../shared/components/copyright/Copyright";
import { SearchModal } from "./SeachModal";
import { HeaderMenu } from "./HeaderMenu";
import { ProfileMenu } from "./ProfileMenu";
import { NotificationsMenu } from "./Notifications";

export function HomeLayout() {
const {
  openSearchModal,
  applicationsMenuOpen,
  categoriesMenuOpen,
  environmentsMenuOpen,
  aiMenuOpen,
  notificationsMenuOpen,
  profileMenuOpen,
  toggleApplicationsMenu,
  toggleCategoriesMenu,
  toggleEnvironmentsMenu,
  toggleAiMenu,
  toggleNotificationsMenu,
  toggleProfileMenu,
  closeAllMenus
} = useHeaderStore();

const appsRef = useRef(null);
const categoriesRef = useRef(null);
const environmentsRef = useRef(null);
const aiRef = useRef(null);
const notificationsRef = useRef(null);
const profileRef = useRef(null);

return (
  <Box sx={{ 
    background: 'var(--background)',
    minHeight: '100vh'
  }}>
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      <Box 
        component="header" 
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: { xs: '1rem', md: '1.5rem' },
          px: { xs: '1rem', md: '2rem' },
          py: '0.75rem',
          borderBottom: '1px solid var(--border)',
          background: 'transparent',
          height: { xs: '3.5rem', md: '4rem' }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-start' 
        }}>
          <Box
            onClick={openSearchModal}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              px: '1rem',
              py: '0.625rem',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              background: 'var(--background-input)',
              cursor: 'pointer',
              minWidth: { xs: '12rem', md: '14rem' },
              height: '2.5rem',
              transition: 'all 0.2s ease',
              '&:hover': { 
                background: 'var(--surface-hover)',
                borderColor: 'var(--border-light)'
              }
            }}  
          >
            <SearchIcon sx={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.125rem' 
            }} />
            <Box sx={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.875rem',
              fontWeight: 400
            }}>
              Search...
            </Box>
          </Box>
        </Box>

        <LogoEye />

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end', 
          gap: '0.5rem' 
        }}>
          <ClickAwayListener onClickAway={closeAllMenus}>
            <Box sx={{ display: 'flex', gap: '0.25rem' }}>
              <Button
                ref={appsRef}
                variant={applicationsMenuOpen ? "contained" : "text"}
                startIcon={<AppsIcon sx={{ fontSize: '1.125rem' }} />}
                onClick={toggleApplicationsMenu}
                size="small"
                sx={{ 
                  textTransform: 'none',
                  height: '2.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: applicationsMenuOpen ? '#ffffff' : 'var(--text-secondary)',
                  backgroundColor: applicationsMenuOpen ? 'var(--primary)' : 'transparent',
                  borderRadius: '0.5rem',
                  px: '0.75rem',
                  '&:hover': {
                    backgroundColor: applicationsMenuOpen ? 'var(--primary-hover)' : 'var(--surface-hover)',
                    color: applicationsMenuOpen ? '#ffffff' : 'var(--primary)'
                  }
                }}
              >
                Applications
              </Button>

              <Button
                ref={categoriesRef}
                variant={categoriesMenuOpen ? "contained" : "text"}
                startIcon={<CategoryIcon sx={{ fontSize: '1.125rem' }} />}
                onClick={toggleCategoriesMenu}
                size="small"
                sx={{ 
                  textTransform: 'none',
                  height: '2.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: categoriesMenuOpen ? '#ffffff' : 'var(--text-secondary)',
                  backgroundColor: categoriesMenuOpen ? 'var(--primary)' : 'transparent',
                  borderRadius: '0.5rem',
                  px: '0.75rem',
                  '&:hover': {
                    backgroundColor: categoriesMenuOpen ? 'var(--primary-hover)' : 'var(--surface-hover)',
                    color: categoriesMenuOpen ? '#ffffff' : 'var(--primary)'
                  }
                }}
              >
                Categories
              </Button>

              <Button
                ref={environmentsRef}
                variant={environmentsMenuOpen ? "contained" : "text"}
                startIcon={<EnvironmentsIcon sx={{ fontSize: '1.125rem' }} />}
                onClick={toggleEnvironmentsMenu}
                size="small"
                sx={{ 
                  textTransform: 'none',
                  height: '2.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: environmentsMenuOpen ? '#ffffff' : 'var(--text-secondary)',
                  backgroundColor: environmentsMenuOpen ? 'var(--primary)' : 'transparent',
                  borderRadius: '0.5rem',
                  px: '0.75rem',
                  '&:hover': {
                    backgroundColor: environmentsMenuOpen ? 'var(--primary-hover)' : 'var(--surface-hover)',
                    color: environmentsMenuOpen ? '#ffffff' : 'var(--primary)'
                  }
                }}
              >
                Environments
              </Button>

              <Button
                ref={aiRef}
                variant={aiMenuOpen ? "contained" : "text"}
                startIcon={<AiIcon sx={{ fontSize: '1.125rem' }} />}
                onClick={toggleAiMenu}
                size="small"
                sx={{ 
                  textTransform: 'none',
                  height: '2.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: aiMenuOpen ? '#ffffff' : 'var(--text-secondary)',
                  backgroundColor: aiMenuOpen ? 'var(--primary)' : 'transparent',
                  borderRadius: '0.5rem',
                  px: '0.75rem',
                  '&:hover': {
                    backgroundColor: aiMenuOpen ? 'var(--primary-hover)' : 'var(--surface-hover)',
                    color: aiMenuOpen ? '#ffffff' : 'var(--primary)'
                  }
                }}
              >
                AI
              </Button>

              <IconButton 
                onClick={toggleNotificationsMenu} 
                ref={notificationsRef}
                sx={{ 
                  width: '2.5rem', 
                  height: '2.5rem',
                  color: 'var(--text-secondary)',
                  '&:hover': {
                    backgroundColor: 'var(--surface-hover)',
                    color: 'var(--primary)'
                  }
                }}
              >
                <Badge 
                  badgeContent={3} 
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: 'var(--error)',
                      color: '#ffffff',
                      fontSize: '0.75rem'
                    }
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: '1.25rem' }} />
                </Badge>
              </IconButton>

              <IconButton 
                onClick={toggleProfileMenu}
                ref={profileRef}
                sx={{ 
                  width: '2.5rem', 
                  height: '2.5rem',
                  color: 'var(--text-secondary)',
                  '&:hover': {
                    backgroundColor: 'var(--surface-hover)',
                    color: 'var(--primary)'
                  }
                }}
              >
                <AccountCircleIcon sx={{ fontSize: '1.5rem' }} />
              </IconButton>
            </Box>
          </ClickAwayListener>
        </Box>
      </Box>

      <Box 
        component="main" 
        sx={{ 
          flex: 1,
          background: 'var(--background)',
          color: 'var(--text-primary)'
        }}
      >
        <Outlet />
      </Box>
    </Box>

    <Copyright />

    <SearchModal />

    <HeaderMenu
      anchorEl={appsRef.current}
      open={applicationsMenuOpen}
      onClose={closeAllMenus}
      type="applications"
    />

    <HeaderMenu
      anchorEl={categoriesRef.current}
      open={categoriesMenuOpen}
      onClose={closeAllMenus}
      type="categories"
    />

    <HeaderMenu
      anchorEl={environmentsRef.current}
      open={environmentsMenuOpen}
      onClose={closeAllMenus}
      type="environments"
    />

    <HeaderMenu
      anchorEl={aiRef.current}
      open={aiMenuOpen}
      onClose={closeAllMenus}
      type="ai"
    />

    <NotificationsMenu
      anchorEl={notificationsRef.current}
      open={notificationsMenuOpen}
      onClose={closeAllMenus}
    />

    <ProfileMenu
      anchorEl={profileRef.current}
      open={profileMenuOpen}
      onClose={closeAllMenus}
    />
  </Box>
);
}