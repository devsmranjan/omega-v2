import { apiSlice } from '../../api.slice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/signin',
                method: 'POST',
                body: { ...data },
            }),
        }),
    }),
});

export const { useLoginMutation } = authApiSlice;
