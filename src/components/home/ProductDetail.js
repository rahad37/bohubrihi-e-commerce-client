import React, { useState, useEffect } from 'react';
import {showError, showSuccess} from '../../utils/messages';
import {Link} from 'react-router-dom';
import Layout from '../Layout';
import { getProductDetails } from '../../api/apiProduct';
import { addToCart } from '../../api/apiOrder';
import { isAuthenticated, userInfo } from '../../utils/auth';
import { API } from './../../utils/config';


const ProductDetail = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const id = props.match.params.id;
        getProductDetails(id)
        .then(response => setProduct(response.data))
        .catch(err => setError('Failed to load product'))
    }, [])
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

    return (
        <div>
            <Layout title="product-page">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb container">
                    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li class="breadcrumb-item"><a href="#">Product</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{product.category ? product.category.name : ""}</li>
                </ol>
            </nav>
            <div>
                {showSuccess(success, 'Item Added to Cart!')}
                {showError(error, error)}
            </div>
            <div className="row container">
                <div className="col-6">
                    <img
                        src={`https://bohubrihi-e-commerce.herokuapp.com/product/photo/${product._id}`}
                        alt={product.name}
                        width="100%"
                    />
                </div>
                <div className="col-6">
                    <h3>{product.name}</h3>
                    <span style={{ fontSize: 20 }}>&#2547;</span>{product.price}
                    <p>{product.quantity ? (<span class="badge badge-pill badge-primary">In Stock</span>) : (<span class="badge badge-pill badge-danger">Out of Stock</span>)}</p>
                    <p>{product.description}</p>
                    {product.quantity ? <>
                        &nbsp;<button className="btn btn-outline-primary btn-md" onClick={handleAddToCart(product)}>Add to Cart</button>
                    </> : ""}
                </div>
            </div>
            </Layout>
        </div>
    );
};

export default ProductDetail;