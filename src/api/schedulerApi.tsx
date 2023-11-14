import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const schedulerApi = axios.create({
    baseURL: 'https://scheduler-api-production-ef32.up.railway.app/api',
    withCredentials: true,
});

schedulerApi.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);
