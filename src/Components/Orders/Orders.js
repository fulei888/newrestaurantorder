import React, {useState, useEffect} from 'react';
import Order from '../Orders/Order/Order';
import axios from '../../axios-orders';
import classes from './Orders.module.css';
import Spinner from '../UI/Spinner/Spinner';

const Orders = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
  
   
    useEffect(() => {
        getData()
    },[]); 
    const getData = () => {
        axios.get('/orders.json')
        .then(res => {
            console.log(res.data);
            let updateOrder = []
            for(let key in res.data) {
                updateOrder.push(
                    {
                        ...res.data[key],
                        key: key
                    }
                )
            }
            setOrders(updateOrder);
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
        })
    }
    const deleteHandler = (id) => {
        console.log('deleteHandler');
        axios.delete('/orders/' + id+'.json')
        .then(response => {
            console.log(response);
            getData();
        })
    };
    let order = (
        <div>
            {orders.map(order =>
                <Order 
                dishes ={order.dishes}
                key = {order.key}
                price={order.price}
                name = {order.orderData.name}
                phone={order.orderData.phone}
                street={order.orderData.street}
                city={order.orderData.city}
                id = {order.key}
                delete = {deleteHandler}
                />
            )}
        </div>
    )
    if(loading) {
        order = <Spinner />
    }

    return (
        <div className={classes.Orders}>
            {order}
        </div>
    )
}
export default Orders;