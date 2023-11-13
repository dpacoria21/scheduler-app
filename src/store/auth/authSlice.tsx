import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated'
    user: {},
    errorMessage: string,
}

const initialState: AuthState = {
    status: 'not-authenticated',
    user: {},
    errorMessage: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onLogin: (state, {payload} : {payload: PayloadAction<Object>}) => {
            console.log(payload);
            state.user = payload;
            state.errorMessage = '';
            state.status = 'authenticated';
        },
        onLogout: (state) => {
            state.user = {};
            state.errorMessage = '';
            state.status = 'not-authenticated';
        },
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = '';
        },
    },
});


export const {onLogin, onLogout, onChecking} = authSlice.actions;

