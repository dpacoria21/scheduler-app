import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import { RootStackParams } from '../navigators/ScheduleNavigator';


interface Props extends DrawerScreenProps<RootStackParams, 'SchedulerDayViewScreen'>{}
export const SchedulerDayViewScreen = ({route}: Props) => {

    const {date} = route.params;
    console.log(date);

    return (
        <View>
            <Text>
                {JSON.stringify(date, null, 4)}
            </Text>
        </View>
    );
};
