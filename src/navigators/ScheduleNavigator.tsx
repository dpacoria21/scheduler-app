import { DrawerContentComponentProps, DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import { AboutScreen } from '../screens/AboutScreen';
import { SchedulerScreen } from '../screens/SchedulerScreen';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { MenuItem } from '../components/MenuItem';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { CreateEventScreen } from '../screens/CreateEventScreen';
import { TodosScreen } from '../screens/TodosScreen';
import { DateData } from 'react-native-calendars';
import { SchedulerDayViewScreen } from '../screens/SchedulerDayViewScreen';
import { SchedulerWeekViewScreen } from '../screens/SchedulerWeekViewScreen';
import { Event } from '../interfaces/storeInterfaces';
import { startLoadEvents } from '../store/calendar/thunks';
import { BackgroundGradient } from '../components/BackgroundGradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ItemScreen {
    title: string,
    icon: string,
    component: string,
}

const windowWitdh = Dimensions.get('window').width;

const Screens: ItemScreen[] = [
    {
        title: 'Calendario',
        icon: 'calendar-number-outline',
        component: 'SchedulerScreen',
    },
    {
        title: 'Week',
        icon: 'calendar-outline',
        component: 'SchedulerWeekViewScreen',
    },
    {
        title: 'Day',
        icon: 'today-outline',
        component: 'SchedulerDayViewScreen',
    },
    {
        title: 'About',
        icon: 'people-outline',
        component: 'AboutScreen',
    },
];

export type RootStackParams = {
    SchedulerScreen: undefined,
    AboutScreen: undefined,
    TodosScreen: undefined,
    CreateEventScreen: {event: Event},
    SchedulerDayViewScreen: {date: DateData}
    SchedulerWeekViewScreen: undefined,
}

const Drawer = createDrawerNavigator<RootStackParams>();

export const SchedulerNavigator = () => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(startLoadEvents());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Drawer.Navigator
            backBehavior="history"
            // initialRouteName="SchedulerScreen"
            screenOptions={{
                drawerStatusBarAnimation: 'fade',
                drawerStyle: {
                    backgroundColor: 'red',
                    width: windowWitdh * 0.8,
                },
                drawerActiveBackgroundColor: '#000',
            }}
            drawerContent={(props) => <MenuInterno {...props}/>}
        >
            <Drawer.Screen name="SchedulerScreen" component={SchedulerScreen} />
            <Drawer.Screen name="AboutScreen" component={AboutScreen} />
            <Drawer.Screen name="TodosScreen" options={{headerShown: false, unmountOnBlur: true}} component={TodosScreen} />
            <Drawer.Screen name="CreateEventScreen" options={{unmountOnBlur: true, headerShown: false}} component={CreateEventScreen} />
            <Drawer.Screen name="SchedulerDayViewScreen" options={{unmountOnBlur: true}} component={SchedulerDayViewScreen} />
            <Drawer.Screen name="SchedulerWeekViewScreen" component={SchedulerWeekViewScreen} />
        </Drawer.Navigator>
    );
};

const MenuInterno = (props: DrawerContentComponentProps) => {

    const {user} = useSelector((state: RootState) => state.auth);
    const {navigation} = props;

    // const [notifications, setNotifications] = useState<Notification[]>([]);

    // const loadNotifications = async() => {
    //     const {data} = await schedulerApi.get<Notification[]>('/events/participants/invitations/me');
    //     setNotifications([...data]);
    // };

    // useEffect(() => {
    //     loadNotifications();
    // }, []);

    return (
        <BackgroundGradient style={{flex: 1}} colors={['#1074b9', '#1e93d9']}>
            <DrawerContentScrollView>
                <View style={styles.container}>

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        marginTop: 15,
                    }}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.closeIconContainer}>
                            <Icon
                                onPress={() => navigation.closeDrawer()}
                                name="arrow-back-outline"
                                size={35}
                                color={'#e2f0fc'}
                                style={styles.closeIcon}
                            />
                        </TouchableOpacity>
                    </View>


                    <View style={styles.userContainer}>
                        {/* <View style={styles.imageContainer}> */}
                        <Image
                            source={require('../assets/profile.png')}
                            style={styles.image}
                        />
                        {/* </View> */}
                        <View style={styles.userInformation}>
                            <Text style={styles.textInformationName}>
                                {user.name}
                            </Text>
                            <Text style={styles.textInformationEmail}>
                                {user.email}
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        gap: 10,
                    }}>
                        {
                            Screens.map((screen) => (
                                <MenuItem
                                    key={screen.title}
                                    title={screen.title}
                                    icon={screen.icon}
                                    component={screen.component}
                                />
                            ))
                        }
                        <MenuItem
                            title="Logout"
                            icon="log-out-outline"
                        />
                    </View>

                    <View style={styles.notificationContainer}>
                        <View style={styles.notificationTitleContainer}>
                            <Text style={styles.notificationText}>
                                Notificaciones
                            </Text>
                            <View style={styles.notificationCountContainer}>
                                <Text style={styles.notificationNumber}>
                                    0
                                </Text>
                            </View>
                        </View>
                        {/* {notifications.map((notification) => (
                            <View>
                                <Text>
                                    {notification.status}
                                </Text>
                            </View>
                        ))} */}
                    </View>

                </View>
            </DrawerContentScrollView>
        </BackgroundGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        gap: 15,
    },

    closeIconContainer: {
        borderRadius: 100,
        backgroundColor: '#1074b9',
    },
    closeIcon: {
        padding: 8,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    userContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    image: {
        width: 85,
        height: 85,
        resizeMode: 'cover',
    },
    userInformation: {
        flex: 1,
        gap: 2,
    },
    textInformationName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#f1f1f1',
    },
    textInformationEmail: {
        fontSize: 15,
        fontWeight: '500',
        color: '#ddd',
    },
    panelText: {
        fontSize: 20,
        color: '#151515',
        fontWeight: '600',
    },

    notificationContainer: {
        paddingHorizontal: 10,
    },
    notificationTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomColor: '#a5a5a5',
        borderBottomWidth: 2,
        marginTop: 20,
    },
    notificationText: {
        color: '#f1f1f1',
        fontSize: 18,
    },

    notificationCountContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f5d95',
        borderRadius: 15,
        width: 45,
        height: 30,
    },
    notificationNumber: {
        color: '#f1f1f1',
        fontSize: 16,
        top: -1,
        fontWeight: 'bold',
    },
});
