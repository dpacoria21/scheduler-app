import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { RootStackParams } from '../navigators/Navigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Input } from '../components/Input';
import { ButtonSubmit } from '../components/ButtonSubmit';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { startLogin } from '../store/auth/thunks';


const {height} = Dimensions.get('window');

export type LoginFormData = {
    email: string,
    password: string,
}

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'>{}
export const LoginScreen = ({navigation}: Props) => {

    const {user, status} = useSelector((state: RootState) =>state.auth);
    // const dispatch = useDispatch();
    const dispatch = useAppDispatch();

    const {top} = useSafeAreaInsets();
    const { control, handleSubmit, formState:{errors} } = useForm<LoginFormData>();

    console.log({user, status});

    const onSubmit = (data: LoginFormData) => {
        dispatch(startLogin(data));
    };

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

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({field: {onChange, value, onBlur}}) => (
                                    <Input errors={errors.email} onBlur={onBlur} onChange={onChange} value={value} label="Correo electronico" placeholder="example@gmail.com" keyboardType="email-address"/>
                                )}
                                name="email"
                            />

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({field: {onChange, value, onBlur}}) => (
                                    <Input errors={errors.password} onBlur={onBlur} onChange={onChange} value={value} label="Contraseña" placeholder="*********" keyboardType="default" secureText={true}/>
                                )}
                                name="password"
                            />

                            <ButtonSubmit title="Iniciar sesión" handleSubmit={handleSubmit} onSubmit={onSubmit}/>

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
                                    ¿No tienes una cuenta?
                                </Text>
                            </View>

                        </View>

                    </View>

                </ScrollView>

            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    );
};
