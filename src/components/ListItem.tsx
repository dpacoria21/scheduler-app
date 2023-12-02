import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Todo } from '../interfaces/storeInterfaces';

import Icon from 'react-native-vector-icons/Ionicons';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { startDeleteTodo } from '../store/todos/thunks';

interface Props {
    todo: Todo,
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

export const ListItem = ({todo}: Props) => {
    const [value, setValue] = useState(todo.description);
    const [checkValue, setCheckValue] = useState(todo.done);

    const dispatch = useAppDispatch();
    const {activeEvent} = useSelector((state: RootState) => state.calendar);

    return (
        <Swipeable
            onSwipeableOpen={() => {
                dispatch(startDeleteTodo(activeEvent!.id, todo.id));
            }}
            renderRightActions={rightSwipeActions}
            containerStyle={{
                backgroundColor: '#fda4a4',
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
                    tintColors={{
                        true: '#466fff',
                        false: '#466fff',
                    }}
                />
                <TextInput
                    onPressIn={() => console.log('Hizo presion')}
                    style={{
                        color: `${checkValue ? '#858585' : '#000'}`,
                        paddingLeft: 0,
                        paddingVertical: 16,
                        width: '60%',
                        fontSize: 17,
                        fontWeight: '500',
                        textDecorationLine: `${checkValue ? 'line-through' : 'none'}`,
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
