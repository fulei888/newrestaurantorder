import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import DropDown from '../UI/ModalDropOff/ModalDropOff'

const SideDrawer = (props) => {
    let SideDrawerCss = [classes.SideDrawer, classes.Open].join(' ');
    if (props.SideDrawerClosed) {
        SideDrawerCss = [classes.SideDrawer, classes.Close].join(' ');
    }
    return (
        <div className = {classes.onDeskScreen}>
            <DropDown show = {!props.SideDrawerClosed} closeModal={props.closeModal}/>
            <div className = {SideDrawerCss}>
                <div className = {classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated ={props.isAuth}/>
                </nav> 
            </div>
        </div>
    )
}
export default SideDrawer;