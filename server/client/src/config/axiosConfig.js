import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://bixbax.herokuapp.com',
});
