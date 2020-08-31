import React from 'react';
import DishMenu from './DishMenu/DishMenu';
import classes from './DishMenus.module.css';

const DishMenus = (props) => {
    const controls = props.controls;
    return (
        <div className = {classes.DishMenus}>
             {controls.map(ctr => (
                <DishMenu 
                key = {ctr.type}
                added = {()=>props.added(ctr.type)}
                removed = {()=>props.removed(ctr.type)}
                indivdualDishNum = {props.dishes[ctr.type]}
                disableRemovedButton = {props.dishes[ctr.type]===0}
                price ={props.prices[ctr.type]}
                clickImg = {()=>props.added(ctr.type)}
                imgName = {ctr.type}
                testname = {'dish1'}
                />
            ))}
        </div>
    )
}
export default DishMenus;