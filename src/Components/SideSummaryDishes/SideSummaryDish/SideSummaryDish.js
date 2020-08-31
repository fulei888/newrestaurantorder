import React from 'react';
import classes from './SideSummaryDish.module.css';
const SideSummaryDish = props => {
    return (
        <div className = {classes.SideSummaryDish}>
            <span className = {classes.dishName}>{props.dishName}</span>
            <span>{props.unitPrice}</span>
            <span>*</span>
            <span>{props.indivdualDishNum}</span>
            <span>=</span>
            <span>{Math.abs(props.price.toFixed(2))}</span>
            <div className = {classes.addRemoveNum}>
            <button onClick ={props.added}>+</button>
                <span>{props.indivdualDishNum}</span>
            <button disabled = {props.disableRemovedButton} onClick = {props.removed}>-</button>
            </div>
        </div>
    )
}
export default SideSummaryDish;