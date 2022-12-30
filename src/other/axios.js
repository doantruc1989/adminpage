import axios from 'axios';

const token = localStorage.hasOwnProperty('user') ? (JSON.parse(localStorage.getItem("user"))).access_token : '';
const instance = axios.create({
    baseURL: 'https://quocson.fatcatweb.top/',
    headers: { Authorization: `Bearer ${token}` },
});

export default instance;