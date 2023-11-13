import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
    title: string
}

export const ButtonSubmit = ({title}: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonContainer}
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
