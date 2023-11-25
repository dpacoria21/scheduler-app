import { AgendaEntry } from 'react-native-calendars';
import { Event } from '../interfaces/storeInterfaces';

export interface DateItem extends AgendaEntry {
    event: Event
}

export interface Dates {
    [date: string]: DateItem[]
}

export const convertDates = (events: Event[] = []) => {
    const dates: Dates = {};

    if (!events) {return dates;}

    events.forEach((event) => {
        const dateStr = event.start.split('T')[0];
        if (!Object.hasOwn(dates, dateStr)) {
            dates[dateStr] = [];
            dates[dateStr].push({
                day: dateStr,
                name: event.title,
                height: 200,
                event,
            });
        } else {
            dates[dateStr].push({
                day: dateStr,
                name: event.title,
                height: 200,
                event,
            });
        }
    });
    return dates;
};
