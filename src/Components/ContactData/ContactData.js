import React, {useState} from 'react';
import localServerAxios from "axios";
import Spinner from '../UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../axios-orders';
import Input from '../UI/Input/Input';
import Row from "./prebuilt/Row";
import SubmitButton from "./prebuilt/SubmitButton";
import styled from "@emotion/styled";
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState (
      {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name',
                name: 'name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street',
                name: 'line1'

            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
       
        city: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'City',
                name: 'city'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        state: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'State',
                name: 'state'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code',
                name: 'zip'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        phone: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Phone Number',
                name: 'phone'
            },
            value: '',
            validation: {
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail',
                name:'email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ],
                name:'deliveryMethod'
            },
            value: '',
            validation: {},
            valid: true
        }
    }) 
        const [formIsValid, setFormIsValid] = useState(false);
        const [loading, setLoading] = useState(false);
        const [isProcessing, setIsProcessing] = useState(false);
    
    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            //console.log(updatedOrderForm[inputIdentifier],updatedOrderForm[inputIdentifier].valid);
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        //console.log('formIsValid',formIsValid);
        setOrderForm(updatedOrderForm); 
        setFormIsValid(formIsValid);
    }
    
  
    const cardElementOptions = {
        style: {
            base: {
                fontSize: "16px",
                color: "#9b9b9b",
                "::placeholder": {
                    color: "#9b9b9b"
                }

            },
            invalid: {
                color: '#aa272f',
                iconColor: '#aa272f',
            }   
        },
        hidePostalCode: true,
    }



    const CardElementContainer = styled.div`
        height: 40px;
        display: flex;
        align-items: center;
    
        & .StripeElement {
        width: 100%;
        padding: 10px;
        }
    `;
    
    const stripe = useStripe();
    const elements = useElements();

    const handleFormSubmit = async ev => {
        ev.preventDefault();
        ev.persist()
        
        //submitHandler
        // setIsProcessing(true);
        const billingDetails = {
            name: ev.target.name.value,
            email: ev.target.email.value,
            address: {
            city: ev.target.city.value,
            line1: ev.target.line1.value,
            state: ev.target.state.value,
            postal_code: ev.target.zip.value
            }
        }
        
        const cardElement = elements.getElement(CardElement);
       
        const res = await localServerAxios.post('https://us-central1-restrauntordermenu.cloudfunctions.net/api/pay', {
        amount: (props.totalPrice*100).toFixed(0), 
        billingDetails: billingDetails,
        })

        // const res = await localServerAxios.post('http://localhost:8585/pay', {
        //     amount: (props.totalPrice*100).toFixed(0), 
        //     billingDetails: billingDetails,
        //     })
        const clientSecret = res.data['client_secret'];
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: billingDetails
            },
          });

          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              console.log('Money is in the bank!');
               //orderHandler
        setLoading(true);
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        let updateDishes = {...props.dishes};
        Object.keys(updateDishes).forEach((key) => (updateDishes[key] === 0||null) && delete updateDishes[key]);

        const order = {
            dishes: updateDishes,
            price: props.totalPrice,
            orderData: formData
        }
        await axios.post( '/orders.json', order )
            .then( response => {
               console.log('toFirebase success')
               props.onSuccessfulCheckout();
            } )
            .catch( error => {
                setLoading(false);
            } );

            }
          }

        };


    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }
    let form = (
        <div>
        <form onSubmit={handleFormSubmit}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
                <Row>
                    <CardElementContainer>
                    <CardElement options={cardElementOptions}/>
                    </CardElementContainer>
                </Row>

                <Row>
                    <SubmitButton disabled={isProcessing||!formIsValid}>
                    {isProcessing ? "Processing..." : `Pay $${props.totalPrice}`}
                    </SubmitButton>
                </Row>

                <Row>
                    <SubmitButton  style={{ backgroundColor: '#333', borderColor:'#333' }} onClick = {props.goBack}>Cancle</SubmitButton>
                </Row>

             </form>      
           </div>
       
    );
    if ( loading ) {
        form = <Spinner />;
    }
        
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data & Pay</h4>
            {form}
        </div>
    );
}

export default ContactData;