import React from 'react';
import classes from './Logo.module.css';
import img from '../../assests/Images/Logo/chineseResLogo.jpg';

const Logo = () => {
    return (
        <div className = {classes.Logo}>
            <img src = {img} alt="burger-logo" />
        </div>
    )
}
export default Logo; 