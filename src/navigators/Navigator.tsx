import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { CalendarScreen } from '../screens/CalendarScreen';


export type RootStackParams = {
    LoginScreen: undefined,
    RegisterScreen: undefined,
    CalendarScreen: undefined,
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () => {
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
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        </Stack.Navigator>
    );
};
