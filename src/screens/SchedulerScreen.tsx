import React, { useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Alert, Dimensions, View } from 'react-native';

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

const windowWidth = Dimensions.get('window').width;

interface Props extends DrawerScreenProps<any, any>{}
export const SchedulerScreen = React.memo(({navigation}: Props) => {

    const {events, isLoading, activeEvent} = useSelector((state: RootState) => state.calendar);

    const dispatch = useAppDispatch();

    const [futureMonths, setFutureMonths] = useState(3);

    const navigateToAddEvent = () => {
        navigation.navigate('CreateEventScreen');
    };
    const navigateToTodoScreen = () => {
        navigation.navigate('TodosScreen');
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
                            renderEmptyData={() => <EmptyDateData message="No existe ningún evento creado para el día de hoy"/>}
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
                activeEvent && (
                    <>
                        <FloatButton style={{position: 'absolute', bottom: 35, left: 35}} icon="trash-outline" color="#ff2929" fn={deleteEvent}/>
                        <FloatButton style={{position: 'absolute', bottom: 35, left: (windowWidth / 2) - 22.5}} icon="checkmark-done-outline" color="#228bec" fn={navigateToTodoScreen}/>
                    </>
                )
            }

        </View>
    );
});
