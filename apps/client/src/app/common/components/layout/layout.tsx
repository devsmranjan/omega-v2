import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <>
            <nav>Navbar</nav>
            <Outlet />
        </>
    );
};
