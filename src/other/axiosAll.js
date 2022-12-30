import axios from 'axios';

const axiosAll = axios.create({
    baseURL: 'https://quocson.fatcatweb.top/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default axiosAll;