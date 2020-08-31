import React from 'react';
import classes from './DishMenu.module.css';
// import dish1Link from '../../../assests/Images/dish1.jpg';
import dishLink1 from '../../../assests/Images/dishes_img/dish1.jpg';
import dishLink2 from '../../../assests/Images/dishes_img/dish2.jpeg';
import dishLink3 from '../../../assests/Images/dishes_img/dish3.jpg';
import dishLink4 from '../../../assests/Images/dishes_img/dish4.jpg';
import dishLink5 from '../../../assests/Images/dishes_img/dish5.jpg';
import dishLink6 from '../../../assests/Images/dishes_img/dish6.jpeg';
import dishLink7 from '../../../assests/Images/dishes_img/dish7.jpg';
import dishLink8 from '../../../assests/Images/dishes_img/dish8.jpg';
import dishLink9 from '../../../assests/Images/dishes_img/dish9.jpg';
import dishLink10 from '../../../assests/Images/dishes_img/dish10.jpg';
import dishLink11 from '../../../assests/Images/dishes_img/dish11.jpg';
import dishLink12 from '../../../assests/Images/dishes_img/dish12.jpeg';
import dishLink13 from '../../../assests/Images/dishes_img/dish13.jpeg';
import dishLink14 from '../../../assests/Images/dishes_img/dish14.jpeg';
import dishLink15 from '../../../assests/Images/dishes_img/dish15.jpg';
import dishLink16 from '../../../assests/Images/dishes_img/dish16.jpeg';
import dishLink17 from '../../../assests/Images/dishes_img/dish17.jpg';
import dishLink18 from '../../../assests/Images/dishes_img/dish18.jpg';
import dishLink19 from '../../../assests/Images/dishes_img/dish19.jpg';
import dishLink20 from '../../../assests/Images/dishes_img/dish20.jpg';

const dishImgLinks = {
        dish1: dishLink1,
        dish2: dishLink2,
        dish3: dishLink3,
        dish4: dishLink4,
        dish5: dishLink5,
        dish6: dishLink6,
        dish7: dishLink7,
        dish8: dishLink8,
        dish9: dishLink9,
        dish10: dishLink10,
        dish11: dishLink11,
        dish12: dishLink12,
        dish13: dishLink13,
        dish14: dishLink14,
        dish15: dishLink15,
        dish16: dishLink16,
        dish17: dishLink17,
        dish18: dishLink18,
        dish19: dishLink19,
        dish20: dishLink20
}
const DishMenu = (props) => {
    return (
        <div className = {classes.DishMenu}>
            <img onClick = {props.clickImg} src = {dishImgLinks[props.imgName]} alt={props.imgName}/>
            <div className = {classes.AddMinusBar}>
                <button onClick ={props.added}>+</button>
                <span>{props.indivdualDishNum}</span>
                <button disabled = {props.disableRemovedButton} onClick = {props.removed}>-</button>
            </div>
            <p>Price: {Math.abs(props.price.toFixed(2))}</p>
        </div>
    )
}
export default DishMenu;