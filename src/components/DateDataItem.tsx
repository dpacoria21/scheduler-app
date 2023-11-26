import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch } from '../store/store';
import { startSetActiveEvent } from '../store/calendar/thunks';
import { Event } from '../interfaces/storeInterfaces';

interface Props {
    event: Event
}

export const DateDataItem = ({event}: Props) => {

    const dispatch = useAppDispatch();

    const getFormatHourTime = (timeUTC: string): string => {
        const hour = new Date(timeUTC).toLocaleTimeString('pe').split(' ');
        return `${hour[0].slice(0,-3)}${hour[1]}`;
    };

    const setActiveEvent = () => {
        dispatch(startSetActiveEvent(event));
    };

    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={setActiveEvent}>
            <View style={{gap: 3}}>
                <Text style={styles.hour}>
                    {`${getFormatHourTime(event.start)} - ${getFormatHourTime(event.end)}`}
                </Text>
                <Text style={styles.title} numberOfLines={1}>
                    {event.title}
                </Text>
                <Text numberOfLines={2} style={{...styles.description, width: 130}}>
                    {event.description}
                </Text>
            </View>
            <View style={styles.circle}>
                <Text>
                    DP
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex:1,
        backgroundColor: '#fff',
        marginRight: 15,
        paddingHorizontal: 10,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    hour: {
        fontSize: 16,
        color: '#000',
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#202020',
    },
    description: {
        fontSize: 13,
        fontWeight: '400',
        color: '#353535',
    },
    circle: {
        backgroundColor: '#a5b3f8',
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
