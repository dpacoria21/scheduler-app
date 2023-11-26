import React, { useEffect, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { View } from 'react-native';

import { EmptyDateData } from '../components/EmptyDateData';
import { DateDataItem } from '../components/DateDataItem';
import { FloatButton } from '../components/FloatButton';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { startLoadEvents } from '../store/calendar/thunks';

import { Agenda } from 'react-native-calendars';
import { Dates, convertDates } from '../helpers/convertDates';
import { LoadingScreen } from './LoadingScreen';

interface Props extends DrawerScreenProps<any, any>{}
export const SchedulerScreen = ({navigation}: Props) => {

    const {events, isLoading, activeEvent} = useSelector((state: RootState) => state.calendar);

    const [currentEvents, setCurrentEvents] = useState<Dates>();
    const dispatch = useAppDispatch();

    const navigateToAddEvent = () => {
        navigation.navigate('CreateEventScreen');
    };

    const deleteEvent = () => {

    };

    useEffect(() => {
        dispatch(startLoadEvents());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const dates = convertDates(events);
        setCurrentEvents(dates);
    }, [events]);

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
                            items={currentEvents}
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
