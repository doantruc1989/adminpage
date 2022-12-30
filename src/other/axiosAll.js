import axios from 'axios';

const axiosAll = axios.create({
    baseURL: 'http://localhost:3006',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default axiosAll;