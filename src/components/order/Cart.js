import { useEffect, useState } from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { deleteCartItem, getCartItems, updateCartItems } from '../../api/apiOrder';
import { userInfo } from '../../utils/auth';
import CartItem from './CartItem';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const loadCart = () => {
        getCartItems(userInfo().token)
        .then(response => setCartItems(response.data))
        .catch(() => { })
    }

    useEffect(() => {
        loadCart()
    }, [])

    const increaseItem = (item) => () => {
        if(item.count === 5) return
        const cartItem = {
            ...item,
            count: item.count + 1
        }
        updateCartItems(userInfo().token, cartItem)
        .then(response => loadCart())
        .catch(err => { })
    }

    const decreaseItem = (item) => () => {
        if(item.count === 1) return
        const cartItem = {
            ...item,
            count: item.count - 1
        }
        updateCartItems(userInfo().token, cartItem)
        .then(response => loadCart())
        .catch(err => { })
    }

    const removeItem = (item)=>{  
        if(!window.confirm('Delete Item?')){
            return
        }else{
            deleteCartItem(userInfo().token, item)
            .then(response => { loadCart() })
            .catch(() => {})
        }
    }


    const getCartTotal = () => {
        const arr = cartItems.map(item => item.price * item.count);
        const sum = arr.reduce((a, b) => a + b, 0);
        return sum;
    }

    return (
        <Layout title="Your Cart" description="Hurry up! Place your order!" className="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Order</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Cart</li>
                </ol>
            </nav>
            <div className="container my-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" width='10%'>#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col" align="right">Price</th>
                            <th scop="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, i) => <CartItem item={item} serial={i + 1} key={item._id} increaseItem={increaseItem(item)} decreaseItem={decreaseItem(item)} removeItem={removeItem} />)}
                        <tr>
                            <th scope="row" />
                            <td colSpan={3}>Total</td>
                            <td>৳{getCartTotal()}</td>
                            <td />
                        </tr>
                        <tr>
                            <th scope="row" />
                            <td colSpan={5} className="text-right" align='right'>
                                <Link to="/"><button className="btn btn-warning" style={{marginRight: '20px'}}>Continue Shopping</button></Link>
                                <Link to="/shipping" className="btn btn-success">Proceed To Checkout</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Cart;