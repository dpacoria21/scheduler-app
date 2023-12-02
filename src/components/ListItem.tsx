import CheckBox from '@react-native-community/checkbox';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Todo } from '../interfaces/storeInterfaces';

import Icon from 'react-native-vector-icons/Ionicons';

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

export const ListItem = ({todo, deleteFn, todos}: Props) => {
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
            <View style={{...styles.todoContainer}}>
                <CheckBox
                    disabled={false}
                    value={checkValue}
                    onValueChange={setCheckValue}
                    boxType="circle"
                    style={{
                    }}
                />
                <TextInput
                    style={{
                        color: `${checkValue ? '#000' : '#858585'}`,
                        paddingLeft: 0,
                        paddingVertical: 16,
                        width: '60%',
                        fontSize: 17,
                        fontWeight: '500',
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


const styles = StyleSheet.create({
    todoContainer: {
        backgroundColor: '#eff4ff',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25,
        gap: 10,
    },
});
