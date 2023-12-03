import { CalendarViewMode, PackedEvent, TimelineCalendar } from '@howljs/calendar-kit';
import React from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { FloatButton } from '../components/FloatButton';
import { onDeleteActiveEvent } from '../store/calendar/calendarSlice';
import { startDeleteEvent, startSetActiveEvent } from '../store/calendar/thunks';
import { Event } from '../interfaces/storeInterfaces';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

interface Props {
    mode: CalendarViewMode
    currentDate?: string
}
export const SchedulerViewModeScreen = ({mode, currentDate}: Props) => {

    const {events, activeEvent} = useSelector((state: RootState) => state.calendar);

    const {navigate} = useNavigation();

    const dispatch = useAppDispatch();

    const navigateToAddEvent = () => {
        navigate('CreateEventScreen' as never);
    };

    const navigateToTodoScreen = () => {
        navigate('TodosScreen' as never);
    };

    const deleteEvent = () => {
        Alert.alert('Eliminar evento', '¿Está seguro de eliminar este evento?', [
            {
                text: 'Cancel',
                onPress: () => dispatch(onDeleteActiveEvent()),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => dispatch(startDeleteEvent(activeEvent!)),
                style: 'default',
            },
        ]);
    };

    const setActiveEvent = (event: Event) => {
        dispatch(startSetActiveEvent(event));
    };

    return (
        <SafeAreaView style={styles.container}>
            <TimelineCalendar
                events={events}
                viewMode={mode}
                locale="es"
                initialDate={currentDate}
                allowPinchToZoom
                initialTimeIntervalHeight={60}
                minTimeIntervalHeight={29}
                maxTimeIntervalHeight={110}
                onPressEvent={(eventItem) => {
                    const {description, end, start, todos, id, title} = eventItem;
                    const newEvent: Event = {
                        id,
                        description,
                        end,
                        start,
                        todos,
                        title: title!,
                    };
                    setActiveEvent(newEvent);
                }}
                onLongPressEvent={(eventItem: PackedEvent) => {
                    const {id, start, end, description, title, todos} = eventItem;
                    const event: Event = {
                        id,
                        description,
                        end,
                        start,
                        todos,
                        title: title!,
                    };
                    navigate('CreateEventScreen', {event});
                }}
            />
            <FloatButton style={{position: 'absolute', bottom: 35, right: 35}} icon="add-outline" color="#202020" fn={navigateToAddEvent}/>

            {
                activeEvent && (
                    <>
                        <FloatButton style={{position: 'absolute', bottom: 35, left: 35}} icon="trash-outline" color="#ff2929" fn={deleteEvent}/>
                        <FloatButton style={{position: 'absolute', bottom: 35, left: (windowWidth / 2) - 22.5}} icon="checkmark-done-outline" color="#228bec" fn={navigateToTodoScreen}/>
                    </>
                )
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
});
