import { SubmitEvent } from '../../interfaces/events';
import { schedulerApi } from '../../api/schedulerApi';
import { EventResponse } from '../../interfaces/userResponseInterfaces';
import { onAddNewEvent, onCheckingEvents, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from './calendarSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { Event } from '../../interfaces/storeInterfaces';

export const startSetActiveEvent = (event: Event) => {
    return async(dispatch: Dispatch) => {
        dispatch(onSetActiveEvent(event));
    };
};

export const startCreateEvent = ({title, description, start, end}: SubmitEvent) => {
    return async(dispatch: Dispatch) => {
        try {
            const {data} = await schedulerApi.post<EventResponse>('/events', {
                title,
                description,
                start,
                end,
            });

            delete data.user;

            dispatch(onAddNewEvent(data));

        } catch (error) {
            console.log(error);
        }
    };
};

export const startLoadEvents = () => {
    return async(dispatch: Dispatch) => {
        try {
            dispatch(onCheckingEvents());
            const {data} = await schedulerApi.get<Event[]>('/events/me');
            dispatch(onLoadEvents(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const startDeleteEvent = (event: Event) => {
    return async(dispatch: Dispatch) => {
        try {
            await schedulerApi.delete(`/events/${event.id}`);
            dispatch(onDeleteEvent(event));
        } catch (error) {
            console.log(error);
        }
    };
};

export const startUpdateEvent = (event: Event) => {
    return async(dispatch: Dispatch) => {
        try {

            dispatch(onCheckingEvents());

            const {id, title, description, start, end} = event;

            const {data} = await schedulerApi.patch<Event>(`/events/${id}`, {
                title,
                description,
                start,
                end,
            });
            dispatch(onUpdateEvent(data));
        } catch (error) {
            console.log(error);
        }
    };
};
