import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from '../../ToggleButton/ToggleButton';
const Toolbar = (props) => {

    return (
        <header className = {classes.Toolbar}> 
            <ToggleButton  clicked = {props.clickOpenSideDrawer}/>
            <Logo />
            <nav>
                <NavigationItems isAuthenticated ={props.isAuth}/>
           </nav>
        </header>
    )
}

export default Toolbar;