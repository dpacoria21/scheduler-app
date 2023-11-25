import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { DateItem } from '../helpers/convertDates';
// import { AgendaEntry } from 'react-native-calendars';
// import { DateItem } from '../helpers/convertDates';

export const DateDataItem = (props: any) => {

    const getFormatHourTime = (timeUTC: string): string => {
        const hour = new Date(timeUTC).toLocaleTimeString('pe').split(' ');
        return `${hour[0].slice(0,-3)}${hour[1]}`;
    };

    return (
        <View style={styles.container}>
            <View style={{gap: 3}}>
                <Text style={styles.hour}>
                    {/* {new Date(props.event.start).toLocaleTimeString('pe', {dateStyle: 'short', formatMatcher: 'best fit'})} */}
                    {`${getFormatHourTime(props.event.start)} - ${getFormatHourTime(props.event.end)}`}
                </Text>
                <Text style={styles.title} numberOfLines={1}>
                    {props.event.title}
                </Text>
                <Text numberOfLines={2} style={{...styles.description, width: 130}}>
                    {props.event.description}
                </Text>
            </View>
            <View style={styles.circle}>
                <Text>
                    DP
                </Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex:1,
        backgroundColor: '#fff',
        marginHorizontal: 15,
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
