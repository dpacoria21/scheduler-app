import React from 'react';
import { Button, Text, View } from 'react-native';
import { RootStackParams } from '../navigators/Navigator';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'>{}
export const RegisterScreen = ({navigation}: Props) => {
    return (
        <View>
            <Text>
                Register Screen
            </Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('LoginScreen')}
            />
        </View>
    );
};
