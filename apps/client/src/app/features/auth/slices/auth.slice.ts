import { createSlice } from '@reduxjs/toolkit';
import { TRootState } from '../../../store';

export type TAuthState = {
    user: unknown;
    token: string | null;
};

export const initialState: TAuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;

            state.user = user;
            state.token = token;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAccessToken: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setCredentials, setAccessToken, logout, setUser } = authSlice.actions;

// selectors -----------------
export const selectCurrentUser = (state: TRootState) => state.auth.user;
export const selectCurrentToken = (state: TRootState) => state.auth.token;

export const authReducer = authSlice.reducer;
