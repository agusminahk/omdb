import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://bixbax.herokuapp.com',
});
