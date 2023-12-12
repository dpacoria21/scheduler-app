import React, { memo, useRef, useState } from 'react';
import { Agenda } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { convertDates, flatDate } from '../helpers/convertDates';
import { EmptyDateData } from './EmptyDateData';
import { DateDataItem } from './DateDataItem';
import { useNavigation } from '@react-navigation/native';
import { Event } from '../interfaces/storeInterfaces';
import { LoadingScreen } from '../screens/LoadingScreen';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParams } from '../navigators/ScheduleNavigator';

interface Props {
    events: Event[]
}

export const ViewAgenda = memo(({events}: Props) => {

    const [futureMonths, setFutureMonths] = useState(3);
    const currentDay = useRef<string>(flatDate(new Date().toISOString()));
    const isLoading = useSelector((state: RootState) => state.calendar.isLoading);
    const {navigate} = useNavigation<DrawerNavigationProp<RootStackParams>>();

    return (
        <>
            {
                isLoading
                    ? <LoadingScreen />
                    :
                    (
                        <Agenda
                            showOnlySelectedDayItems
                            items={convertDates(events)}
                            renderItem={(reservation : any) => <DateDataItem event={reservation.event}/>}
                            keyExtractor={(item,i) => item + i}
                            renderEmptyData={() => <EmptyDateData message="No existe ningún evento creado para el día de hoy"/>}
                            selected={currentDay.current}
                            futureScrollRange={futureMonths}
                            onDayPress={(date) => {currentDay.current = date.dateString;}}
                            renderToHardwareTextureAndroid
                            onDayLongPress={(date) => navigate('SchedulerDayViewScreen', {date})}
                            onEndReached={() => {
                                setFutureMonths(c => c + 3);
                            }}
                            onEndReachedThreshold={0.5}
                        />
                    )
            }

        </>
    );
}, arePropsEqual);

function arePropsEqual(oldProps: any, newProps: any) {
    return (
        JSON.stringify(oldProps.events) === JSON.stringify(newProps.events)
    );
}
