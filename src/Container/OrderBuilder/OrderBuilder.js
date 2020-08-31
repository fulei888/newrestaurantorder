import React, {useState}from 'react';
import DishMenus from '../../Components/DishMenus/DishMenus';
import SideSummaryDishes from '../../Components/SideSummaryDishes/SideSummaryDishes';
import ContactData from '../../Components/ContactData/ContactData';
import classes from './OrderBuilder.module.css';
import Modal from '../../Components/UI/Model/Model';

// Stripe
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const UnitDishPrices = {
    dish1: 0.5,
    dish2: 1,
    dish3: 1.5,
    dish4: 2.3,
    dish5: 2.1,
    dish6: 0.5,
    dish7: 1,
    dish8: 1.5,
    dish9: 2.3,
    dish10: 2.1,
    dish11: 0.5,
    dish12: 1,
    dish13: 1.5,
    dish14: 2.3,
    dish15: 2.1,
    dish16: 0.5,
    dish17: 1,
    dish18: 1.5,
    dish19: 2.3,
    dish20: 2.1
}
const OrderBuilder = (props) => {
    let [menus, resetMenus] = useState(
        {
            dish1: 0,
            dish2: 0,
            dish3: 0,
            dish4: 0,
            dish5: 0,
            dish6: 0,
            dish7: 0,
            dish8: 0,
            dish9: 0,
            dish10: 0,
            dish11: 0,
            dish12: 0,
            dish13: 0,
            dish14: 0,
            dish15: 0,
            dish16: 0,
            dish17: 0,
            dish18: 0,
            dish19: 0,
            dish20: 0
        }
    )
    let [prices, resetPrice] = useState(
        {
            dish1: 0,
            dish2: 0,
            dish3: 0,
            dish4: 0,
            dish5: 0,
            dish6: 0,
            dish7: 0,
            dish8: 0,
            dish9: 0,
            dish10: 0,
            dish11: 0,
            dish12: 0,
            dish13: 0,
            dish14: 0,
            dish15: 0,
            dish16: 0,
            dish17: 0,
            dish18: 0,
            dish19: 0,
            dish20: 0
        }
    )
    let [totalPrice, resetTotalPrice] = useState(0);
    const [purchasing, setPurchasing] = useState(false);
    const controls = [
        {type: 'dish1'},
        {type: 'dish2'},
        {type: 'dish3'},
        {type: 'dish4'},
        {type: 'dish5'},  
        {type: 'dish6'},
        {type: 'dish7'},
        {type: 'dish8'},
        {type: 'dish9'},
        {type: 'dish10'},  
        {type: 'dish11'},
        {type: 'dish12'},
        {type: 'dish13'},
        {type: 'dish14'},
        {type: 'dish15'},  
        {type: 'dish16'},
        {type: 'dish17'},
        {type: 'dish18'},
        {type: 'dish19'},
        {type: 'dish20'}  
    ]
     
   
    const addDishes = (type) => {
        let oldCount = menus[type];
        let newCount = oldCount +1;
        let upDateMenus = {
            ...menus
        }
        upDateMenus[type] = newCount;
        let updatePrice  = {
            ...prices
        }
         updatePrice[type] = updatePrice[type] + UnitDishPrices[type];
         let upDateTotalPrice = totalPrice
         upDateTotalPrice = upDateTotalPrice + UnitDishPrices[type];
        resetMenus(upDateMenus);
        resetPrice(updatePrice);
        resetTotalPrice(upDateTotalPrice);
    }
    const removeDishes = (type) => {
        let oldCount = menus[type];
        let newCount = oldCount -1;
        if(oldCount <= 0) {
            return;
        }
        let upDateMenus = {
            ...menus
        }
        upDateMenus[type] = newCount;
        let updatePrice  = {
            ...prices
        }
         updatePrice[type] = prices[type] - UnitDishPrices[type];
         let upDateTotalPrice = totalPrice;
        upDateTotalPrice = upDateTotalPrice - UnitDishPrices[type];
        resetMenus(upDateMenus);
        resetPrice(updatePrice);
        resetTotalPrice(upDateTotalPrice);
    }
    const purchingHandler = () => {
        // console.log(props);
        // props.history.push('/contactData')
        setPurchasing(true);
    }
    const closeModalHandler = () => {
        setPurchasing(false);
    }
    const stripePromise = loadStripe('pk_test_51HJ0tkHbii5DBKKcU6SIxsCq8DPqRvPHS2j2lNAzWkAdo5EBMukCeqChXnqFJN6nLHLwTpB6JhK1cvXS8RZNNhyD00BiyDANe3');
   
    return (
        <div className ={classes.OrderBuilder}>
            
            <Modal show = {purchasing} closeModal = {closeModalHandler}>
            <Elements stripe={stripePromise}>
                <ContactData 
                goBack = {closeModalHandler}
                totalPrice = {totalPrice.toFixed(2)}
                dishes = {menus}
                onSuccessfulCheckout={() => props.history.push("/endpage")}
                {...props}
                />
            </Elements>
            </Modal>
            <DishMenus 
                added = {addDishes}
                removed = {removeDishes}
                dishes = {menus}
                prices = {prices} 
                clickImg = {addDishes}
                controls= {controls} 
            />
            <SideSummaryDishes 
                prices = {prices}
                dishes = {menus}
                unitePrices = {UnitDishPrices} 
                totalPrice = {totalPrice}
                added = {addDishes}
                removed = {removeDishes}
                purchasing = {purchingHandler}
                controls = {controls}
            />
           
        </div>
    )
}
export default OrderBuilder;