import axios from 'axios';
// import { API } from '../utils/config';

export const register = (user) => {
    return axios.post(`http://localhost:5002/user/signup`, user, {
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}

export const login = (user) => {
    return axios.post(`http://localhost:5002/user/login`, user, {
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}