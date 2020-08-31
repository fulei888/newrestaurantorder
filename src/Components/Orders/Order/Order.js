import React from 'react';
import classes from './Order.module.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Order = (props) => {
    let dishes = []
    for(let key in props.dishes) {
        dishes.push(
            {
                name: key,
                num: props.dishes[key]
            }
        )
    }
    let outPutIngredients = dishes.map(
        ig => {
           return <span key={ig.name}><span>{ig.name} : </span><span>{ig.num}</span></span>
        }
    )

   
    

    return (
            <div className = {classes.Order}>
                <p>Name: {props.name}</p>
                <p>Phone: {props.phone}</p>
                <p>Address: {props.street}</p>
                <p>City: {props.city}</p>
                <p>Dishes:{outPutIngredients}</p>
                <p>price: {props.price}</p>
                <HighlightOffIcon className = {classes.HighlightOffIcon} onClick = {()=>props.delete(props.id)} color="action"/>
            </div>
            );

}
export default Order;