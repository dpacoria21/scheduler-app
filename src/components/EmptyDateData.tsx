import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const EmptyDateData = () => {
    return (
        <View style={styles.container}>
            <Icon
                name="happy-outline"
                size={30}
            />

            <Text style={styles.emptyText}>
                No existe ningún evento creado para el día de hoy
            </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    emptyText: {
        fontWeight: '500',
        fontSize: 20,
        marginHorizontal: 20,
    },
});
