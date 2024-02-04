import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (builder) => ({}),
});
