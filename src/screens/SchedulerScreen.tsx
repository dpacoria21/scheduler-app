import React, { useEffect, useState } from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { TouchableOpacity, View } from 'react-native';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { startLoadEvents } from '../store/calendar/thunks';

import { Agenda } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dates, convertDates } from '../helpers/convertDates';
import { LoadingScreen } from './LoadingScreen';
import { EmptyDateData } from '../components/EmptyDateData';
import { DateDataItem } from '../components/DateDataItem';

interface Props extends DrawerScreenProps<any, any>{}
export const SchedulerScreen = ({navigation}: Props) => {

    const {navigate} = navigation;

    const {events, isLoading} = useSelector((state: RootState) => state.calendar);
    const [currentEvents, setCurrentEvents] = useState<Dates>();
    const dispatch = useAppDispatch();

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
                            renderItem={DateDataItem}
                            renderEmptyData={EmptyDateData}
                            // scrollEnabled
                            selected={new Date().toDateString()}
                            minDate="2018-01-01"
                            onDayPress={() => {}}
                            onDayLongPress={() => {}}
                        />
                    )
            }



            <View style={{position: 'absolute', bottom: 35, right: 35}}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('CreateEventScreen')}>
                    <Icon
                        name="add-outline"
                        size={50}
                        color={'#101010'}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 100,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
