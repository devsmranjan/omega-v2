import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useInitUser } from '../../../features/auth/hooks/init-user.hook';
import { selectCurrentToken } from '../../../features/auth/slices/auth.slice';

export function Persist() {
    const { init, isLoading } = useInitUser();

    const token = useSelector(selectCurrentToken);

    useEffect(() => {
        init();
    }, [init]);

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate, token]);

    return isLoading ? <div>Loading authorization details...</div> : <Outlet />;
}

export default Persist;
