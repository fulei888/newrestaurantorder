import React from 'react';
import SideSummaryDish from './SideSummaryDish/SideSummaryDish';
import classes from './SideSummaryDishes.module.css';

const SideSummaryDishes = (props) => {
    let controls = props.controls;
    controls = controls.filter(ctr => props.dishes[ctr.type]!==0)
    return (
        <div className = {classes.SideSummaryContainer}> 
            <div className = {classes.SideSummaryDishes}>
                {controls.map(ctr => (
                    <SideSummaryDish 
                    dishName = {ctr.type}
                    key = {ctr.type}
                    indivdualDishNum = {props.dishes[ctr.type]}
                    unitPrice = {props.unitePrices[ctr.type]}
                    price ={props.prices[ctr.type]}
                    added = {()=>props.added(ctr.type)}
                    removed = {()=>props.removed(ctr.type)}
                    disableRemovedButton = {props.dishes[ctr.type]===0}
                    />
                ))}
            <h4>Total Price: {Math.abs(props.totalPrice.toFixed(2))}</h4>
            <button 
                className = {classes.OrderButton} 
                disabled = {Math.abs(props.totalPrice.toFixed(2))===0}
                onClick = { props.purchasing}
            >ORDER</button>
            </div>
            </div>
    )

}
export default SideSummaryDishes;