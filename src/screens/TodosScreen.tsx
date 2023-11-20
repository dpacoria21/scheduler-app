import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';
import { FlatList, Swipeable } from 'react-native-gesture-handler';
import { Todo } from '../interfaces/storeInterfaces';

const todosMock: Todo[] = [
    {
        id: '1',
        description: 'Hacer tarea de Matematica',
        done: false,
    },
    {
        id: '2',
        description: 'Hacer tarea de Comunicacion',
        done: false,
    },
    {
        id: '3',
        description: 'Hacer tarea de Ciencias',
        done: false,
    },
    {
        id: '4',
        description: 'Hacer tarea de Fisica',
        done: false,
    },
    {
        id: '5',
        description: 'Hacer tarea de Calculo',
        done: false,
    },
    {
        id: '6',
        description: 'Hacer tarea de Calculo',
        done: false,
    },
    {
        id: '7',
        description: 'Hacer tarea de Calculo',
        done: false,
    },
    {
        id: '8',
        description: 'Hacer tarea de Calculo',
        done: false,
    },
];

interface Props {
    todo: Todo
}

const rightSwipeActions = () => {
    return (
        <View
            style={{
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}
        >
            <Text
                style={{
                    color: '#1b1a17',
                    fontWeight: '600',
                    paddingHorizontal: 30,
                    paddingVertical:0,
                }}
            >
                Delete
            </Text>
        </View>
    );
};

const ListItem = ({todo}: Props) => {

    const [value, setValue] = useState(todo.description);

    console.log(value);

    return (
        <Swipeable
            // activeOffsetX={200}
            onSwipeableOpen={(direction, swipeable) => console.log({direction, swipeable})}
            renderRightActions={rightSwipeActions}
            containerStyle={{backgroundColor: 'red'}}
        >
            <View style={styles.todoContainer}>
                <TextInput
                    style={{color: '#fff', paddingLeft: 0, paddingVertical: 16, width: '75%'}}
                    autoCorrect={false}
                    multiline
                    onChangeText={(text) => setValue(text)}
                    editable={true}
                    value={value}
                    onBlur={() => Keyboard.dismiss()}
                />
            </View>
        </Swipeable>
    );
};

export const TodosScreen = () => {
    return (
        <View style={{
            flex:1,
            backgroundColor: '#edf7ff',
        }}>
            <Text style={{textAlign: 'center', marginVertical: 15}}>
                Todos mostrar Aqui
            </Text>

            <FlatList
                data={todosMock}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ListItem todo={item}/>}
                // ItemSeparatorComponent={() => <View style={{borderWidth:1, borderColor: '#000'}}/>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    todoContainer: {
        backgroundColor: '#2053d5',
        // flex: 1,
        // paddingHorizontal: 10,
        // paddingVertical: 8,
    },
});
