import { createSlice } from '@reduxjs/toolkit';
import { UserResponse } from '../../interfaces/userResponseInterfaces';
import { PayloadUser } from '../../interfaces/payloadInterfaces';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated'
    user: UserResponse | {},
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
        onLogin: (state, {payload} : {payload: PayloadUser}) => {
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

