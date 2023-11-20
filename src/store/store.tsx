import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { useDispatch } from 'react-redux';
import { calendarSlice } from './calendar/calendarSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
    },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;

