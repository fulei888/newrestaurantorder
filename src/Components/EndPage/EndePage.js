import React from 'react';
import Button from '../UI/Button/Button';
import classes from './EndPage.module.css';
const EndPage = (props) => {
    const backMainMenuHandler = () => {
        console.log(props);
        props.history.push('/');
    }
    return(
        <div className = {classes.EndPage}>
            <h4>Thank You!</h4>
            <h4>You will get your meal soon!</h4>
            <Button btnType="Danger" clicked={backMainMenuHandler}>RETURN TO MAIN MENU</Button>
            </div>
    )
}
export default EndPage;