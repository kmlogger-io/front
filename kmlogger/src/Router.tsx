import { Routes, Route, Navigate } from 'react-router-dom';
import { BeginLayout } from './features/auth/layouts/begin-layout/components/BeginLayout';
import { Login } from './features/auth/pages/login/components/Login';
import { NotFound } from './shared/pages/not-found/NotFound';
import { ProtectedRouteWrapper } from './shared/components/protected-route/ProtectedRouteWrapper';
import { HomeLayout } from './features/home/layouts/home-layout/components/HomeLayout';
import { Dashboard } from './features/home/pages/dashboard/components/Dashboard';
import { AdminRouteWrapper } from './shared/components/wrappers/AdminRoutesWrapper';
import { AdminLayout } from './features/admin/layouts/AdminLayout';
import { UserAdministration } from './features/admin/users/components/UserAdminstration';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="/auth" element={<BeginLayout />}>
                <Route index element={<Navigate to="/auth/login" replace />} />
                <Route path="login" element={<Login />} />
            </Route>
            
            <Route
                path="/home"
                element={
                    <ProtectedRouteWrapper>
                        <HomeLayout />
                    </ProtectedRouteWrapper>
                }
            >
                <Route index element={<Navigate to="/home/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
            </Route>

            <Route
                path="/admin"
                element={
                    <ProtectedRouteWrapper>
                        <AdminRouteWrapper>
                            <AdminLayout />
                        </AdminRouteWrapper>
                    </ProtectedRouteWrapper>
                }
            >
                <Route index element={<Navigate to="/admin/users" replace />} />
                <Route path="users" element={<UserAdministration />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}