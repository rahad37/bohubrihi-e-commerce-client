import axios from 'axios';
import { API } from '../utils/config';

export const getProducts = (sortBy, order, limit) => {
    return axios.get(`https://bohubrihi-e-commerce1.herokuapp.com/product?sortBy=${sortBy}&order=${order}&limit=${limit}`);
}

export const getProductDetails = (id) => {
    return axios.get(`https://bohubrihi-e-commerce1.herokuapp.com/product/${id}`);
}

export const getCategories = () => {
    return axios.get(`https://bohubrihi-e-commerce1.herokuapp.com/category`)
}


export const getFilteredProducts = (skip, limit, filters = {}, order, sortBy) => {
    const data = {
        order: order,
        sortBy: sortBy,
        limit: limit,
        skip: skip,
        filters: {...filters}
    }
    return axios.post(`${API}/product/filter`, data, {
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}