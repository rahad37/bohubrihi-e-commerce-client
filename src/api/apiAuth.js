import axios from 'axios';
// import { API } from '../utils/config';

export const register = (user) => {
    return axios.post(`https://bohubrihi-e-commerce.herokuapp.com/user/signup`, user, {
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}

export const login = (user) => {
    return axios.post(`https://bohubrihi-e-commerce.herokuapp.com/user/login`, user, {
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}