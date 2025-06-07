// Router.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { BeginLayout } from './features/auth/layouts/begin-layout/components/BeginLayout';
import { Login } from './features/auth/pages/login/components/Login';
import { NotFound } from './shared/pages/not-found/NotFound';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            
            <Route path="/auth" element={<BeginLayout />}>
                <Route index element={<Navigate to="/auth/login" replace />} />
                <Route path="login" element={<Login />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}