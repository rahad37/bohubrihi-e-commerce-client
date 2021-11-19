import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import {getProducts, getCategories, getFilteredProducts} from '../../api/apiProduct';
import {showError, showSuccess} from '../../utils/messages';
import {prices} from '../../utils/prices';
import {isAuthenticated, userInfo} from '../../utils/auth';
import Card from './Card';
import CheckBox from './CheckBox';
import RadioBox from './RadioBox';
import { addToCart } from '../../api/apiOrder';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(30);
    const [order, setOrder] = useState('desc');
    const [error, setError] = useState(false);
    const [skip, setSkip] = useState(0);
    const [sortBy, setSortBy] = useState('createdAt');
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        category: [],
        price: []
    })

    useEffect(() => {
        getProducts('price', order, limit)
        .then(response => setProducts(response.data))
        .catch(err => setError('Failed to load products'))

        getCategories()
        .then(response => setCategories(response.data))
        .catch(err => setError('Failed to load categories'))
    }, [])

    const handleFilters = (myFilters, filterBy) => {
        const newFilters = {...filters}
        if(filterBy === 'category'){
            newFilters[filterBy] = myFilters
        }
        if(filterBy === 'price'){
            const data = prices;
            let arr = [];
            for(let i in data){
                if(data[i].id === parseInt(myFilters)){
                    arr = data[i].arr;
                }
            }
            newFilters[filterBy] = arr;
        }
        setFilters(newFilters);
        getFilteredProducts(skip, limit, newFilters, order, sortBy)
        .then(response => setProducts(response.data))
        .catch(err => setError('Failed load product'))
    }

    const handleAddToCart = product => () => {
        if(isAuthenticated()){
            setError(false);
            setSuccess(false);
            const user = userInfo();
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price
            }
            addToCart(user.token, cartItem)
            .then(response => setSuccess(true))
            .catch(err => {
                if(err.response) setError(err.response.data);
                else setError('Added to cart failed');
            })
        }else{
            setSuccess(false);
            setError('Please Login First...')
        }
    }

    const showFilter = () => {
        return(<>
            <div className="row">
                <div className="col-sm-3">
                    <h5>Filter By Categories:</h5>
                    <ul>
                        <CheckBox categories={categories} handleFilters={myFilters => handleFilters(myFilters, 'category')}/>
                    </ul>
                </div>
                <div className="col-sm-5">
                    <h5>Filter By Price: </h5>
                    <div className="row">
                        <RadioBox prices={prices} handleFilters={myFilters => handleFilters(myFilters, 'price')}/>
                    </div>
                </div>
            </div>
        </>)
    }

    return (
        <div>
            <Layout title='home-page' className='container-fluid'>
                {showFilter()}
                <div style={{width: '100%'}}>
                    {showError(error, error)}
                    {showSuccess(success, 'Added to cart successfully!')}
                </div>
                <div className="row">
                    {products && products.map(product => <Card product={product} key={product._id} handleAddToCart={handleAddToCart(product)} />)}
                </div>
            </Layout>
        </div>
    );
};

export default Home;