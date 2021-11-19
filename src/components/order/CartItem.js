import React from 'react';
import { API } from '../../utils/config';

const CartItem = (props) => {
    const {item, serial, increaseItem, decreaseItem, removeItem} = props;
    return (
        <tr>
            <th scope="row">{serial}</th>
            <th><img src={`https://bohubrihi-e-commerce.herokuapp.com/product/photo/${item.product._id}`} style={{width: "8%"}} alt=''/></th>
            <td style={{width: "15%"}}>{props.item.product.name}</td>
            <td style={{width: "10%"}}>
                <button className="btn btn-outline-primary btn-sm" onClick={decreaseItem}>-</button>
                <span> {props.item.count} </span>
                <button className="btn btn-outline-primary btn-sm" onClick={increaseItem}>+</button>
            </td>
            <td align="right">৳{props.item.price * props.item.count}  </td>
            <td style={{width: "10%"}}><button className="btn btn-danger btn-sm" onClick={() =>removeItem(item)}>Remove</button></td>
            
        </tr>)
};


export default CartItem;