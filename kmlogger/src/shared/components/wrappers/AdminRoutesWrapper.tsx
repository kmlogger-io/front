import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuthContext.hook';
import { useRoles } from '../../hooks/useRoles.hook';
import Box from '@mui/material/Box';

interface AdminRouteProps {
    children: React.ReactNode;
}

export function AdminRouteWrapper({ children }: AdminRouteProps) {
    const location = useLocation();
    const { isAuthenticated, isLoading } = useAuth();
    const { isAdmin } = useRoles();

    if (isLoading) {
        return (
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                Loading...
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (!isAdmin()) {
        return <Navigate to="/home/dashboard" state={{ from: location }} replace />;
    }
    return <>{children}</>;
}