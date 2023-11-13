import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { RootStackParams } from '../navigators/Navigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Input } from '../components/Input';
import { ButtonSubmit } from '../components/ButtonSubmit';


const {height} = Dimensions.get('window');

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'>{}
export const LoginScreen = ({navigation}: Props) => {

    const {top} = useSafeAreaInsets();

    console.log(height);

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
                        <View style={{
                            // flex:1,
                            alignItems: 'center',
                            paddingVertical: 5,
                        }}>
                            <Image
                                source={require('../assets/scheduler.png')}
                                resizeMode="cover"
                                style={{
                                    width: 325,
                                    height: 325,
                                }}
                            />
                        </View>
                        <View
                            style={{paddingHorizontal: 50, gap: 25}}
                        >
                            <Input label="Correo electronico" placeholder="example@gmail.com" keyboardType="email-address"/>

                            <Input label="Contraseña" placeholder="*********" keyboardType="default" secureText={true}/>

                            <ButtonSubmit title="Iniciar sesión"/>

                            <View>
                                <Text
                                    onPress={() => navigation.navigate('RegisterScreen')}
                                    style={{
                                        textAlign: 'right',
                                        color: '#2d2dc8',
                                        fontWeight: '500',
                                        top:-15,
                                    }}
                                >
                                    ¿No tienes cuenta?
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};
