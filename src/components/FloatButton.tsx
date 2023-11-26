import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    style?: StyleProp<ViewStyle>
    color: string,
    icon: string,
    fn: () => void,
}

export const FloatButton = ({style, color, icon, fn}: Props) => {

    return (
        <View style={{...style as any}}>
            <TouchableOpacity activeOpacity={0.7} onPress={fn}>
                <Icon
                    name={icon}
                    size={35}
                    color={color}
                    style={{
                        padding: 7.5,
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
    );
};
