import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DateInput } from './DateInput';
import { Input } from './Input';
import { Controller, useForm } from 'react-hook-form';
import { SubmitEvent } from '../interfaces/events';
import { ButtonSubmit } from './ButtonSubmit';
import { addHours } from 'date-fns';

const {width: windowWidth} = Dimensions.get('window');

export const CreateEventModal = () => {

    const [isVisible, setIsVisible] = useState(false);

    const { control, handleSubmit, reset, formState:{errors}, watch} = useForm<SubmitEvent>({defaultValues: {
        title: '',
        description: '',
        start: new Date().toISOString(),
        end: addHours(new Date(), 2).toISOString(),
    }});

    const closeModal = () => {
        setIsVisible(false);
        reset({
            title: '',
            description: '',
            start: new Date().toISOString(),
            end: addHours(new Date(), 2).toISOString(),
        });
    };

    const onSubmit = (data: SubmitEvent) => {
        console.log(data);
        setIsVisible(false);
        closeModal();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex:1}}
        >
            <View style={{position: 'absolute', bottom: 35, right: 35}}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setIsVisible(true)}>
                    <Icon
                        name="add-outline"
                        size={50}
                        color={'#101010'}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 100,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                visible={isVisible}
                transparent
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        width: windowWidth - 50,
                        backgroundColor: '#e7f2ff',
                        borderRadius: 5,
                        paddingHorizontal: 25,
                        paddingTop: 15,
                        paddingBottom: 18,
                        gap: 10,
                    }}>
                        <TouchableOpacity onPress={closeModal} activeOpacity={0.7} style={{
                            position: 'absolute',
                            right: -15,
                            top: -15,
                        }}>
                            <Icon
                                name="close-outline"
                                size={35}
                                color={'#b1d3ff'}
                                style={{
                                    backgroundColor: '#0824ff',
                                    borderRadius: 100,
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: '600',
                            color: '#2b56ff',
                        }}>
                            Crear evento
                        </Text>
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

                        <ButtonSubmit title="Crear evento" handleSubmit={handleSubmit} onSubmit={onSubmit}/>

                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};
