import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./features/home/home'));
const Auth = lazy(() => import('./features/auth/auth'));

const Login = lazy(() => import('./features/auth/containers/login/login'));
const Register = lazy(
    () => import('./features/auth/containers/register/register'),
);
const Verify = lazy(() => import('./features/auth/containers/verify/verify'));
const ResetPassword = lazy(
    () => import('./features/auth/containers/reset-password/reset-password'),
);

export function App() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="auth" element={<Auth />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="verify" element={<Verify />} />
                    <Route path="reset" element={<ResetPassword />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
