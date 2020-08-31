import  React from 'react';

import classes from './ModalDropOff.module.css';

const ModalDropOff = (props) => (
        props.show? <div className = {classes.BackDrop} onClick={props.closeModal}></div> : null
)
export default ModalDropOff; 