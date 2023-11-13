import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FormData } from '../screens/LoginScreen';

interface Props {
    title: string,
    handleSubmit: UseFormHandleSubmit<FormData, undefined>,
    onSubmit: (data: FormData) => void,
}

export const ButtonSubmit = ({title, handleSubmit, onSubmit}: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonContainer}
            onPress={handleSubmit(onSubmit)}
        >
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#4438ca',
        height: 45,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        top: -1,
        color: '#e4e4e4',
        fontSize: 15,
        fontWeight: '600',
    },
});
