import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Keyboard, ScrollView } from 'react-native';

import { Todo } from '../interfaces/storeInterfaces';

import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

interface Props {
    todo: Todo,
    todos: Todo[],
    deleteFn: Dispatch<SetStateAction<{ id: string; description: string; done: boolean; }[]>>
}

const rightSwipeActions = () => {
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}
        >
            <Icon
                name="trash-outline"
                size={30}
                color={'red'}
                style={{
                    paddingHorizontal: 40,
                }}
            />
        </View>
    );
};

const ListItem = ({todo, deleteFn, todos}: Props) => {

    const [value, setValue] = useState(todo.description);
    const [checkValue, setCheckValue] = useState(true);

    return (
        <Swipeable
            onSwipeableOpen={() => {
                deleteFn(todos.filter((todoMock) => todoMock.id !== todo.id));
            }}
            renderRightActions={rightSwipeActions}
            containerStyle={{
                backgroundColor: '#fda4a4',
                marginHorizontal: 15,
                borderRadius: 5,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
                marginBottom: 20,
            }}
        >
            <View style={{...styles.todoContainer, pointerEvents: 'none'}}>
                <CheckBox
                    disabled={false}
                    value={checkValue}
                    onValueChange={setCheckValue}
                    boxType="circle"
                />
                <TextInput
                    style={{
                        color: `${checkValue ? '#fff' : '#ddd'}`,
                        paddingLeft: 0,
                        paddingVertical: 16,
                        width: '60%',
                        fontSize: 16,
                        textDecorationLine: `${checkValue ? 'none' : 'line-through'}`,
                    }}
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

    const [todos, setTodos] = useState([
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
    ]);

    return (
        <ScrollView style={{
            flex:1,
            backgroundColor: '#edf7ff',
        }}>
            <Text style={{textAlign: 'center', marginVertical: 15}}>
                Mis tareas
            </Text>

            {
                todos.map((todo) => (
                    <ListItem key={todo.id} deleteFn={setTodos} todos={todos} todo={todo}/>
                ))
            }

            {/* <FlatList
                style={{flex:1}}
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ListItem deleteFn={setTodos} todos={todos}  todo={item}/>}
                ItemSeparatorComponent={() => <View style={{height: 25}}/>}
            /> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    todoContainer: {
        backgroundColor: '#3e44ff',
        // marginHorizontal: 15,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25,
        // justifyContent: 'center',
        gap: 10,
        // flex: 1,
        // paddingHorizontal: 10,
        // paddingVertical: 8,
    },
});
