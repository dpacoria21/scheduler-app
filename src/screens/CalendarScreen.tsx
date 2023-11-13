import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAppDispatch } from '../store/store';
import { startLogout } from '../store/auth/thunks';

export const CalendarScreen = () => {

    const dispatch = useAppDispatch();

    return (
        <View>
            <Text>
                CalendarScreen
            </Text>
            <Button
                title="logout"
                onPress={() => dispatch(startLogout())}
            />
        </View>
    );
};
