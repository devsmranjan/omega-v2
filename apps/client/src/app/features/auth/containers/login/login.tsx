import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../auth-api.slice';
import { setCredentials } from '../../auth.slice';
import styles from './login.module.scss';

export function Login() {
    const errorRef = useRef<HTMLParagraphElement>(null);

    const [errorMessage, setErrorMessage] = useState(null);

    const [login, { isLoading }] = useLoginMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorMessage(null);

        const form = event.currentTarget;
        const formData = new FormData(form);

        const body = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        try {
            const response = await login(body).unwrap();

            console.log({ response });

            dispatch(setCredentials(response.data.data));

            navigate('/dashboard', { replace: true });
        } catch (error: any) {
            console.error(error);

            errorRef.current?.focus();
            setErrorMessage(error.data.message);
        }
    };

    return (
        <form className={styles['container']} onSubmit={handleSubmit}>
            <h1>Welcome to Login!</h1>
            <input
                type="text"
                name="username"
                placeholder="Username"
                className="input input-bordered w-full max-w-xs"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                required
            />
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <p ref={errorRef} className="text-red-500">
                {errorMessage}
            </p>
        </form>
    );
}

export default Login;
