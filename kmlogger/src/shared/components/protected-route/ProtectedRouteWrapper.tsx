import { Navigate, useLocation } from 'react-router-dom';
import { apiClient } from '../../services/apiService';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRouteWrapper({ children }: ProtectedRouteProps) {
    const location = useLocation();
    const isAuthenticated = apiClient.isAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
}