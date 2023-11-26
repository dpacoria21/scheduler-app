import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RootStackParams } from '../navigators/ScheduleNavigator';
import { TimelineCalendar } from '@howljs/calendar-kit';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


interface Props extends DrawerScreenProps<RootStackParams, 'SchedulerDayViewScreen'>{}
export const SchedulerDayViewScreen = ({route}: Props) => {

    const {events} = useSelector((state: RootState) => state.calendar);

    console.log(events);

    const currentDate = route.params?.date;

    return (
        <SafeAreaView style={styles.container}>
            <TimelineCalendar
                events={events.map((event) => ({...event, color: '#a5a3f8'}))}
                viewMode="day"
                locale="es"
                initialDate={currentDate?.dateString ?? undefined}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
});
