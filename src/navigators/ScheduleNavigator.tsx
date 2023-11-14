import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { AboutScreen } from '../screens/AboutScreen';
import { SchedulerScreen } from '../screens/SchedulerScreen';
import { CalendarScreen } from '../screens/CalendarScreen';

const Drawer = createDrawerNavigator();

export const SchedulerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStatusBarAnimation: 'slide',
            }}
        >
            <Drawer.Screen name="AboutScreen" component={AboutScreen} />
            <Drawer.Screen name="SchedulerScreen" component={SchedulerScreen} />
            <Drawer.Screen name="CalendarScreen" component={CalendarScreen} />
        </Drawer.Navigator>
    );
};
