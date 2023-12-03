import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from '../store/store';
import { startLogout } from '../store/auth/thunks';
import { onLogoutCalendar } from '../store/calendar/calendarSlice';

interface Props {
    title: string,
    icon: string,
    component?: string,
}

export const MenuItem = ({title, icon, component = ''}: Props) => {

    const dispatch = useAppDispatch();
    const {navigate} = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
                if (component) {
                    navigate(component as never);
                } else {
                    dispatch(startLogout());
                    dispatch(onLogoutCalendar());
                }
            }}
            style={{
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 23,
            }}>
                <Icon
                    name={icon}
                    size={40}
                    color={'#d9d9d9'}
                />
                <Text style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: '#d9d9d9',
                }}>
                    {title}
                </Text>
            </View>
            <Icon
                name="chevron-forward-outline"
                size={35}
                color={'#e9e9e9'}
            />
        </TouchableOpacity>
    );
};
