import React from 'react';
import classes from './Model.module.css'
import ModalDropOff from '../ModalDropOff/ModalDropOff' 

const Model = (props) => {

    document.body.style.overflow = 'unset';
       if(props.show) {
           console.log('in')
           document.body.style.overflow = 'hidden';
       }
   
    return (
        <div >
            <ModalDropOff show = {props.show} closeModal ={props.closeModal}/>
                <div 
                    className = {classes.Modal}
                    style = {{
                        transform: props.show? 'translateY(0)' : 'translateY(-1000vh)',
                        opacity: props.show? '1' : '0',
                        
                    }}>
                        {props.children}
                </div>
               
        </div>
    )
}
export default React.memo(Model, 
    (prevProps, nextProps) => 
    nextProps.show === prevProps.show && nextProps.children === prevProps.children
    );