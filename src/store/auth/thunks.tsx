import { Dispatch } from '@reduxjs/toolkit';
import { onChecking, onLogin } from './authSlice';
import { UserPropsLogin } from '../../interfaces/payloadInterfaces';
import { schedulerApi } from '../../api/schedulerApi';
import { UserResponse } from '../../interfaces/userResponseInterfaces';

export const startLogin = ({email, password} : UserPropsLogin) => {
    return async(dispatch: Dispatch) => {

        try {

            dispatch(onChecking());
            const {data} = await schedulerApi.post<UserResponse>('/auth/login', {
                email,
                password,
            });

            //Guardar el token con el asyncStorage

            dispatch(onLogin({email: data.email, id: data.id}));
        } catch (err) {
            console.log(err);
        }

    };
};

