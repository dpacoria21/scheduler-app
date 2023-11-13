import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParams } from '../navigators/Navigator';


interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'>{}
export const LoginScreen = ({navigation}: Props) => {
    return (
        <View>
            <Text>
                Login Screen
            </Text>
            <Button
                title="Go to Register"
                onPress={() => navigation.navigate('RegisterScreen')}
            />
        </View>
    );
};
