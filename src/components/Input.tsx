import React from 'react';
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
    label: string,
    placeholder: string,
    keyboardType: KeyboardTypeOptions,
    secureText?: boolean,
}

export const Input = ({label, placeholder, keyboardType = 'default', secureText = false}: Props) => {
    return (
        <View style={stylesInput.inputContainer}>
            <Text style={stylesInput.inputLabel}>
                {label}
            </Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                style={stylesInput.input}
                keyboardType={keyboardType}
                secureTextEntry={secureText}
                autoCorrect={false}
            />
        </View>
    );
};

export const stylesInput = StyleSheet.create({
    inputContainer: {
        gap: 7,
    },
    inputLabel: {
        fontWeight: '600',
        color:'rgba(0, 0, 0, 0.5)',
        fontSize: 14,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 2.5,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        paddingLeft: 13,
        fontWeight: '500',
        fontSize: 15,
        color: 'rgba(0, 0, 0, 0.7)',
        height: 50,
        marginBottom: 5,
    },
});
