import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../../slices/auth.slice';

export function RequiredAuth() {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    return token ? (
        <Outlet />
    ) : (
        <Navigate
            to="/auth/login"
            state={{
                from: location,
            }}
            replace
        />
    );
}

export default RequiredAuth;
