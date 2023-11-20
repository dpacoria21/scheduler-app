import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends DrawerScreenProps<any, any>{}
export const SchedulerScreen = ({navigation}: Props) => {

    const {navigate} = navigation;

    return (
        <View style={{
            flex:1,
        }}>
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
