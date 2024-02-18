import { apiSlice } from '../../../api.slice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/signin',
                method: 'POST',
                body: { ...data },
            }),
        }),
        refresh: builder.mutation<unknown, void>({
            query: () => ({
                url: '/auth/access-token',
                method: 'GET',
            }),
        }),
    }),
});

export const { useLoginMutation, useRefreshMutation } = authApiSlice;
