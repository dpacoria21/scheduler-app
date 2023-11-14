import { DrawerContentComponentProps, DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { AboutScreen } from '../screens/AboutScreen';
import { SchedulerScreen } from '../screens/SchedulerScreen';
import { Image, StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { MenuItem } from '../components/MenuItem';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Drawer = createDrawerNavigator();

export const SchedulerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStatusBarAnimation: 'fade',
            }}
            drawerContent={(props) => <MenuInterno {...props}/>}
        >
            <Drawer.Screen name="AboutScreen" component={AboutScreen} />
            <Drawer.Screen name="SchedulerScreen" component={SchedulerScreen} />
        </Drawer.Navigator>
    );
};

const MenuInterno = (props: DrawerContentComponentProps) => {

    const {user} = useSelector((state: RootState) => state.auth);
    const {navigation} = props;

    return (
        <DrawerContentScrollView style={{backgroundColor: '#e2e2e2'}}>
            <View
                style={styles.container}
            >

                <View style={styles.closeIconContainer}>
                    <Icon
                        onPress={() => navigation.closeDrawer()}
                        name="chevron-back-outline"
                        size={45}
                        color={'#252525'}
                        style={styles.closeIcon}
                    />
                </View>

                <View style={styles.imageContainer}>
                    <View style={styles.imageBackground}>
                        <Image
                            source={require('../assets/user.png')}
                            style={styles.image}
                        />
                    </View>
                </View>
                <View style={{
                    alignItems: 'center',
                }}>
                    <Text style={styles.panelText}>
                        {user.name}
                    </Text>
                </View>

                <View style={{
                    gap: 10,
                }}>
                    <MenuItem
                        text="Calendario"
                        icon="calendar-outline"
                        componente="SchedulerScreen"
                    />
                    <MenuItem
                        text="About"
                        icon="people-outline"
                        componente="AboutScreen"
                    />
                    <MenuItem
                        text="Logout"
                        icon="log-out-outline"
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        gap: 30,
    },

    closeIconContainer: {
        flex:1,
        alignItems: 'flex-end',
        paddingTop: 20,
    },
    closeIcon: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    imageContainer: {
        flex:1,
        alignItems: 'center',
    },
    imageBackground: {
        height: 175,
        width: 175,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    image: {
        tintColor: '#252525',
        width: 90,
        height: 90,
    },
    panelText: {
        fontSize: 20,
        color: '#151515',
        fontWeight: '600',
    },
});
