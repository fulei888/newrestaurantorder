import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
const NavigationItems = (props) => {
    return (
            <ul className={classes.NavigationItems}>
                <NavigationItem exact Link='/'>Menue</NavigationItem>
                {props.isAuthenticated? <NavigationItem Link='/Orders'>Orders</NavigationItem>: null}

                {props.isAuthenticated 
                 ?<NavigationItem Link='/logout'>Logout</NavigationItem>
                 :<NavigationItem Link='/auth'>Login</NavigationItem>
            }
                
            </ul>
    )
}
export default NavigationItems;