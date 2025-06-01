import {Routes, Route} from 'react-router-dom';
import { BeginLayout } from './features/auth/layouts/begin-layout/components/BeginLayout';
import { Login } from './features/auth/pages/login/components/Login';

export function Router(){
    return (
        <Routes>
            <Route path="/auth" element={<BeginLayout/>}>
                <Route path="login" element={<Login/>} />
            </Route>
        </Routes>
    );
}