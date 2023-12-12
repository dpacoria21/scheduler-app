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

export const startCreateEvent = ({title, description, start, end, color, participants = []}: SubmitEvent) => {
    //Agrega correctamente a los usuarios
    return async(dispatch: Dispatch) => {
        try {
            const {data} = await schedulerApi.post<EventResponse>('/events', {
                title,
                description,
                start,
                end,
                color,
            });

            if (participants.length !== 0){
                const promises = participants.map((participant) => {
                    return schedulerApi.post(`/events/${data.id}/participants`, {idUser: participant.id});
                });
                const addUsers: any = await Promise.all(promises);
            }

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

            const {id, title, description, start, end, color} = event;

            const {data} = await schedulerApi.patch<Event>(`/events/${id}`, {
                title,
                description,
                start,
                end,
                color,
            });

            // if (participants.length !== 0){
            //     console.log(participants);
            //     const promises = participants.map((participant) => {
            //         return schedulerApi.post(`/events/${data.id}/participants`, {idUser: participant.id});
            //     });
            //     // console.log(promises);
            //     const addUsers: any = await Promise.all(promises);
            //     // console.log(addUsers);
            // }

            dispatch(onUpdateEvent(data));
        } catch (error) {
            console.log(error);
        }
    };
};
