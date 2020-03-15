import axios from 'axios';

const api = axios.create({
    baseURL: 'http://desenv01_3169_8:3333'
});

export default api;