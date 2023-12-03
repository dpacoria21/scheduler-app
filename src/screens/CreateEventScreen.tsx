import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SubmitEvent } from '../interfaces/events';
import { addHours } from 'date-fns';
import { Input } from '../components/Input';
import { DateInput } from '../components/DateInput';
import { ButtonSubmit } from '../components/ButtonSubmit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../store/store';
import { startCreateEvent, startUpdateEvent } from '../store/calendar/thunks';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootStackParams } from '../navigators/ScheduleNavigator';
import { ColorPicker } from 'react-native-color-picker';
import { fromHsv } from 'react-native-color-picker';

const {width: windowWidth} = Dimensions.get('window');

interface Props extends DrawerScreenProps<RootStackParams, 'CreateEventScreen'>{}
export const CreateEventScreen = ({route}: Props) => {

    let {event} = route.params ?? {};

    const {goBack} = useNavigation();
    const {top} = useSafeAreaInsets();

    const currentColor = useRef('#c0d3fd');

    const dispatch = useAppDispatch();

    const { control, handleSubmit, reset, formState:{errors}, watch} = useForm<SubmitEvent>({defaultValues: {
        title: event?.title || '',
        description: event?.description || '',
        start: event?.start || new Date().toISOString(),
        end:  event?.end || addHours(new Date(), 2).toISOString(),
    }});

    const onSubmit = (data: SubmitEvent) => {

        if (event) {
            event = {
                ...event,
                ...data,
                color: currentColor.current,
            };
            dispatch(startUpdateEvent(event));
        } else {
            data.color = currentColor.current;
            dispatch(startCreateEvent(data));
        }

        reset({
            title: '',
            description: '',
            start: new Date().toISOString(),
            end: addHours(new Date(), 2).toISOString(),
        });
        goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex:1}}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <ScrollView style={styles.container}>
                    <View style={{alignItems: 'center', gap: 25}}>

                        <Text style={{...styles.title, marginTop: top + 20}}>{
                            (event) ? 'Editando evento' : 'Creando evento'
                        }</Text>

                        <View>
                            {/* Espacio para crear el debouncer con los participantes */}
                        </View>

                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View style={styles.containerForm}>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({field: {onChange, value, onBlur}}) => (
                                        <Input style={{height: 40}} errors={errors.title} onBlur={onBlur} onChange={onChange} value={value} label="Título" placeholder="ej. Hacer tarea" keyboardType="default"/>
                                    )}
                                    name="title"
                                />

                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({field: {onChange, value, onBlur}}) => (
                                        <Input style={{height: 40}} errors={errors.description} onBlur={onBlur} onChange={onChange} value={value} label="Descripción" placeholder="ej. descripción..." keyboardType="default"/>
                                    )}
                                    name="description"
                                />

                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({field: {onChange, value}}) => (
                                        <DateInput onChange={onChange} title="Fecha de inicio" value={value}/>
                                    )}
                                    name="start"
                                />

                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({field: {onChange, value}}) => (
                                        <DateInput onChange={onChange} title="Fecha de finalización" value={value} minimunDate={watch('start')}/>
                                    )}
                                    name="end"
                                />

                                <View style={{flex: 1}}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: 'rgba(0, 0, 0, 0.4)',
                                        fontWeight: '500',
                                    }}>
                                        Elige un color
                                    </Text>
                                    <View style={{flex:1, alignItems: 'center'}}>
                                        <ColorPicker
                                            onColorChange={(selectedColor) =>{
                                                currentColor.current = fromHsv(selectedColor);
                                            }}
                                            hideSliders
                                            defaultColor={'#c0d3fd'}
                                            style={{
                                                width: 200,
                                                height: 200,
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={{}}>
                                    <ButtonSubmit title={(event) ? 'Editar evento' : 'Crear evento'} handleSubmit={handleSubmit} onSubmit={onSubmit}/>
                                </View>
                                {/* Espacio para poder hacer scroll */}
                                <View style={{height: 60}} />
                            </View>
                        </View>
                    </View>

                </ScrollView>

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7f2ff',
    },
    containerForm: {
        width: windowWidth - 80,
        borderRadius: 5,
        gap: 23,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#202020',
        textAlign: 'center',
    },
});
