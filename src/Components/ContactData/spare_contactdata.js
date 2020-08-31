import React, { Component, useState} from 'react';
import localServerAxios from "axios";
import Button from '../UI/Button/Button'
import Spinner from '../UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../axios-orders';
import Input from '../UI/Input/Input';
import StripeCheckout from "react-stripe-checkout";
// import {Route} from 'react-router-dom';
// import EndPage from '../EndPage/EndePage';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
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
                    placeholder: 'Street'
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
                    placeholder: 'ZIP Code'
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
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone Number'
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
                    placeholder: 'Your E-Mail'
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
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    componentDidMount() {
        
    }
    

    orderHandler = ( event ) => {
        console.log("orderHandler",this.props);
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        let updateDishes = {...this.props.dishes};
        Object.keys(updateDishes).forEach((key) => (updateDishes[key] === 0||null) && delete updateDishes[key]);
        console.log('dishes', updateDishes);
        const order = {
            dishes: updateDishes,
            price: this.props.totalPrice,
            orderData: formData
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.replace( '/endpage' );
                console.log('this.props.match.path'+this.props.match.path)
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    checkValidity(value, rules) {
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            console.log(updatedOrderForm[inputIdentifier],updatedOrderForm[inputIdentifier].valid);
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log('formIsValid',formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <div>
            <form>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                 </form>
                 <Button btnType="Danger" clicked = {this.props.goBack}>BACK</Button>
                <Button btnType="Success" clicked = {this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
                
                {/* <Route
                    path={this.props.match.path + 'endpage'}
                    render={(props)=>(<EndPage
                        {...props} />)} 
                /> */}
               </div>
           
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }

        const product = {
            name: "Tesla Roadster",
            price: 64998.67,
            description: "Cool car"
          };
        
        //   async function handleToken(token, product) {
        //     const response = await localServerAxios.post(
        //     `http://localhost:8383/payment`,
        //       { token, product }
        //     );
        //     const { status } = response.data;
        //     console.log("Response:", response.data);
        //   }
          const makePayment = (token) => {
              const body = {
                  token,
                  product
              }
              const headers = {
                  "Content-Type": "application/json"
              }
              return fetch( `http://localhost:8383/payment`,{
                  method:"POST",
                  headers,
                  body: JSON.stringify(body)
              }).then(response=> {
                  console.log('token', token);
                  console.log('response', response)
                  const {status} = response;
                  console.log('status', status)
              }).catch(error => console.log(error))
          }

          const test = async() => {
              const res= await localServerAxios.post('http://localhost:8383/payment', {
                
                product
              }).then(response=> {
                console.log('response', response)
                const {status} = response;
                console.log('status', status)
            }).catch(error => console.log(error))
            console.log('secret key', res.data['client_secret']);
          }

        
        
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
                <Button btnType="Danger" clicked = {test}>BACK</Button>
                <StripeCheckout
                    stripeKey="pk_test_51HJ0tkHbii5DBKKcU6SIxsCq8DPqRvPHS2j2lNAzWkAdo5EBMukCeqChXnqFJN6nLHLwTpB6JhK1cvXS8RZNNhyD00BiyDANe3"
                    token={makePayment}
                    amount={product.price * 100}
                    name="Tesla Roadster"
                    billingAddress
                    shippingAddress
                />
            </div>
        );
    }
}

export default ContactData;