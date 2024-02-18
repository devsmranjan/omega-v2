import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setAccessToken } from './features/auth/slices/auth.slice';
import { TRootState } from './store';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include', // set httpOnly cookie
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as TRootState).auth.token;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 403) {
        // try to get a new token
        const refreshResult = await baseQuery('/auth/access-token', api, extraOptions);
        const response: any = refreshResult.data;
        const token = response?.data?.data?.token;

        if (token) {
            api.dispatch(setAccessToken(token));

            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        user: builder.mutation<unknown, void>({
            query: () => '/user',
        }),
    }),
});

export const { useUserMutation } = apiSlice;
