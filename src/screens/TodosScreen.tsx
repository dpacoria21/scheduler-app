import React, { useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { ListItem } from '../components/ListItem';
import { useAppDispatch, RootState } from '../store/store';
import { startLoadTodos } from '../store/todos/thunks';
import { useSelector } from 'react-redux';
import { LoadingScreen } from './LoadingScreen';
import { CreateTodoModal } from '../components/CreateTodoModal';

export const TodosScreen = () => {

    const dispatch = useAppDispatch();
    const {activeEvent} = useSelector((state: RootState) => state.calendar);
    const {todos, isLoading} = useSelector((state: RootState) => state.todos);

    useEffect(() => {
        dispatch(startLoadTodos((activeEvent?.id + '')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {
                isLoading
                    ?
                    <LoadingScreen/>
                    :
                    <ScrollView style={{flex: 1, backgroundColor: '#3665f2'}}>
                        <Text style={{...styles.title, textAlign: 'center', marginVertical: 35, color: '#fff'}}>
                            Mis tareas
                        </Text>
                        <View style={{
                            backgroundColor: '#dce6fd',
                            flexGrow: 1,
                            gap: 10,
                            borderTopLeftRadius: 35,
                            borderTopRightRadius: 35,
                            paddingTop: 60,
                            // paddingHorizontal: 10,
                        }}>
                            {
                                todos.map((todo) => (
                                    <ListItem key={todo.id} todo={todo} todos={todos} deleteFn={() => {}}/>
                                ))
                            }
                        </View>
                    </ScrollView>
            }
            <CreateTodoModal />
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#202020',
    },
    todosContainer: {
        width: '100%',
        backgroundColor: '#3985f8',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        // paddingTop: 100,
        // paddingBottom: 200,
        // paddingVertical: 50,
        // paddingTop: 50,
        // paddingLeft: 30,
    },
});
