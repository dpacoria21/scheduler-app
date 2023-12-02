import { Dispatch } from '@reduxjs/toolkit';
import { Event, Todo } from '../../interfaces/storeInterfaces';
import { onAddTodo, onCheckingTodos, onDeleteTodo, onLoadTodos, onUpdateTodo } from './todosSlice';
import { schedulerApi } from '../../api/schedulerApi';

interface ResponseTodo {
    id: string,
    description: string,
    done: boolean,
    event: Event,
}

export const startLoadTodos = (id: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(onCheckingTodos());
            const {data} = await schedulerApi.get<Event>(`/events/${id}`);
            dispatch(onLoadTodos(data.todos));

        } catch (err) {
            console.log(err);
        }
    };
};

export const startAddTodo = (description: string, done: boolean, idEvent: string) => {
    return async(dispatch: Dispatch) => {
        try {
            const {data} = await schedulerApi.post<ResponseTodo>(`/events/${idEvent}/todos`, {
                description,
                done,
            });
            dispatch(onAddTodo({
                id: data.id,
                description: data.description,
                done: data.done,
            }));

        } catch (error) {
            console.log(error);
        }
    };
};

export const startDeleteTodo = (idEvent: string, idTodo: string) => {
    return async(dispatch: Dispatch) => {
        try {
            await schedulerApi.delete(`/events/${idEvent}/todos/${idTodo}`);
            dispatch(onDeleteTodo(idTodo));
        } catch (error) {
            console.log(error);
        }
    };
};

export const startUpdateTodo = (idEvent: string, todo: Todo) => {
    return async(dispatch: Dispatch) => {
        const {data} = await schedulerApi.patch<Todo>(`/events/${idEvent}/todos/${todo.id}`, {
            description: todo.description,
            done: todo.done,
        });
        dispatch(onUpdateTodo(data));
    };
};

