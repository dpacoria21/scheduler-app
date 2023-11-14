import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from '../store/store';
import { startLogout } from '../store/auth/thunks';

interface Props {
    text: string,
    icon: string,
    componente?: string,
}

export const MenuItem = ({text, icon, componente = ''}: Props) => {

    const dispatch = useAppDispatch();
    const {navigate} = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
                if (componente) {
                    navigate(componente as never);
                } else {
                    dispatch(startLogout());
                }
            }}
            style={{
                backgroundColor: '#fff',
                paddingLeft: 20,
                paddingVertical: 7,
                borderRadius: 4,
            }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}>
                <Icon
                    name={icon}
                    size={35}
                    color={'#252525'}
                />
                <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#252525',
                }}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
