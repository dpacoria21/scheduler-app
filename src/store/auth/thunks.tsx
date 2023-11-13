import { Dispatch } from '@reduxjs/toolkit';
import { onChecking, onLogin } from './authSlice';

interface PayloadLogin {
    email: string,
    password: string,
}


export const startLogin = ({email, password} : PayloadLogin) => {
    return async(dispatch: Dispatch) => {
        dispatch(onChecking());

        //Hacer llamado a la API para traer la informacion

        //Guardar el token con el asyncStorage

        dispatch(onLogin({payload: {email, password}, type: 'auth/onLogin'}));
    };
};

