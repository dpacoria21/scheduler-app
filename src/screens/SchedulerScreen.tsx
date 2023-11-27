import React, { useEffect } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Alert, View } from 'react-native';

import { EmptyDateData } from '../components/EmptyDateData';
import { DateDataItem } from '../components/DateDataItem';
import { FloatButton } from '../components/FloatButton';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { startDeleteEvent, startLoadEvents } from '../store/calendar/thunks';

import { Agenda } from 'react-native-calendars';
import { convertDates } from '../helpers/convertDates';
import { LoadingScreen } from './LoadingScreen';
import { onDeleteActiveEvent } from '../store/calendar/calendarSlice';

interface Props extends DrawerScreenProps<any, any>{}
export const SchedulerScreen = ({navigation}: Props) => {

    const {events, isLoading, activeEvent} = useSelector((state: RootState) => state.calendar);

    // const [currentEvents, setCurrentEvents] = useState<Dates>();
    const dispatch = useAppDispatch();

    const navigateToAddEvent = () => {
        navigation.navigate('CreateEventScreen');
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

    useEffect(() => {
        dispatch(startLoadEvents());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View style={{
            flex:1,
        }}>

            {
                (isLoading) ?
                    (
                        <LoadingScreen />
                    ) :
                    (
                        <Agenda
                            showOnlySelectedDayItems
                            items={convertDates(events)}
                            renderItem={(reservation : any) => <DateDataItem event={reservation.event}/>}
                            renderEmptyData={EmptyDateData}
                            // scrollEnabled
                            selected={new Date().toDateString()}
                            minDate="2018-01-01"
                            onDayPress={() => {}}
                            onDayLongPress={(date) => navigation.navigate('SchedulerDayViewScreen', {date})}
                        />
                    )
            }

            <FloatButton style={{position: 'absolute', bottom: 35, right: 35}} icon="add-outline" color="#202020" fn={navigateToAddEvent}/>

            {
                activeEvent && (<FloatButton style={{position: 'absolute', bottom: 35, left: 35}} icon="trash-outline" color="#ff2929" fn={deleteEvent}/>)
            }

        </View>
    );
};
