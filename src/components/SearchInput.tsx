import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebounceValue } from '../hooks/useDebounceValue';

interface Props {
    style?: StyleProp<ViewStyle>,
    onDebounce: (value: string) => void
}

export const SearchInput = ({style, onDebounce}: Props) => {

    const [textValue, setTextValue] = useState('');

    const {debouncedValue} = useDebounceValue({input: textValue, time: 500});

    useEffect(() => {
        onDebounce(debouncedValue);
    }, [debouncedValue]);

    return (
        <View style={{
            ...styles.container,
            ...style as any,
        }}>
            <View style={styles.textBackground}>
                <TextInput
                    placeholder="Buscar un usuario"
                    style={styles.textInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={textValue}
                    onChangeText={setTextValue}
                />
                <Icon
                    name="search-outline"
                    size={30}
                    color={'#000'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red'
        // marginHorizontal: 20,
    },
    textBackground: {
        backgroundColor: '#f3f1f3',
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textInput: {
        top: 1,
        flex: 1,
        fontSize: 18,
    },
});
