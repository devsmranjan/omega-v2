import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function Auth() {
    const navigate = useNavigate();

    // redirect only if route is /auth
    useEffect(() => {
        if (window.location.pathname === '/auth') {
            navigate('login');
        }
    });

    return <Outlet />;
}

export default Auth;
