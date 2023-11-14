import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PayloadUser } from '../../interfaces/payloadInterfaces';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated'
    user: PayloadUser | {},
    errorMessage: string[],
}

const initialState: AuthState = {
    status: 'not-authenticated',
    user: {},
    errorMessage: [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onLogin: (state, {payload} : {payload: PayloadUser}) => {
            state.user = payload;
            state.errorMessage = [];
            state.status = 'authenticated';
        },
        onLogout: (state) => {
            state.user = {};
            state.errorMessage = [];
            state.status = 'not-authenticated';
        },
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = [];
        },
        addErrorMessage: (state, {payload}: PayloadAction<string[]> ) => {
            state.user = {};
            state.status = 'not-authenticated';
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = [];
            state.status = 'not-authenticated';
        },
    },
});


export const {onLogin, onLogout, onChecking, addErrorMessage, clearErrorMessage} = authSlice.actions;

