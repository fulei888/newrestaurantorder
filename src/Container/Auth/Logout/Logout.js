import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Store/actions/index';
import { Redirect } from 'react-router-dom';
const  Logout = props => {
    const {logout} = props;
    useEffect(()=>{
        logout();
    },[logout]); 
    return (
        <Redirect to = "/"/>
    )  
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    };
};

export default connect(null , mapDispatchToProps)(Logout);
