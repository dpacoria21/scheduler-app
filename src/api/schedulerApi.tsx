import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

export const schedulerApi = axios.create({
    baseURL: API_URL,
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
