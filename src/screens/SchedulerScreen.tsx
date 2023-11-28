import React, { useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Alert, View } from 'react-native';

import { EmptyDateData } from '../components/EmptyDateData';
import { DateDataItem } from '../components/DateDataItem';
import { FloatButton } from '../components/FloatButton';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { startDeleteEvent } from '../store/calendar/thunks';

import { Agenda } from 'react-native-calendars';
import { convertDates } from '../helpers/convertDates';
import { LoadingScreen } from './LoadingScreen';
import { onDeleteActiveEvent } from '../store/calendar/calendarSlice';

interface Props extends DrawerScreenProps<any, any>{}
export const SchedulerScreen = React.memo(({navigation}: Props) => {

    const {events, isLoading, activeEvent} = useSelector((state: RootState) => state.calendar);

    const dispatch = useAppDispatch();

    const [futureMonths, setFutureMonths] = useState(3);

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
                            keyExtractor={(item) => item}
                            selected={new Date().toDateString()}
                            futureScrollRange={futureMonths}
                            onDayPress={() => {}}
                            renderToHardwareTextureAndroid
                            onDayLongPress={(date) => navigation.navigate('SchedulerDayViewScreen', {date})}

                            onEndReached={() => {
                                setFutureMonths(c => c + 3);
                            }}
                            onEndReachedThreshold={0.5}

                        />
                    )
            }

            <FloatButton style={{position: 'absolute', bottom: 35, right: 35}} icon="add-outline" color="#202020" fn={navigateToAddEvent}/>

            {
                activeEvent && (<FloatButton style={{position: 'absolute', bottom: 35, left: 35}} icon="trash-outline" color="#ff2929" fn={deleteEvent}/>)
            }

        </View>
    );
});
