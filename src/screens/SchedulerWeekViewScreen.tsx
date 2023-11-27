import { TimelineCalendar } from '@howljs/calendar-kit';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


export const SchedulerWeekViewScreen = () => {

    const {events} = useSelector((state: RootState) => state.calendar);

    return (
        <SafeAreaView style={styles.container}>
            <TimelineCalendar
                events={events.map((event) => ({...event, color: '#a5a3f8'}))}
                viewMode="week"
                locale="es"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
});
