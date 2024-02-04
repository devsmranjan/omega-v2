import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api.slice';
import { authReducer } from './features/auth/auth.slice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type TRootState = ReturnType<typeof store.getState>;
