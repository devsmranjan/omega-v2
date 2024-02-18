import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUserMutation } from '../../../api.slice';
import { setAccessToken, setUser, useRefreshMutation } from '../slices';

export const useInitUser = () => {
    const [getAccessToken] = useRefreshMutation();
    const [getUser] = useUserMutation();

    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const [error, setError] = useState<unknown>(null);

    const dispatch = useDispatch();

    const fetchAccessToken = useCallback(async () => {
        const response: any = await getAccessToken().unwrap();

        console.log({ 'access token response': response });

        const token = response?.data?.data?.token;

        if (!token) {
            throw new Error('Token not found');
        }

        dispatch(setAccessToken(token));
    }, [dispatch, getAccessToken]);

    const fetchUser = useCallback(async () => {
        const response: any = await getUser().unwrap();

        console.log({ 'user response': response });

        const user = response?.data?.data;

        if (!user) {
            throw new Error('User not found');
        }

        dispatch(setUser(user));
    }, [dispatch, getUser]);

    const init = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            await fetchAccessToken();
            await fetchUser();
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchAccessToken, fetchUser]);

    return { isLoading, error, init };
};
