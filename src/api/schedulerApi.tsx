import axios from 'axios';

export const schedulerApi = axios.create({
    baseURL: 'https://scheduler-api-production-ef32.up.railway.app/api',
    timeout: 1000,
    withCredentials: true,
});
