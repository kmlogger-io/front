import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuthContext.hook';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRouteWrapper({ children }: ProtectedRouteProps) {
    const location = useLocation();
    const { isAuthenticated, isLoading } = useAuth(); 

    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                Loading...
            </div>
        );
    }
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}