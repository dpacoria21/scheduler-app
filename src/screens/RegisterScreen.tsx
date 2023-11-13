import React from 'react';
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { RootStackParams } from '../navigators/Navigator';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, stylesInput } from '../components/Input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ButtonSubmit } from '../components/ButtonSubmit';

const {height} = Dimensions.get('window');

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'>{}
export const RegisterScreen = ({navigation}: Props) => {

    const {top} = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex:1, marginTop: top + 10}}
        >

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView showsVerticalScrollIndicator={false} style={{padding: 5}}>
                    <View style={{
                        height: height * 0.9,
                        justifyContent: 'center',
                        gap: 30,
                    }}>
                        <View
                            style={{paddingHorizontal: 50, gap: 28}}
                        >
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 40,
                                fontWeight: '800',
                                color: '#353535',
                                marginBottom: 30,
                            }}>
                                    Registrate
                            </Text>

                            <View style={stylesInput.inputContainer}>
                                <Text style={stylesInput.inputLabel}>
                                    Nombre Completo
                                </Text>
                                <TextInput
                                    placeholder={'Nombre'}
                                    placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                                    style={stylesInput.input}
                                    keyboardType={'default'}
                                    autoCapitalize={'words'}
                                    autoCorrect={false}
                                />
                            </View>

                            <Input label="Correo electronico" placeholder="example@gmail.com" keyboardType="email-address"/>

                            <Input label="Contraseña" placeholder="*********" keyboardType="default" secureText={true}/>

                            <ButtonSubmit title="Completar registro"/>

                            <View>
                                <Text
                                    onPress={() => navigation.navigate('LoginScreen')}
                                    style={{
                                        textAlign: 'center',
                                        color: '#2d2dc8',
                                        fontWeight: '500',
                                        top:-8,
                                    }}
                                >
                                    ¿Ya tienes una cuenta?
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};
