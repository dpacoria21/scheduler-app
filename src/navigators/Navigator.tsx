import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { checkingAuthToken } from '../store/auth/thunks';


export type RootStackParams = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
    CalendarScreen: undefined,
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {

    const {status} = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkingAuthToken());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#ebf3ff',
                },
                gestureEnabled: true,
                animationEnabled: true,
            }}

        >
            {
                (status === 'not-authenticated')
                    ?
                    <>
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    </>
                    :   <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
            }
        </Stack.Navigator>
    );
};
