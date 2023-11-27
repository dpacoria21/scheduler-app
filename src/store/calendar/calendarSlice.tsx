import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../../interfaces/storeInterfaces';

export interface CalendarState {
    isLoading: boolean,
    events: Event[],
    activeEvent: Event | null,
}

const initialState: CalendarState = {
    isLoading: true,
    events: [],
    activeEvent: null,
};


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onLoadEvents: (state, {payload = []}: PayloadAction<Event[]>) => {
            state.isLoading = false;
            payload.forEach(event => {
                const exist = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exist) {
                    state.events.push(event);
                }
            });
        },

        onSetActiveEvent: (state, {payload}: PayloadAction<Event>) => {
            state.activeEvent = payload;
        },

        onAddNewEvent: (state, {payload}: PayloadAction<Event>) => {
            state.events.push(payload);
            state.activeEvent = null;
        },

        onUpdateEvent: (state, {payload}: PayloadAction<Event>) => {
            state.isLoading = false;
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    console.log({'eventFrom': event, 'eventTo': payload});
                    return payload;
                }
                return event;
            });
        },

        onDeleteEvent: (state, {payload}: PayloadAction<Event>) => {
            state.events = state.events.filter(event => event.id !== payload.id);
            state.activeEvent = null;
        },

        onLogoutCalendar: (state) => {
            state.isLoading = true;
            state.events = [];
            state.activeEvent = null;
        },

        onDeleteActiveEvent: (state) => {
            state.activeEvent = null;
        },

        onCheckingEvents: (state) => {
            state.isLoading = true;
        },

    },
});

export const {
    onLoadEvents,
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLogoutCalendar,
    onDeleteActiveEvent,
    onCheckingEvents,
} = calendarSlice.actions;
