import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../../auth.slice';

/* eslint-disable-next-line */
export interface RequiredAuthProps {}

export function RequiredAuth(props: RequiredAuthProps) {
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
